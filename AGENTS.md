<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# LabourBaba Project Agent Guidelines

## Project Overview
LabourBaba is a mobile-first Next.js application for booking labour services. The repository contains customer, admin, worker, and public-facing routes.

## Stack
- Next.js 16.2.9 App Router, React 19, TypeScript 5
- Tailwind CSS v4
- Framer Motion for animation
- Leaflet and react-leaflet for location selection and maps
- Axios for API requests
- React Hook Form for form validation
- Zustand 5 with persist middleware for client state
- Socket.IO client for customer job updates
- Firebase and FCM for notifications
- Lucide React for icons

## Repository Structure
- `app/`: App Router pages and layouts
  - `(auth)/`: `/login`, `/signup`, and `/otp`
  - `(public)/`: `/landing` and `/support`
  - `(user)/`: customer pages such as `/home`, `/create-request`, `/requests`, `/waiting/[jobId]`, `/location`, `/profile`, `/alerts`, `/reviews`, `/help`, job cancellation, and job completion
  - `admin/`: `/admin` and `/admin/skills`
  - `worker/`: `/worker/incoming`, `/worker/bookings`, `/worker/bookings/bookingId`, and `/worker/profile`
  - `WorkerProfile/[bookingId]/`: worker profile view for a booking
  - `api/[...path]/`: backend API proxy route
- `components/`: shared navigation, location/map, booking, request, review, loading, and notification components
- `features/`: grouped UI features for auth, create-request, home, and landing pages
- `lib/api/`: API modules for auth, clients, jobs, bookings, dispatch, workers, skills, reviews, payments, chat, admin, and health checks
- `services/`: client services for jobs, Socket.IO, and Firebase
- `stores/`: Zustand stores for auth, jobs, and location
- `proxy.ts`: route access checks and stale session-cookie cleanup

## Authentication and Route Protection
- Server-side auth helpers are in `lib/api/auth.ts`.
- Auth uses HTTP-only `auth_token` and `customer_id` cookies.
- Use `getAuthToken()` and the existing auth helpers instead of reading auth cookies directly in components.
- `proxy.ts` protects customer routes when both cookies are present and protects `/admin` when `auth_token` is present.
- The worker routes exist in the app, but are not currently included in the proxy's protected route lists. Do not assume worker authentication is implemented here without checking the route and backend contract.

## Jobs, Bookings, and Realtime Updates
- Customer job creation and cancellation are handled through `services/job.ts` and `lib/api/job.ts`.
- Customer booking, dispatch, worker, payment, review, and chat calls live in their respective `lib/api/` modules.
- The waiting flow is `/waiting/[jobId]`.
- Socket.IO is currently enabled in `services/socket.ts` via `SOCKET_ENABLED = true` and uses `NEXT_PUBLIC_BACKEND_URL`.
- Use the existing socket helpers (`getSocket`, `joinCustomerRoom`, `waitForSocketConnection`, and `disconnectSocket`) rather than creating additional socket instances.

## UI and Code Conventions
- Use Lucide icons imported from `lucide-react`; avoid hand-written SVG icons.
- Preserve the mobile-first layout and existing component patterns.
- Reuse shared components and Zustand stores before adding parallel state or duplicate API logic.
- Use the `@/*` TypeScript path alias for project-root imports.

## Environment Variables
- `BACKEND_URL`: server-side backend URL
- `NEXT_PUBLIC_BACKEND_URL`: browser-accessible backend URL and Socket.IO endpoint
- Firebase configuration variables used by `services/firebase.ts` and `lib/hooks/useFCM.ts`

## Commands
```bash
npm run dev
npm run build
npm run lint
npm start
```

The production build runs the Next.js compiler and TypeScript checks. Existing dynamic-cookie and backend-connectivity warnings may appear during static page generation.
