import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateLeadSchema, AdminLoginSchema, UpdateLeadSchema } from '../api/_lib/validation.js';

async function runTestSuite() {
  console.log('\n==================================================');
  console.log('🧪 ETHIXWEB INDIA — COMPREHENSIVE TEST SUITE');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}${detail ? ` (${detail})` : ''}`);
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // 1. CLIENT & SERVER VALIDATION SCHEMAS
  // ---------------------------------------------------------------------------
  console.log('\n--- Test Group 1: Lead Validation & Spam Guard ---');

  // Valid lead submission
  const validLead = {
    name: 'Rohan Sharma',
    email: 'rohan.sharma@example.in',
    phone: '9876543210',
    company: 'Sharma Retail Tech',
    service: 'website-design',
    budget: '1.5L-3.5L',
    message: 'Looking to migrate our current Shopify store to a custom headless React build.',
    websiteUrl: '',
    turnstileToken: 'test-token',
  };

  const validResult = CreateLeadSchema.safeParse(validLead);
  assert(validResult.success, 'Valid lead payload passes Zod schema');

  // Phone check 1: Valid 10-digit number starting with 1-9 passes
  const validPhoneResult1 = CreateLeadSchema.safeParse({ ...validLead, phone: '9876543210' });
  assert(validPhoneResult1.success, 'Accepts valid 10-digit phone number starting with 9');

  const validPhoneResult2 = CreateLeadSchema.safeParse({ ...validLead, phone: '1234567890' });
  assert(validPhoneResult2.success, 'Accepts valid 10-digit phone number starting with 1');

  // Phone check 2: Rejects number starting with 0
  const zeroStartResult = CreateLeadSchema.safeParse({ ...validLead, phone: '0987654321' });
  assert(!zeroStartResult.success, 'Rejects phone number starting with 0');
  if (!zeroStartResult.success) {
    const msg = zeroStartResult.error.issues[0]?.message;
    assert(msg === 'Phone number cannot start with 0.', 'Returns specific error: Phone number cannot start with 0');
  }

  // Phone check 3: Rejects number with less than 10 digits
  const shortPhoneResult = CreateLeadSchema.safeParse({ ...validLead, phone: '987654321' });
  assert(!shortPhoneResult.success, 'Rejects phone number with less than 10 digits (9 digits)');

  // Phone check 4: Rejects number with more than 10 digits
  const longPhoneResult = CreateLeadSchema.safeParse({ ...validLead, phone: '98765432101' });
  assert(!longPhoneResult.success, 'Rejects phone number with more than 10 digits (11 digits)');

  // Phone check 5: Rejects non-numeric characters
  const nonDigitResult = CreateLeadSchema.safeParse({ ...validLead, phone: '98765abcd0' });
  assert(!nonDigitResult.success, 'Rejects phone number containing non-numeric characters');

  // Phone check 6: Rejects empty phone number
  const emptyPhoneResult = CreateLeadSchema.safeParse({ ...validLead, phone: '' });
  assert(!emptyPhoneResult.success, 'Rejects empty phone number');

  // Missing required name
  const invalidNameResult = CreateLeadSchema.safeParse({ ...validLead, name: '' });
  assert(!invalidNameResult.success, 'Rejects empty name');

  // Invalid email format
  const invalidEmailResult = CreateLeadSchema.safeParse({ ...validLead, email: 'not-an-email' });
  assert(!invalidEmailResult.success, 'Rejects invalid email format');

  // Short message (less than 10 characters)
  const shortMsgResult = CreateLeadSchema.safeParse({ ...validLead, message: 'Too short' });
  assert(!shortMsgResult.success, 'Rejects messages shorter than 10 characters');

  // Invalid service enum
  const invalidServiceResult = CreateLeadSchema.safeParse({ ...validLead, service: 'unsupported-service' });
  assert(!invalidServiceResult.success, 'Rejects unlisted service enum');

  // Honeypot detection (bot filled websiteUrl)
  const honeypotResult = CreateLeadSchema.safeParse({ ...validLead, websiteUrl: 'https://spam-bot.xyz' });
  assert(!honeypotResult.success, 'Honeypot field triggers validation failure on bot input');

  // ---------------------------------------------------------------------------
  // 2. ADMIN AUTHENTICATION VALIDATION
  // ---------------------------------------------------------------------------
  console.log('\n--- Test Group 2: Admin Auth & Security ---');

  const validLogin = AdminLoginSchema.safeParse({
    email: 'admin@ethixweb.com',
    password: 'SecurePassword123!',
  });
  assert(validLogin.success, 'Valid admin login credentials format accepted');

  const shortPassword = AdminLoginSchema.safeParse({
    email: 'admin@ethixweb.com',
    password: '123',
  });
  assert(!shortPassword.success, 'Rejects passwords shorter than 6 characters');

  // Bcrypt password hashing & comparison
  const rawPassword = 'StrongAdminPassword@2026';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(rawPassword, salt);
  const matches = await bcrypt.compare(rawPassword, hash);
  const wrongMatches = await bcrypt.compare('WrongPassword', hash);

  assert(matches, 'Bcrypt successfully verifies authentic password hash');
  assert(!wrongMatches, 'Bcrypt rejects incorrect password attempt');

  // JWT Token creation and verification
  const testSecret = 'test-secret-at-least-32-characters-long-key';
  const payload = { adminId: '60d0fe4f5311236168a109ca', email: 'admin@ethixweb.com', name: 'Admin', role: 'admin' };
  const token = jwt.sign(payload, testSecret, { expiresIn: '1h' });
  const decoded = jwt.verify(token, testSecret) as typeof payload;

  assert(decoded.email === 'admin@ethixweb.com' && decoded.adminId === payload.adminId, 'JWT signs and decodes claims accurately');

  // ---------------------------------------------------------------------------
  // 3. ADMIN LEAD UPDATES SCHEMA
  // ---------------------------------------------------------------------------
  console.log('\n--- Test Group 3: Lead Status Patch Schema ---');

  const validStatusUpdate = UpdateLeadSchema.safeParse({
    status: 'qualified',
    note: 'Spoke with client on phone. Ready for discovery sprint.',
  });
  assert(validStatusUpdate.success, 'Valid status patch accepted');

  const invalidStatusUpdate = UpdateLeadSchema.safeParse({
    status: 'non-existent-status',
  });
  assert(!invalidStatusUpdate.success, 'Rejects invalid lead status transitions');

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  console.log('\n==================================================');
  console.log(`📊 TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
