import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { Admin } from '../models/Admin.js';
import { Lead } from '../models/Lead.js';
import { RateLimit } from '../models/RateLimit.js';

// Load .env file
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...values] = trimmed.split('=');
          if (key && values.length > 0 && !process.env[key.trim()]) {
            process.env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      });
    }
  } catch (e) {
    console.warn('Could not read .env file:', e);
  }
}

loadEnv();

async function seedDatabase() {
  console.log('\n=============================================================');
  console.log('🌱 ETHIXWEB INDIA — MONGODB ATLAS SEED & CONNECT SCRIPT');
  console.log('=============================================================\n');

  let uri = process.env.MONGODB_URI;

  // Check if CLI arguments provide password override
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--uri' && args[i + 1]) {
      uri = args[i + 1];
    } else if (args[i] === '--password' && args[i + 1]) {
      const pass = args[i + 1];
      if (uri) {
        uri = uri.replace('<db_password>', encodeURIComponent(pass));
      }
    }
  }

  if (!uri) {
    console.error('❌ ERROR: MONGODB_URI is missing from .env');
    process.exit(1);
  }

  if (uri.includes('<db_password>')) {
    console.error('❌ ERROR: Your MONGODB_URI still contains the placeholder "<db_password>".');
    console.error('Please open .env and replace <db_password> with your actual MongoDB Atlas database user password.');
    console.error('Or run this command with your password:');
    console.error('  npx tsx scripts/seed-data.ts --password YOUR_ATLAS_PASSWORD\n');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas cluster...');
    await mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Successfully connected to MongoDB Atlas!\n');

    // 1. Provision Administrator
    console.log('🛡️  Provisioning Administrator Account...');
    const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@ethixweb.com').toLowerCase().trim();
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'EthixAdmin2026!';
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Ethixweb Administrator';

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      existingAdmin.passwordHash = passwordHash;
      existingAdmin.name = adminName;
      await existingAdmin.save();
      console.log(`   Updated existing admin: ${adminEmail}`);
    } else {
      await Admin.create({
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: 'admin',
      });
      console.log(`   Created new admin: ${adminEmail}`);
    }
    console.log(`   Admin Login: ${adminEmail}`);
    console.log(`   Admin Password: ${adminPassword}`);

    // 2. Seed Realistic India-Specific Leads
    console.log('\n📦 Seeding Sample Indian Business Leads...');
    const existingCount = await Lead.countDocuments();
    if (existingCount === 0 || args.includes('--force')) {
      if (args.includes('--force') && existingCount > 0) {
        await Lead.deleteMany({});
        console.log('   Cleared existing leads (--force specified).');
      }

      const sampleLeads = [
        {
          name: 'Vikram Singhania',
          email: 'vikram@aavartanapparel.in',
          phone: '+91 98201 12345',
          company: 'Aavartan Apparel India',
          service: 'website-design',
          budget: '1.5L-3.5L',
          message:
            'We are a Jaipur-based ethnic wear D2C brand doing ₹25L/month on Shopify. Our mobile bounce rate is high (68%) and pages take 4+ seconds to load. We want a headless React / Next.js storefront with 1-click UPI checkout integration.',
          status: 'qualified',
          ip: '103.21.125.10',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          notes: [
            {
              text: 'Lead submitted via website contact form.',
              author: 'System',
              createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
              text: 'Initial call completed with Vikram. Shared proposal for headless Next.js catalog.',
              author: 'Admin',
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Ananya Deshmukh',
          email: 'ananya@kavachmetrics.com',
          phone: '+91 98450 67890',
          company: 'Kavach Telematics LLP',
          service: 'web-applications',
          budget: '3.5L-8L',
          message:
            'Need an operational IoT dashboard for our fleet management platform in Bangalore. The system needs to track 500+ commercial trucks across Mumbai-Delhi corridor with real-time GPS websocket telemetry and automated GST e-way bill generation.',
          status: 'contacted',
          ip: '49.207.214.5',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          notes: [
            {
              text: 'Inquiry received. High technical complexity. Assigned to Senior Solutions Architect.',
              author: 'Admin',
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Rajesh Kulkarni',
          email: 'rajesh.k@vistarawealth.in',
          phone: '+91 98190 54321',
          company: 'Vistara Capital Advisory',
          service: 'crm-integration',
          budget: '1.5L-3.5L',
          message:
            'We are a Mumbai SEBI-registered portfolio management service. We need our landing page enquiry forms bi-directionally synced with Zoho CRM and WhatsApp Business API so our relationship managers get instant alert notifications.',
          status: 'new',
          ip: '115.112.89.44',
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)',
          notes: [
            {
              text: 'New enquiry received. Needs callback.',
              author: 'System',
              createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Pooja Iyer',
          email: 'pooja.iyer@quickkirana.co',
          phone: '+91 97401 23456',
          company: 'QuickKirana Hyperlocal',
          service: 'ai-automation',
          budget: '3.5L-8L',
          message:
            'Looking to deploy an AI voice and chat receptionist to handle customer delivery inquiries, order cancellations, and missing item complaints during peak evening hours without hiring an 8-person night shift.',
          status: 'closed',
          ip: '106.51.72.18',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2)',
          notes: [
            {
              text: 'Project agreement signed. Kickoff scheduled for Monday.',
              author: 'Admin',
              createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Dr. Siddharth Rao',
          email: 'siddharth@nexahealth.in',
          phone: '+91 99002 98765',
          company: 'Nexa Health Telemedicine',
          service: 'web-applications',
          budget: 'above-8L',
          message:
            'Custom patient consultation portal with HIPAA/DISHA compliance, video calling integration, doctor calendar scheduling, and automated prescription PDF generator.',
          status: 'new',
          ip: '182.73.189.66',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          notes: [
            {
              text: 'Enterprise telemedicine project inquiry.',
              author: 'System',
              createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Neha Chawla',
          email: 'neha@zenithdesign.studio',
          phone: '+91 98111 22334',
          company: 'Zenith Brand Studio Delhi',
          service: 'seo-growth',
          budget: 'under-1.5L',
          message:
            'We want our design studio to rank for competitive keywords like "branding agency Delhi NCR" and "UI UX design agency Gurgaon". Need technical audit and local SEO indexing.',
          status: 'contacted',
          ip: '122.161.49.20',
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
          notes: [
            {
              text: 'Sent SEO audit sample report via email.',
              author: 'Admin',
              createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          ],
        },
        {
          name: 'Karthik Ramanathan',
          email: 'karthik@pulsecrm.dev',
          phone: '+91 98840 88990',
          company: 'Pulse CRM Technologies',
          service: 'maintenance-support',
          budget: '1.5L-3.5L',
          message:
            'We need a dedicated team on maintenance retainer for our React and Node microservices. Requires 99.9% uptime SLA, security patching, and MongoDB performance index tuning.',
          status: 'closed',
          ip: '117.193.30.12',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
          notes: [
            {
              text: 'Retainer SLA contract executed for 12 months.',
              author: 'Admin',
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
          ],
        },
      ];

      await Lead.insertMany(sampleLeads);
      console.log(`   ✅ Successfully seeded ${sampleLeads.length} realistic Indian business leads.`);
    } else {
      console.log(`   ℹ️  Database already contains ${existingCount} leads. Skipping duplicate seed.`);
      console.log('   (To overwrite and re-seed, run: npm run seed -- --force)');
    }

    // 3. Ensure RateLimit TTL index exists
    console.log('\n⚡ Verifying MongoDB Collections & Indexes...');
    await RateLimit.createIndexes();
    await Lead.createIndexes();
    await Admin.createIndexes();
    console.log('   ✅ All indexes verified (including RateLimit TTL expiry index).');

    console.log('\n=============================================================');
    console.log('🎉 SEEDING & ATLAS CONNECTION COMPLETE!');
    console.log('=============================================================');
    console.log('You can now log in to the admin dashboard at:');
    console.log('  URL:      http://localhost:5173/admin/login');
    console.log(`  Email:    ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log('=============================================================\n');
  } catch (err: any) {
    console.error('\n❌ Connection / Seeding Failed:', err.message);
    if (err.message && err.message.includes('bad auth')) {
      console.error('\n👉 Authentication failed. Please ensure your MongoDB Atlas user password is correct.');
    } else if (err.message && err.message.includes('queryTxt ETIMEOUT') || err.message.includes('getaddrinfo ENOTFOUND')) {
      console.error('\n👉 Network timeout. Please check your internet connection or MongoDB Atlas cluster hostname.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected cleanly from database.\n');
  }
}

seedDatabase();
