import { z } from 'zod';

export const ServiceEnum = z.enum([
  'website-design',
  'web-applications',
  'ai-automation',
  'crm-integration',
  'seo-growth',
  'maintenance-support',
]);

export const BudgetEnum = z.enum([
  'under-1.5L',
  '1.5L-3.5L',
  '3.5L-8L',
  'above-8L',
  'not-sure',
]);

export const LeadStatusEnum = z.enum(['new', 'contacted', 'qualified', 'closed']);

// Contact enquiry submission schema
export const CreateLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must not exceed 100 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' })
    .max(120, { message: 'Email must not exceed 120 characters.' })
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required.' })
    .refine((val) => /^\d+$/.test(val), {
      message: 'Phone number must contain digits only.',
    })
    .refine((val) => !val.startsWith('0'), {
      message: 'Phone number cannot start with 0.',
    })
    .refine((val) => val.length >= 10, {
      message: 'Phone number must be of 10 digits only (not less than 10 digits).',
    })
    .refine((val) => val.length <= 10, {
      message: 'Phone number must be of 10 digits only (not more than 10 digits).',
    }),
  company: z
    .string()
    .trim()
    .max(120, { message: 'Company name cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  service: ServiceEnum,
  budget: BudgetEnum.optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Project message must be at least 10 characters.' })
    .max(3000, { message: 'Message cannot exceed 3000 characters.' }),
  // Honeypot field - must remain completely empty. Bots often fill this.
  websiteUrl: z
    .string()
    .max(0, { message: 'Spam detected via bot trap.' })
    .optional()
    .or(z.literal('')),
  // Cloudflare Turnstile verification response token
  turnstileToken: z.string().optional(),
});

// Admin login schema
export const AdminLoginSchema = z.object({
  email: z.string().trim().email({ message: 'Valid email is required.' }).toLowerCase(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

// Admin lead update schema
export const UpdateLeadSchema = z.object({
  status: LeadStatusEnum.optional(),
  note: z.string().trim().max(1000, { message: 'Note cannot exceed 1000 characters.' }).optional(),
});
