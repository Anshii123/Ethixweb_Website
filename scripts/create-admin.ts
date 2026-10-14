import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import fs from 'fs';
import path from 'path';

// Load .env file manually if exists
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

async function createAdmin() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('\n❌ ERROR: MONGODB_URI environment variable is missing.');
    console.error('Please configure MONGODB_URI in your .env file or pass it via shell.\n');
    process.exit(1);
  }

  // Parse arguments or fallback to env variables
  const args = process.argv.slice(2);
  let email = process.env.INITIAL_ADMIN_EMAIL || 'admin@ethixweb.com';
  let password = process.env.INITIAL_ADMIN_PASSWORD || 'ChangeMe123!SecurePassword';
  let name = process.env.INITIAL_ADMIN_NAME || 'Ethixweb Administrator';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--email' && args[i + 1]) {
      email = args[i + 1];
    } else if (args[i] === '--password' && args[i + 1]) {
      password = args[i + 1];
    } else if (args[i] === '--name' && args[i + 1]) {
      name = args[i + 1];
    }
  }

  if (password.length < 8) {
    console.error('❌ ERROR: Password must be at least 8 characters long for security.');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected successfully.');

    const normalizedEmail = email.trim().toLowerCase();
    const existingAdmin = await Admin.findOne({ email: normalizedEmail });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (existingAdmin) {
      existingAdmin.passwordHash = passwordHash;
      existingAdmin.name = name;
      await existingAdmin.save();
      console.log(`\n🎉 Admin account updated: ${normalizedEmail}`);
    } else {
      await Admin.create({
        email: normalizedEmail,
        passwordHash,
        name,
        role: 'admin',
      });
      console.log(`\n🎉 Admin account provisioned: ${normalizedEmail}`);
    }

    console.log('🛡️  Credentials saved securely (hashed with bcrypt, 12 rounds).');
    console.log('You can now log in at /admin/login\n');
  } catch (err) {
    console.error('\n❌ Failed to provision administrator:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database.');
  }
}

createAdmin();
