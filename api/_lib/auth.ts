import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { getSessionSecret, isProduction } from './env.js';
import { sendError } from './errors.js';

export interface AdminJwtPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

const COOKIE_NAME = 'ethix_admin_token';
const TOKEN_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Sign a JWT token for the authenticated administrator
 */
export function signAdminToken(payload: AdminJwtPayload): string {
  const secret = getSessionSecret();
  return jwt.sign(payload, secret, {
    expiresIn: TOKEN_EXPIRY_SECONDS,
  });
}

/**
 * Verify a JWT token
 */
export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    const secret = getSessionSecret();
    const decoded = jwt.verify(token, secret) as AdminJwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Attach HTTP-only authentication cookie to response
 */
export function setAuthCookie(res: VercelResponse, token: string): void {
  const secure = isProduction();
  const serialized = cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_EXPIRY_SECONDS,
  });
  res.setHeader('Set-Cookie', serialized);
}

/**
 * Expire authentication cookie
 */
export function clearAuthCookie(res: VercelResponse): void {
  const secure = isProduction();
  const serialized = cookie.serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  res.setHeader('Set-Cookie', serialized);
}

/**
 * Extract token from either HTTP-only cookie or Authorization header
 */
export function extractToken(req: VercelRequest): string | null {
  // 1. Check cookies
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  if (cookies[COOKIE_NAME]) {
    return cookies[COOKIE_NAME];
  }

  // 2. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  return null;
}

/**
 * Authentication and authorization gate for admin endpoints
 */
export function requireAdmin(
  req: VercelRequest,
  res: VercelResponse
): AdminJwtPayload | null {
  const token = extractToken(req);

  if (!token) {
    sendError(res, 'Authentication required. Please log in.', 401, 'UNAUTHORIZED');
    return null;
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    sendError(res, 'Session expired or invalid credentials. Please log in again.', 401, 'INVALID_TOKEN');
    return null;
  }

  return payload;
}
