import { z } from 'zod';

// Allows flexible international phone format (including +91, 10-digit Indian numbers, and global E.164 formats)
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

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
    .refine(
      (val) => !val || phoneRegex.test(val.replace(/[\s-]/g, '')),
      'Please enter a valid phone number (e.g. +91 98765 43210 or +1 206 555 0192).'
    )
    .optional()
    .or(z.literal('')),
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
