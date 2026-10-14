import type { VercelResponse } from '@vercel/node';

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: unknown;
}

export function sendSuccess<T>(res: VercelResponse, data: T, status = 200, message?: string): void {
  const payload: ApiSuccessResponse<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
  res.status(status).json(payload);
}

export function sendError(
  res: VercelResponse,
  error: string,
  status = 400,
  code?: string,
  details?: unknown
): void {
  const payload: ApiErrorResponse = {
    success: false,
    error,
    ...(code ? { code } : {}),
    ...(details ? { details } : {}),
  };
  res.status(status).json(payload);
}

export function handleServerError(res: VercelResponse, err: unknown): void {
  console.error('[API Server Error]:', err);
  const message = err instanceof Error ? err.message : 'An unexpected server error occurred';
  sendError(res, message, 500, 'INTERNAL_SERVER_ERROR');
}
