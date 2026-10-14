import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db.js';
import { Lead } from '../../models/Lead.js';
import { requireAdmin } from '../_lib/auth.js';
import { sendSuccess, sendError, handleServerError } from '../_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enforce admin authentication
  const admin = requireAdmin(req, res);
  if (!admin) {
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  try {
    await connectToDatabase();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      closedLeads,
      last7DaysLeads,
      serviceBreakdown,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'qualified' }),
      Lead.countDocuments({ status: 'closed' }),
      Lead.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      Lead.aggregate([
        {
          $group: {
            _id: '$service',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const serviceCounts: Record<string, number> = {};
    for (const item of serviceBreakdown) {
      if (item._id) {
        serviceCounts[item._id] = item.count;
      }
    }

    return sendSuccess(res, {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      closedLeads,
      last7DaysLeads,
      serviceCounts,
    });
  } catch (error) {
    return handleServerError(res, error);
  }
}
