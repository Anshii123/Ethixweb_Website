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
    phone: '+91 98765 43210',
    company: 'Sharma Retail Tech',
    service: 'website-design',
    budget: '1.5L-3.5L',
    message: 'Looking to migrate our current Shopify store to a custom headless React build.',
    websiteUrl: '',
    turnstileToken: 'test-token',
  };

  const validResult = CreateLeadSchema.safeParse(validLead);
  assert(validResult.success, 'Valid lead payload passes Zod schema');

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
