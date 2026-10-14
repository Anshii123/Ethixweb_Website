import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Lead } from '../models/Lead.js';

// Load .env
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach((l) => {
      const trimmed = l.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const idx = trimmed.indexOf('=');
        if (idx !== -1) {
          const k = trimmed.slice(0, idx).trim();
          const v = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
          if (!process.env[k]) process.env[k] = v;
        }
      }
    });
  }
}
loadEnv();

async function runRealtimeVerification() {
  console.log('\n======================================================');
  console.log('🚀 TESTING LIVE REAL-TIME DATABASE PERSISTENCE');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(cond: boolean, name: string, detail?: string) {
    if (cond) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}${detail ? ` (${detail})` : ''}`);
      failed++;
    }
  }

  const BASE_URL = 'http://localhost:5173';

  // 1. Authenticate Admin to obtain session token
  console.log('Step 1: Admin Authentication...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ethixweb.com', password: 'EthixAdmin2026!' }),
  });
  const loginJson = await loginRes.json();
  const token = loginJson.data?.token;
  assert(loginRes.status === 200 && !!token, 'Admin logged in and JWT token received');

  // 2. Submit new Lead via Public API (Add to database)
  console.log('\nStep 2: Submitting Lead to Database (Real-time Add)...');
  const testEmail = `realtime.test.${Date.now()}@ethixweb.in`;
  const newLeadPayload = {
    name: 'Kabir Sengupta',
    email: testEmail,
    phone: '+91 99001 22334',
    company: 'Sengupta Operations Hub',
    service: 'ai-automation',
    budget: '3.5L-8L',
    message: 'We require an automated AI customer dispatch agent for Kolkata branch.',
    websiteUrl: '',
    turnstileToken: 'cf-test-token-always-pass',
  };

  const addRes = await fetch(`${BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLeadPayload),
  });
  const addJson = await addRes.json();
  const createdId = addJson.data?.id;

  assert(addRes.status === 201 && !!createdId, 'Lead created via API (201 Created)', JSON.stringify(addJson));

  // 3. Connect to MongoDB Atlas directly to confirm real-time persistence
  console.log('\nStep 3: Direct MongoDB Atlas Verification (Add)...');
  await mongoose.connect(process.env.MONGODB_URI as string);
  const atlasDoc = await Lead.findById(createdId);
  assert(!!atlasDoc, 'Document exists in live MongoDB Atlas cluster');
  assert(atlasDoc?.name === 'Kabir Sengupta', 'Document fields accurately persisted in Atlas');
  assert(atlasDoc?.status === 'new', 'Document status initialized to "new"');

  // 4. Query via Admin API
  console.log('\nStep 4: Querying via Admin Leads API...');
  const listRes = await fetch(`${BASE_URL}/api/admin/leads?search=Kabir`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const listJson = await listRes.json();
  const matched = listJson.data?.leads?.find((l: any) => l._id === createdId);
  assert(!!matched, 'Lead returned in Admin Leads list with pagination and search');

  // 5. Update Status and Add Note in MongoDB
  console.log('\nStep 5: Updating Lead Status & Adding Audit Note in Database...');
  const patchRes = await fetch(`${BASE_URL}/api/admin/leads?id=${createdId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: createdId,
      status: 'contacted',
      note: 'Technical discovery call completed with Kabir.',
    }),
  });
  const patchJson = await patchRes.json();
  assert(patchRes.status === 200, 'Lead successfully updated via PATCH');

  const updatedAtlasDoc = await Lead.findById(createdId);
  assert(updatedAtlasDoc?.status === 'contacted', 'Updated status reflected immediately in Atlas');
  assert(
    updatedAtlasDoc?.notes?.some((n: any) => n.text.includes('Technical discovery call')),
    'Internal note appended to lead in Atlas'
  );

  // 6. Delete Lead from Database (Real-time Delete)
  console.log('\nStep 6: Deleting Lead from Database (Real-time Delete)...');
  const deleteRes = await fetch(`${BASE_URL}/api/admin/leads?id=${createdId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const deleteJson = await deleteRes.json();
  assert(deleteRes.status === 200 && deleteJson.data?.deleted === true, 'DELETE API returned 200 confirmation');

  // 7. Verify Document is Gone from Live MongoDB Atlas
  console.log('\nStep 7: Verifying Lead is Deleted from MongoDB Atlas...');
  const deletedAtlasDoc = await Lead.findById(createdId);
  assert(deletedAtlasDoc === null, 'Document successfully removed from live MongoDB Atlas database');

  // 8. Confirm via Admin API that Lead no longer appears
  const verifyListRes = await fetch(`${BASE_URL}/api/admin/leads?search=Kabir`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const verifyListJson = await verifyListRes.json();
  const stillFound = verifyListJson.data?.leads?.some((l: any) => l._id === createdId);
  assert(!stillFound, 'Lead no longer present in Admin Leads API');

  await mongoose.disconnect();

  console.log('\n======================================================');
  console.log(`📊 INTEGRATION RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runRealtimeVerification().catch((err) => {
  console.error('Fatal error during integration testing:', err);
  process.exit(1);
});
