/**
 * Server-only environment variable loader and validator
 */
export function getRequiredEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing required server environment variable: ${key}`);
  }
  return value;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
}

export function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    if (isProduction()) {
      throw new Error('SESSION_SECRET environment variable is missing in production.');
    }
    // Safe development fallback to allow testing without crash
    return 'dev-session-secret-for-ethixweb-must-be-changed-in-production-min32chars';
  }
  if (secret.length < 32) {
    console.warn('Warning: SESSION_SECRET is shorter than 32 characters.');
  }
  return secret;
}
