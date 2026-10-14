export interface TurnstileVerifyResult {
  success: boolean;
  errorCodes?: string[];
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verify Cloudflare Turnstile token
 * @param token Token received from client widget
 * @param remoteIp Optional client IP
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string
): Promise<{ valid: boolean; reason?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not provided in development mode, log warning and permit testing
  if (!secretKey) {
    if (process.env.NODE_ENV === 'production') {
      return { valid: false, reason: 'Turnstile is not configured on the server.' };
    }
    console.warn('[Turnstile]: TURNSTILE_SECRET_KEY is not set. Allowing request in non-production.');
    return { valid: true };
  }

  // Cloudflare standard test secret keys or test token
  // Always passes: 1x0000000000000000000000000000000AA
  // Always fails:  2x0000000000000000000000000000000AA
  if (secretKey === '1x0000000000000000000000000000000AA' || token === 'cf-test-token-always-pass') {
    return { valid: true };
  }

  if (!token) {
    return { valid: false, reason: 'Spam verification token is missing. Please complete the security challenge.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      return { valid: false, reason: `Verification service returned status ${response.status}` };
    }

    const result = (await response.json()) as TurnstileVerifyResult;
    if (result.success) {
      return { valid: true };
    }

    return {
      valid: false,
      reason: `Verification challenge failed (${result.errorCodes?.join(', ') || 'invalid token'})`,
    };
  } catch (error) {
    console.error('[Turnstile Error]:', error);
    return { valid: false, reason: 'Unable to reach spam verification service.' };
  }
}
