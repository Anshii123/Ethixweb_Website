import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { connectToDatabase } from '../_lib/db.js';
import { Lead } from '../../models/Lead.js';
import { requireAdmin } from '../_lib/auth.js';
import { UpdateLeadSchema } from '../_lib/validation.js';
import { sendSuccess, sendError, handleServerError } from '../_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Strictly require admin authentication on every request
  const admin = requireAdmin(req, res);
  if (!admin) {
    return; // Response already sent by requireAdmin
  }

  try {
    await connectToDatabase();

    // -------------------------------------------------------------------------
    // GET /api/admin/leads (List with search, status/service filter & pagination)
    // -------------------------------------------------------------------------
    if (req.method === 'GET') {
      const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '10', 10)));
      const skip = (page - 1) * limit;

      const filter: Record<string, any> = {};

      // Filter by lead status
      if (req.query.status && typeof req.query.status === 'string' && req.query.status !== 'all') {
        filter.status = req.query.status;
      }

      // Filter by service
      if (req.query.service && typeof req.query.service === 'string' && req.query.service !== 'all') {
        filter.service = req.query.service;
      }

      // Search across name, email, company, and phone
      if (req.query.search && typeof req.query.search === 'string') {
        const searchRegex = new RegExp(req.query.search.trim(), 'i');
        filter.$or = [
          { name: searchRegex },
          { email: searchRegex },
          { company: searchRegex },
          { phone: searchRegex },
        ];
      }

      const [leads, totalCount] = await Promise.all([
        Lead.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('-__v')
          .lean(),
        Lead.countDocuments(filter),
      ]);

      return sendSuccess(res, {
        leads,
        pagination: {
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit) || 1,
        },
      });
    }

    // -------------------------------------------------------------------------
    // PATCH /api/admin/leads (Update status or append internal admin note)
    // -------------------------------------------------------------------------
    if (req.method === 'PATCH') {
      const id = (req.query.id as string) || req.body?.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 'Valid lead ID is required.', 400, 'INVALID_ID');
      }

      const parseResult = UpdateLeadSchema.safeParse(req.body);
      if (!parseResult.success) {
        return sendError(res, 'Invalid update data.', 400, 'VALIDATION_FAILED', parseResult.error.flatten());
      }

      const { status, note } = parseResult.data;
      const updateData: any = {};

      if (status) {
        updateData.status = status;
      }

      const updateQuery: any = { $set: updateData };

      if (note && note.trim().length > 0) {
        updateQuery.$push = {
          notes: {
            text: note.trim(),
            author: admin.name || 'Admin',
            createdAt: new Date(),
          },
        };
      }

      const updatedLead = await Lead.findByIdAndUpdate(id, updateQuery, {
        new: true,
        runValidators: true,
      }).select('-__v');

      if (!updatedLead) {
        return sendError(res, 'Lead not found.', 404, 'NOT_FOUND');
      }

      return sendSuccess(res, updatedLead, 200, 'Lead updated successfully');
    }

    // -------------------------------------------------------------------------
    // DELETE /api/admin/leads (Delete lead with confirmation)
    // -------------------------------------------------------------------------
    if (req.method === 'DELETE') {
      const id = (req.query.id as string) || req.body?.id;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return sendError(res, 'Valid lead ID is required.', 400, 'INVALID_ID');
      }

      const deleted = await Lead.findByIdAndDelete(id);
      if (!deleted) {
        return sendError(res, 'Lead not found.', 404, 'NOT_FOUND');
      }

      return sendSuccess(res, { id, deleted: true }, 200, 'Lead deleted successfully');
    }

    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  } catch (error) {
    return handleServerError(res, error);
  }
}
