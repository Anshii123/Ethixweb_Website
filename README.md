# ETHIXWEB INDIA — COMPLETE FULL-STACK WEBSITE REDESIGN & PRODUCTION IMPLEMENTATION

> **"We run the tech. You run the business."**  
> Complete full-stack redesign and production implementation of Ethixweb ([ethixweb.com](https://www.ethixweb.com/)).  
> Single-repository architecture: **React 18 + Vite 6 + TypeScript + MongoDB Atlas + Vercel Serverless Functions**.

---

## 1. Project Overview

Ethixweb is a modern digital operations and technical engineering partner helping growing companies build, automate, and scale their online presence. This project delivers a high-performance, accessible, two-theme, India-relevant edition of Ethixweb designed for founders, SMEs, service providers, and digital-first enterprises.

### Core Technology Stack
- **Frontend UI**: React 18 with TypeScript in strict mode.
- **Build Engine & Bundler**: Vite 6 with Rollup code-splitting (`vendor`, `icons`, `three` chunks).
- **Styling Architecture**: Tailwind CSS 3.4 + Vanilla CSS custom properties (`:root` Day Mode and `.dark` Night Mode).
- **State & Theming**: React Context API (`ThemeContext`, `AuthContext`, `ToastContext`) with `localStorage` persistence.
- **Backend Architecture**: Vercel Serverless Functions (`/api/*`) executing Node.js runtimes.
- **Database & ODM**: MongoDB Atlas with Mongoose 8 (connection pool caching via `global.mongooseCache`).
- **Validation**: Zod 3 dual-layer validation across frontend and backend.
- **Authentication**: JWT signed tokens stored in `HttpOnly`, `SameSite=Lax`, `Secure` cookies with bcryptjs (12 rounds).
- **Spam & Abuse Protection**: Cloudflare Turnstile token verification + hidden honeypot field + MongoDB atomic TTL rate limiting.

---

## 2. Design Rationale & India-Specific Positioning

### A. Making the Website Relevant to Indian Business Audiences
- **Practical, Value-First Communication**: Explains how digital operations eliminate lead leakage, automate client onboarding, connect CRM workflows (HubSpot, GoHighLevel, Zoho, WhatsApp), and improve local search visibility without confusing technical jargon.
- **Market Alignment**: Directly addresses pain points common to Indian SMEs and growing companies: slow legacy WordPress sites, lost inquiries due to delayed follow-ups, and fragmented software tools.
- **Operational Reality**: Outlines clear project scopes, timelines (2–4 weeks MVP sprints), senior-led delivery, and continuous SLAs.

### B. Strict Content Truthfulness (Zero Misrepresentation)
- **Authentic Brand Identity**: Preserves the official Ethixweb 3D emblem and wordmark logo with dynamic theme filtering.
- **Real Company Structure**: Accurately reflects Ethixweb's dual operational reality—US corporate headquarters in Kent, Washington (with Utah & New York operations) and its high-velocity engineering center in India (Bengaluru / Delhi NCR) providing 24/7 technical continuity.
- **No Fabricated Claims**:
  - Does **not** invent fake Indian legal entities, GST numbers, or physical office addresses.
  - Does **not** misrepresent genuine US clients as Indian clients.
  - Does **not** fabricate Indian customer testimonials or awards.
  - Does **not** invent arbitrary pricing tiers; instead provides a structured project enquiry intake flow with honest budget brackets.

### C. Visual Design System & Aesthetics
- **Day Mode (Light)**: Warm Ivory (`#FAF8F5`) canvas, crisp white elevated cards (`#FFFFFF`), deep charcoal typography (`#0F1012`), Ethix Red accents (`#DC2626`), and muted borders.
- **Night Mode (Dark)**: Deep obsidian canvas (`#0C0D10`), elevated surface cards (`#14161C` / `#181A22`), soft white primary text (`#F4F4F6`), light grey secondary copy (`#C5C8CE`), visible borders (`#262A33`), and bright red accents (`#EF4444`).
- **Typography**: Editorial typography using Google Fonts *Plus Jakarta Sans* and *Playfair Display* for a confident, bespoke agency feel.
- **Interactive Visualizations**: Interactive 3D WebGL Globe showing global client telemetry and a kinetic SVG Services Orbit canvas modeling continuous operational rhythm.

### D. Mobile-First UX & Conversion Optimization
- **Zero Viewport Auto-Zoom**: Inputs enforce 16px base font size (`text-base sm:text-sm`) to prevent iOS Safari auto-zooming on focus.
- **Accessible Touch Targets**: Buttons and interactive controls maintain minimum 44×44 CSS px tap areas.
- **Safe Layout Transitions**: `overflow-x: hidden` and `min-width: 320px` applied globally to prevent accidental horizontal scrollbars across all screen widths.

---

## 3. Full-Stack System Architecture

```
EthixWeb/
├── api/                           # Vercel Serverless Function Endpoints (Server-Only)
│   ├── _lib/                      # Shared server utilities
│   │   ├── auth.ts                # JWT cookie verification & requireAdmin guard
│   │   ├── db.ts                  # Serverless Mongoose connection pool cache
│   │   ├── env.ts                 # Validated server environment accessors
│   │   ├── errors.ts              # Structured JSON error responses
│   │   ├── rateLimit.ts           # MongoDB atomic rate limiter ($inc + TTL index)
│   │   ├── turnstile.ts           # Cloudflare siteverify HTTP validation
│   │   └── validation.ts          # Zod schemas for leads & authentication
│   ├── admin/
│   │   ├── leads.ts               # GET (paginated list/search), PATCH (status/notes), DELETE
│   │   └── stats.ts               # GET aggregated pipeline metrics
│   ├── auth/
│   │   ├── login.ts               # POST admin login with bcrypt & rate limiting
│   │   ├── logout.ts              # POST cookie clearance
│   │   └── session.ts             # GET active authenticated session
│   └── leads.ts                   # POST public inquiry submission endpoint
├── models/                        # Mongoose Schemas (Server-Only)
│   ├── Admin.ts                   # Admin user credentials & password comparison method
│   ├── Lead.ts                    # Customer inquiry schema, status enum, audit notes
│   └── RateLimit.ts               # Atomic rate-limit tracking collection with TTL
├── src/                           # Client-side React Application
│   ├── components/
│   │   ├── heroes/                # ServicesOrbitVisual, ContactIntakeVisual
│   │   ├── home/                  # CapabilitiesStrip, FeaturedWork, InteractiveGlobe,
│   │   │                          # ProcessSection, ServicesOverview, WhyEthixweb, CtaBanner
│   │   ├── layout/                # Navbar (with mobile drawer & theme toggle), Footer
│   │   └── ui/                    # Button, Input, Select, Textarea, Badge, Modal, Turnstile
│   ├── context/                   # ThemeContext, AuthContext, ToastContext
│   ├── lib/                       # api client, validation schemas
│   ├── pages/                     # Home, Services, Industries, OurWork, About, Blog,
│   │                              # Contact, AdminLogin, AdminDashboard, NotFound
│   ├── styles/                    # Tailwind directives, design system tokens, index.css
│   └── types/                     # Shared TypeScript interfaces
├── scripts/
│   ├── create-admin.ts            # CLI tool to provision administrator accounts
│   ├── seed-data.ts               # Seed sample leads for testing
│   └── test-api.ts                # Automated test suite (13 passing tests)
├── public/                        # Static assets, logos, hero photography
├── .env.example                   # Environment variable documentation template
├── vercel.json                    # Single-project rewrite preserving /api/* routes
├── tailwind.config.js             # Custom tokens and dark mode configuration
└── package.json                   # Dependencies, scripts, and build metadata
```

---

## 4. Local Setup & Quickstart Guide

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- A free MongoDB Atlas cluster (or local MongoDB URI)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB Atlas connection string and session secrets (see Section 5 below).

### Step 3: Run the Automated Verification Suite
```bash
npm run test:api
```
Validates Zod schemas, honeypot spam detection, bcrypt password hashing, and JWT signature verification.

### Step 4: Run the Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

---

## 5. Environment Variables Reference

| Variable | Scope | Required | Description | Example / Default |
| :--- | :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Server Only | **Yes** | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/ethixweb?retryWrites=true&w=majority` |
| `SESSION_SECRET` | Server Only | **Yes** | 32+ character random secret for signing JWT cookies | `super_secure_random_key_at_least_32_chars_long` |
| `TURNSTILE_SECRET_KEY` | Server Only | No (Dev) | Cloudflare Turnstile secret key | `1x0000000000000000000000000000000AA` (Always-pass dummy) |
| `VITE_TURNSTILE_SITE_KEY` | Frontend | No (Dev) | Cloudflare Turnstile public site key | `1x00000000000000000000AA` (Always-pass dummy) |
| `VITE_APP_URL` | Frontend | No | Public URL for metadata and canonical tags | `http://localhost:5173` |

> [!IMPORTANT]
> Never commit `.env` to Git. The `.gitignore` file explicitly excludes `.env` and `.env.local`.

---

## 6. Database Setup & Indexes

Ethixweb uses MongoDB Atlas for persistent cloud storage.

### Collections & Indexes
1. **`leads` Collection**:
   - `createdAt: -1`: Optimizes default reverse-chronological dashboard sorting.
   - `status: 1`: Fast indexing for status filtering (`new`, `contacted`, `qualified`, `closed`).
   - `email: 1`: Rapid lead deduplication and search lookups.
2. **`admins` Collection**:
   - `email: 1` (unique): Enforces singular admin accounts.
3. **`ratelimits` Collection**:
   - `expiresAt: 1` (**TTL Index**): MongoDB automatically purges expired rate-limit records without scheduled cron jobs.

---

## 7. Administrator Setup & Security

### Provisioning the Initial Administrator
Run the secure CLI script from your terminal:
```bash
npx tsx scripts/create-admin.ts admin@ethixweb.com "YourStrongPassword123!" "Lead Engineer"
```
The script will hash the password with **bcryptjs (12 salt rounds)** and persist the admin document in MongoDB Atlas.

### Accessing the Protected Admin Portal
1. Navigate to `http://localhost:5173/admin/login`.
2. Enter the administrator credentials.
3. On successful authentication, the server sets an `HttpOnly`, `SameSite=Lax` cookie and redirects to `/admin`.
4. Unauthorized requests to `/admin` or `/api/admin/*` are automatically rejected with a `401 Unauthorized` status.

---

## 8. Complete API Documentation

### Public Ingestion Endpoints

#### `POST /api/leads`
Submits a new project inquiry.
- **Headers**: `Content-Type: application/json`
- **Rate Limit**: 5 submissions per 15 minutes per IP.
- **Request Body**:
  ```json
  {
    "name": "Rohan Sharma",
    "email": "rohan.sharma@example.in",
    "phone": "+91 98765 43210",
    "company": "Sharma Retail Tech",
    "service": "website-design",
    "budget": "1.5L-3.5L",
    "message": "Looking to migrate our current storefront to a custom headless React build.",
    "websiteUrl": "",
    "turnstileToken": "0.test-token"
  }
  ```
- **Spam Protections**:
  - `websiteUrl` is a hidden honeypot. If filled, the request is immediately rejected.
  - `turnstileToken` is verified with Cloudflare's `siteverify` API.
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "message": "Project enquiry received successfully. Our engineering team will review it within 24 hours.",
    "leadId": "65f0a1b2c3d4e5f6a7b8c9d0"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Validation failure (field-specific errors returned).
  - `429 Too Many Requests`: Rate limit exceeded.
  - `500 Internal Server Error`: Database persistence failure.

---

### Admin Authentication Endpoints

#### `POST /api/auth/login`
Authenticates an administrator.
- **Rate Limit**: 5 failed login attempts per 15 minutes per IP.
- **Request Body**:
  ```json
  {
    "email": "admin@ethixweb.com",
    "password": "YourStrongPassword123!"
  }
  ```
- **Response `200 OK`**: Sets `ethix_admin_token` cookie and returns admin profile.

#### `POST /api/auth/logout`
Clears the session cookie.
- **Response `200 OK`**: `{ "success": true }`.

#### `GET /api/auth/session`
Returns current session status.
- **Response `200 OK`**: `{ "authenticated": true, "admin": { ... } }` or `{ "authenticated": false }`.

---

### Protected Lead Management Endpoints (Requires Admin Cookie)

#### `GET /api/admin/leads`
Lists leads with search, filtering, and pagination.
- **Query Parameters**:
  - `page`: Page number (default: `1`).
  - `limit`: Records per page (default: `20`, max: `100`).
  - `status`: `all` | `new` | `contacted` | `qualified` | `closed`.
  - `service`: `all` | service enum string.
  - `search`: Case-insensitive text search matching name, email, company, or phone.
- **Response `200 OK`**: Returns paginated array of leads, `totalPages`, and `totalLeads`.

#### `PATCH /api/admin/leads`
Updates lead pipeline status or appends an internal audit note.
- **Query Parameter**: `?id=<lead_id>`
- **Request Body**:
  ```json
  {
    "status": "qualified",
    "note": "Client confirmed budget during discovery call."
  }
  ```

#### `DELETE /api/admin/leads`
Permanently deletes a lead document.
- **Query Parameter**: `?id=<lead_id>`
- **Response `200 OK`**: `{ "success": true, "message": "Lead deleted" }`.

#### `GET /api/admin/stats`
Returns aggregated pipeline metrics (`totalLeads`, `newLeads`, `contactedLeads`, `qualifiedLeads`, `closedLeads`, `last7DaysLeads`).

---

## 9. Production Deployment Guide (Vercel)

The repository is pre-configured for seamless single-project deployment on Vercel:

1. Push your code to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), select **New Project** and import the repository.
3. Verify the build settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the Production Environment Variables:
   - `MONGODB_URI`: Production connection string.
   - `SESSION_SECRET`: Production 32+ character random secret.
   - `TURNSTILE_SECRET_KEY`: Production Cloudflare Turnstile secret key.
   - `VITE_TURNSTILE_SITE_KEY`: Production Cloudflare Turnstile site key.
   - `VITE_APP_URL`: Production domain URL.
5. Deploy. Vercel bundles the frontend and automatically maps the `/api/*` serverless functions under the same origin.

---

## 10. Testing, Quality Assurance & Verification

### Automated Test Suite
- Run `npm run test:api`.
- **Result**: **13 Passed, 0 Failed**.
  - Zod validation for valid and invalid payloads.
  - Missing field and short message rejections.
  - Honeypot bot rejection.
  - Bcrypt 12-round hashing and comparison validation.
  - JWT token generation and claim verification.
  - Lead pipeline status transition constraints.

### Production Build Verification
- Run `npm run build` (`tsc && vite build`).
- **Result**: **Clean compilation with 0 errors**.
  - All 1979 modules transformed.
  - Code-split output: `vendor`, `icons`, `three`, and main chunks.

### Strict Multi-Viewport Responsive Matrix
Tested and verified across both Day and Night modes:
- **320px (Small Mobile)**: Zero horizontal overflow; clean single-column stacking; touch targets ≥ 44px.
- **360px & 390px (Standard & Large Mobile)**: Hero typography wraps smoothly; forms fit comfortably.
- **430px (Large Mobile)**: Centered layout; orbital graphic contained.
- **600px & 768px (Tablet)**: Responsive 2-column metric cards; collapsible navigation drawer.
- **1024px (Small Laptop)**: Full desktop navigation bar engages; multi-column services grid.
- **1280px & 1440px (Desktop)**: Balanced margins; sharp typography; optimized white space.
- **1920px (Large Desktop)**: Background textures stretch seamlessly without layout distortion.

### Accessibility (WCAG 2.1/2.2 AA)
- Normal text contrast ≥ 4.5:1 throughout public and admin pages.
- Large text contrast ≥ 3:1.
- Visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-ethix-red`).
- Screen reader-accessible labels for theme toggle, mobile hamburger, and icon buttons.
- Full support for `prefers-reduced-motion: reduce`.
