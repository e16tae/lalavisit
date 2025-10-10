# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

라라재가방문요양센터 (Lala Home Care Center) - A Next.js 15 website for a Korean senior care service provider offering home care, family care, and live-in caregiving services. The site is in Korean and targets seniors with long-term care insurance grades (등급) 1-5 and cognitive support grades.

**Tech Stack:**
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS 4 (using @tailwindcss/postcss)
- Pretendard Variable font (Korean-optimized)
- Nodemailer (Naver SMTP for contact forms)
- Deployed on Vercel

## Common Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Build for production with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint
```

### Testing Changes Locally
After making changes, always run `npm run build` to verify the production build succeeds before committing.

## Architecture & Key Patterns

### Data-Driven Content System
Content is managed through JSON files in `/data/` rather than hardcoded in components:
- `data/activities.json` - Activity gallery photos with metadata (care grade, service type, education info)
- `data/reviews.json` - Customer reviews with ratings

This allows non-technical admins to update content without touching React code. See `ADMIN_GUIDE.md` for content management workflows.

### Contact Form Flow
The `/contact` page submits to `/app/api/contact/route.ts` which:
1. Validates required fields (name, phone, service)
2. Sends email via Nodemailer using Naver SMTP
3. Uses environment variables for credentials (EMAIL_USER, EMAIL_PASSWORD)
4. Returns JSON response for client-side feedback

**Important**: The contact form requires `.env.local` with Naver SMTP credentials to function.

### SEO & Schema.org Implementation
- Global SEO metadata in `app/layout.tsx` (metadataBase, Open Graph, Twitter Cards)
- Schema.org structured data injected via `components/schema-org.tsx` (LocalBusiness, Service)
- Per-page metadata exports in each page component
- Static sitemap/robots.txt generation

### Component Architecture
**Global Components** (used across all pages):
- `components/navigation.tsx` - Main navbar with mobile menu
- `components/floating-contact.tsx` - Fixed floating action buttons (phone, KakaoTalk, email, consultation)
- `components/footer.tsx` - Site footer with contact info
- `components/skip-to-content.tsx` - Accessibility skip link

**Utility Components**:
- `components/google-analytics.tsx` - GA4 integration (conditional on NEXT_PUBLIC_GA_ID)
- `lib/utils.ts` - shadcn/ui `cn()` helper for className merging

### Page Structure
All pages use Next.js 15 App Router:
- `/app/page.tsx` - Home page with hero, service cards, CTA
- `/app/services/page.tsx` - Service details (home care, family care, live-in care)
- `/app/about/page.tsx` - Center introduction, director profile, Naver Maps
- `/app/activities/page.tsx` - Photo gallery with tabs (field photos vs education photos)
- `/app/contact/page.tsx` - Consultation request form

Error boundaries:
- `app/not-found.tsx` - 404 page
- `app/error.tsx` - Client-side error boundary
- `app/global-error.tsx` - Root error boundary
- `app/loading.tsx` - Loading state

### Styling System
Uses Tailwind CSS 4 with custom colors defined in `app/globals.css`:
- Primary color: `#22BBB4` (teal, used for main CTAs and branding)
- Secondary color: `#FFA500` (orange, used for accents)
- Uses Pretendard Variable font via `localFont` in `app/layout.tsx`

**Note**: This project uses Tailwind CSS 4, which has a different configuration approach. There is no `tailwind.config.ts` - configuration is in `app/globals.css` using `@theme` directive.

### Image Optimization
Next.js Image component configured in `next.config.ts`:
- Formats: AVIF → WebP fallback
- Device sizes optimized for responsive layouts
- All images should be placed in `/public/` directory

Activity photos referenced in `data/activities.json` must exist in `/public/activities/` to avoid 404s.

### TypeScript Path Aliases
Uses `@/*` alias for root-level imports (configured in `tsconfig.json`):
```typescript
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"
```

## Environment Variables

Required variables in `.env.local`:
```bash
# Naver SMTP (required for contact form)
EMAIL_USER=lalavisit@naver.com
EMAIL_PASSWORD=your_password
SMTP_HOST=smtp.naver.com
SMTP_PORT=587
CONTACT_EMAIL=lalavisit@naver.com

# Site URL (required for metadata)
NEXT_PUBLIC_SITE_URL=https://www.lalavisit.com

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xnxoxoxG/chat
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
NEXT_PUBLIC_NAVER_SITE_VERIFICATION=...
```

## Important Development Notes

### When Adding New Pages
1. Create page in `/app/` directory following App Router conventions
2. Export `metadata` object for SEO (title, description, keywords, Open Graph)
3. Add navigation link to `components/navigation.tsx` if needed
4. Ensure accessibility: proper heading hierarchy, ARIA labels, keyboard navigation

### When Modifying Contact Form
- Test email sending with real Naver SMTP credentials
- Verify error handling (network failures, invalid SMTP credentials)
- Check form validation on both client and server side

### When Adding Activity Photos
1. Add image to `/public/activities/` directory
2. Update `data/activities.json` with proper structure:
   - `field` array for care service photos (requires: careGrade, service)
   - `education` array for training photos (requires: educationType, hours)
3. Ensure image paths match exactly (case-sensitive)

### Korean Language Considerations
- All user-facing text is in Korean
- Date formatting uses `toLocaleString("ko-KR")`
- Care grades are Korean terms (1등급, 2등급, etc.)
- When adding new content, maintain Korean language conventions

### Accessibility Requirements
- All interactive elements must have proper ARIA labels
- Skip-to-content link is first focusable element
- Keyboard navigation must work for all features
- Main content area has `id="main-content"` and `tabIndex={-1}` for skip link target

### Performance Optimizations
- Uses Next.js 15 with Turbopack for faster builds
- `output: "standalone"` in next.config.ts for Docker/optimized deployments
- React Strict Mode enabled
- Image optimization with AVIF/WebP
- Package import optimization for lucide-react

## Deployment

Deployed on Vercel with automatic deployments from `main` branch:
1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Environment variables must be configured in Vercel dashboard

Build output: ~129-132 KB First Load JS, 13 static pages.
