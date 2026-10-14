import { RateLimit } from '../../models/RateLimit.js';
import { connectToDatabase } from './db.js';

export interface RateLimitResult {
  allowed: boolean;
  points: number;
  maxPoints: number;
  resetInSeconds: number;
}

/**
 * Serverless atomic rate limiter backed by MongoDB collection with TTL index
 *
 * @param key Unique identifier (e.g. "contact:ip_1.2.3.4")
 * @param maxPoints Maximum allowed hits in the time window
 * @param windowSeconds Window length in seconds
 */
export async function checkRateLimit(
  key: string,
  maxPoints = 5,
  windowSeconds = 900
): Promise<RateLimitResult> {
  try {
    await connectToDatabase();

    const now = new Date();
    const futureExpire = new Date(now.getTime() + windowSeconds * 1000);

    // Atomically increment point count or insert with window expiry
    const record = await RateLimit.findOneAndUpdate(
      { key },
      {
        $inc: { points: 1 },
        $setOnInsert: { expireAt: futureExpire },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    // If an existing record was past its expire date before TTL worker cleaned it
    if (record.expireAt && record.expireAt < now) {
      record.points = 1;
      record.expireAt = futureExpire;
      await record.save();
    }

    const resetInSeconds = Math.max(
      1,
      Math.ceil(((record.expireAt ? record.expireAt.getTime() : futureExpire.getTime()) - now.getTime()) / 1000)
    );

    if (record.points > maxPoints) {
      return {
        allowed: false,
        points: record.points,
        maxPoints,
        resetInSeconds,
      };
    }

    return {
      allowed: true,
      points: record.points,
      maxPoints,
      resetInSeconds,
    };
  } catch (err) {
    console.error('[RateLimit Error]:', err);
    // In case of transient database connection issue during rate limiting,
    // permit request to avoid blocking users entirely, but log the issue
    return {
      allowed: true,
      points: 1,
      maxPoints,
      resetInSeconds: windowSeconds,
    };
  }
}

/**
 * Extract client IP from Vercel / Node request headers
 */
export function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const list = typeof forwarded === 'string' ? forwarded.split(',') : forwarded;
    return list[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}
