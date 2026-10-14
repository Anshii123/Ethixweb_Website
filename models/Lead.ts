import mongoose, { Schema, Document, Model } from 'mongoose';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export interface ILeadNote {
  text: string;
  createdAt: Date;
  author: string;
}

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: LeadStatus;
  notes?: ILeadNote[];
  ip?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadNoteSchema = new Schema<ILeadNote>({
  text: { type: String, required: true, trim: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
  author: { type: String, default: 'Admin' }
}, { _id: true });

const LeadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      maxlength: [120, 'Email cannot exceed 120 characters'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: {
        values: [
          'website-design',
          'web-applications',
          'ai-automation',
          'crm-integration',
          'seo-growth',
          'maintenance-support'
        ],
        message: 'Invalid service selected',
      },
    },
    budget: {
      type: String,
      enum: {
        values: [
          'under-1.5L',
          '1.5L-3.5L',
          '3.5L-8L',
          'above-8L',
          'not-sure'
        ],
        message: 'Invalid budget range selected',
      },
    },
    message: {
      type: String,
      required: [true, 'Project message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
      index: true,
    },
    notes: [LeadNoteSchema],
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for query performance
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ email: 1 });

// Avoid multiple model compilation in hot reload / serverless warm invocations
export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
