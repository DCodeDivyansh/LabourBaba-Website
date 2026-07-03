<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# LabourBaba Project Agent Guidelines

## Project Overview
LabourBaba is a mobile-first web application built with Next.js 16 that connects users with labour/worker services.

## Tech Stack
- Next.js 16.2.9 (App Router)
- TypeScript 5
- Tailwind CSS v4
- Framer Motion 12.41.0
- Leaflet 1.9.4 + react-leaflet 5.0.0 (Maps)
- lucide-react 1.21.0 (Icons)
- date-fns 4.4.0, react-day-picker 10.0.1
- axios 1.18.1 (HTTP Client)

## Key Files & Directories
- `app/`: Next.js App Router with route groups
  - `(auth)/`: Login/Signup/OTP pages (no nav)
  - `(user)/`: Protected user pages (home, create-request, requests, etc.)
  - `(public)/`: Landing page
- `components/`: React components
- `services/`: API & Socket services
- `lib/`: Utilities, types, API calls
- `stores/`: State management

## Important Conventions

### Authentication
- Check auth using `getAuthToken()` from `lib/api/auth.ts`
- Protected routes: All routes in `(user)/` group
- Use HTTP-only cookies for secure token storage

### Socket.io
- Socket service in `services/socket.ts`
- **Disabled by default** (`SOCKET_ENABLED = false`)
- Enable only when backend socket.io is ready
- Uses `NEXT_PUBLIC_BACKEND_URL` for connection

### Icons
- Use lucide-react instead of raw SVGs
- Import icons from 'lucide-react'

### Environment Variables
- Backend: `BACKEND_URL` (server-side)
- Client-side: `NEXT_PUBLIC_BACKEND_URL` (browser accessible)
- Firebase: `FIRE_PROJECT_ID`

## Recent Updates
- Added waiting page for job requests: `app/(user)/waiting/[jobId]/page.tsx`
- Added socket.io integration (disabled by default)
- Added cancel job API in `services/job.ts`
- Implemented route protection with `proxy.ts` middleware
