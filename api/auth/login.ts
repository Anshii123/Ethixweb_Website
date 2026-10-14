import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from '../_lib/db.js';
import { Admin } from '../../models/Admin.js';
import { AdminLoginSchema } from '../_lib/validation.js';
import { signAdminToken, setAuthCookie } from '../_lib/auth.js';
import { checkRateLimit, getClientIp } from '../_lib/rateLimit.js';
import { sendSuccess, sendError, handleServerError } from '../_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  try {
    const clientIp = getClientIp(req);

    // 1. Rate limiting on login attempts (5 attempts per 15 minutes)
    const rateLimit = await checkRateLimit(`login:ip:${clientIp}`, 5, 900);
    if (!rateLimit.allowed) {
      return sendError(
        res,
        `Too many login attempts. For security, please wait ${Math.ceil(
          rateLimit.resetInSeconds / 60
        )} minutes before retrying.`,
        429,
        'RATE_LIMITED'
      );
    }

    // 2. Validate input format
    const parseResult = AdminLoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return sendError(res, 'Please provide a valid email and password.', 400, 'INVALID_INPUT');
    }

    const { email, password } = parseResult.data;

    // 3. Connect to MongoDB
    await connectToDatabase();

    // 4. Find Admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Use generic invalid credentials to prevent email enumeration
      return sendError(res, 'Invalid email or password credentials.', 401, 'INVALID_CREDENTIALS');
    }

    // 5. Compare password securely
    const isValid = await admin.verifyPassword(password);
    if (!isValid) {
      return sendError(res, 'Invalid email or password credentials.', 401, 'INVALID_CREDENTIALS');
    }

    // 6. Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    // 7. Issue session token and set HTTP-only cookie
    const token = signAdminToken({
      adminId: String(admin._id),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    setAuthCookie(res, token);

    return sendSuccess(
      res,
      {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          lastLogin: admin.lastLogin,
        },
        token, // Also return in body for environments where cookie handling is restricted
      },
      200,
      'Authentication successful'
    );
  } catch (error) {
    return handleServerError(res, error);
  }
}
