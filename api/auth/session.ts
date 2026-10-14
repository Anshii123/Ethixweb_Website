import type { VercelRequest, VercelResponse } from '@vercel/node';
import { extractToken, verifyAdminToken } from '../_lib/auth.js';
import { connectToDatabase } from '../_lib/db.js';
import { Admin } from '../../models/Admin.js';
import { sendSuccess, sendError, handleServerError } from '../_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  try {
    const token = extractToken(req);

    if (!token) {
      return sendSuccess(res, { authenticated: false, admin: null });
    }

    const payload = verifyAdminToken(token);
    if (!payload) {
      return sendSuccess(res, { authenticated: false, admin: null });
    }

    // Optional: verify admin account still exists in DB
    try {
      await connectToDatabase();
      const admin = await Admin.findById(payload.adminId).select('name email role lastLogin');
      if (!admin) {
        return sendSuccess(res, { authenticated: false, admin: null });
      }

      return sendSuccess(res, {
        authenticated: true,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
      });
    } catch {
      // In case DB is temporarily slow, use verified JWT claims
      return sendSuccess(res, {
        authenticated: true,
        admin: {
          id: payload.adminId,
          email: payload.email,
          name: payload.name,
          role: payload.role,
        },
      });
    }
  } catch (error) {
    return handleServerError(res, error);
  }
}
