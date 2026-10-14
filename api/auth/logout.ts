import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearAuthCookie } from '../_lib/auth.js';
import { sendSuccess, sendError } from '../_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  // Clear HTTP-only authentication cookie
  clearAuthCookie(res);

  return sendSuccess(res, { loggedOut: true }, 200, 'Logged out successfully');
}
