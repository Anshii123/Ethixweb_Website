import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (minimum 2 characters).')
    .max(100, 'Name cannot exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid business email address.')
    .max(120, 'Email cannot exceed 120 characters.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
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
    .max(120, 'Company name cannot exceed 120 characters.')
    .optional()
    .or(z.literal('')),
  service: z.enum(
    [
      'website-design',
      'web-applications',
      'ai-automation',
      'crm-integration',
      'seo-growth',
      'maintenance-support',
    ],
    {
      errorMap: () => ({ message: 'Please select a primary service of interest.' }),
    }
  ),
  budget: z
    .enum(['under-1.5L', '1.5L-3.5L', '3.5L-8L', 'above-8L', 'not-sure'])
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'Please share at least a few details about your project (minimum 10 characters).')
    .max(3000, 'Message cannot exceed 3000 characters.'),
  websiteUrl: z.string().max(0).optional().or(z.literal('')), // Honeypot
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const LoginSchema = z.object({
  email: z.string().trim().email('Please enter your administrator email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
