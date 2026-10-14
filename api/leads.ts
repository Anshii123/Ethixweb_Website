import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDatabase } from './_lib/db.js';
import { Lead } from '../models/Lead.js';
import { CreateLeadSchema } from './_lib/validation.js';
import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { verifyTurnstileToken } from './_lib/turnstile.js';
import { sendSuccess, sendError, handleServerError } from './_lib/errors.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only permit POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return sendError(res, `Method ${req.method} not allowed`, 405, 'METHOD_NOT_ALLOWED');
  }

  try {
    const clientIp = getClientIp(req);

    // 1. Production-compatible atomic rate limit check (5 submissions per 15 minutes)
    const rateLimit = await checkRateLimit(`lead:ip:${clientIp}`, 5, 900);
    if (!rateLimit.allowed) {
      return sendError(
        res,
        `Too many enquiries submitted from this network. Please wait ${Math.ceil(
          rateLimit.resetInSeconds / 60
        )} minutes before submitting again.`,
        429,
        'RATE_LIMITED'
      );
    }

    // 2. Validate request body with server-side Zod schema
    const parseResult = CreateLeadSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0];
      return sendError(
        res,
        firstIssue?.message || 'Invalid form submission data',
        400,
        'VALIDATION_FAILED',
        parseResult.error.flatten()
      );
    }

    const { name, email, phone, company, service, budget, message, websiteUrl, turnstileToken } =
      parseResult.data;

    // 3. Honeypot check (websiteUrl is an invisible input trap for bots)
    if (websiteUrl && websiteUrl.length > 0) {
      // Silently reject bot without revealing honeypot mechanism
      console.warn(`[Spam Guard] Bot caught by honeypot field from IP ${clientIp}`);
      return sendSuccess(res, { id: 'enquiry-received' }, 200, 'Thank you! Your enquiry has been received.');
    }

    // 4. Server-side Cloudflare Turnstile verification
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.valid) {
      return sendError(
        res,
        turnstileCheck.reason || 'Spam verification failed. Please try again.',
        403,
        'TURNSTILE_FAILED'
      );
    }

    // 5. Connect to MongoDB Atlas
    await connectToDatabase();

    // 6. Duplicate enquiry debounce: prevent identical message from same email within 2 minutes
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const existingRecentLead = await Lead.findOne({
      email,
      message,
      createdAt: { $gte: twoMinutesAgo },
    });

    if (existingRecentLead) {
      return sendSuccess(
        res,
        { id: existingRecentLead._id },
        200,
        'Thank you! Your enquiry has already been received and our team will get in touch shortly.'
      );
    }

    // 7. Persist lead record into MongoDB Atlas
    const newLead = await Lead.create({
      name,
      email,
      phone: phone || undefined,
      company: company || undefined,
      service,
      budget: budget || undefined,
      message,
      status: 'new',
      ip: clientIp,
      userAgent: req.headers['user-agent'] || '',
      notes: [
        {
          text: 'Enquiry received via Ethixweb website contact form.',
          author: 'System',
          createdAt: new Date(),
        },
      ],
    });

    return sendSuccess(
      res,
      {
        id: newLead._id,
        createdAt: newLead.createdAt,
      },
      201,
      'Your enquiry has been successfully received. An Ethixweb project lead will contact you within 24 business hours.'
    );
  } catch (error) {
    return handleServerError(res, error);
  }
}
