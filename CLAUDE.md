# LabourBaba Project Context

## Project Overview
LabourBaba is a mobile-first web application built with Next.js 16 that connects users with labour/worker services.

## Tech Stack
- **Framework**: Next.js 16.2.9 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI/Animations**: Framer Motion 12.41.0
- **Maps**: Leaflet 1.9.4 + react-leaflet 5.0.0
- **Icons**: lucide-react 1.21.0
- **Date/Time**: date-fns 4.4.0, react-day-picker 10.0.1
- **SVG**: @svgr/webpack 8.1.0

## New Project Structure

```
LabourBaba-Website/
├── app/                                    # Next.js App Router
│   ├── layout.tsx                         # Root Layout
│   ├── page.tsx                         # Root Page (redirects → /landing)
│   ├── globals.css
│   │
│   ├── (auth)/                           # Auth Route Group (no nav)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── otp/page.tsx
│   │
│   ├── (user)/                           # User Route Group (with nav)
│   │   ├── layout.tsx
│   │   ├── home/page.tsx
│   │   ├── create-request/page.tsx
│   │   ├── requests/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       ├── cancel/page.tsx
│   │   │       └── complete/page.tsx
│   │   ├── location/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── alerts/page.tsx
│   │   ├── reviews/page.tsx
│   │   └── help/page.tsx
│   │
│   ├── (public)/                          # Public Route Group
│   │   ├── layout.tsx
│   │   └── landing/page.tsx             # Landing Page
│   │
├── components/
│   ├── LandingPage/
│   ├── HomePage/
│   ├── auth/
│   ├── ui/
│   ├── layout/
│   ├── features/
│   └── providers/
│
├── lib/
│   ├── api/
│   ├── socket/
│   ├── hooks/
│   ├── constants/
│   ├── location-storage.ts       # Location localStorage utilities
│   └── geocode.ts              # Reverse geocoding utilities
│
├── stores/
├── types/
└── public/
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Key Features

### 1. Mobile-First Design
- Container width: max-width 430px
- Background: #f5f7fa
- Custom `.mobile-container` class in globals.css

### 2. Route Groups
- `(auth)`: Authentication routes (login, signup, otp) — no bottom/top nav
- `(user)`: Authenticated user routes (home, create-request, requests, etc. — with nav)
- `(public)`: Public landing page

### 3. Core Routes
- `/` → redirects to `/landing`
- `/landing` → public marketing landing
- `/login`, `/signup`, `/otp` → auth flow
- `/home` → main app home
- `/create-request` → book a worker
- `/requests` → view active requests
- `/requests/[id]/cancel → cancel request
- `/requests/[id]/complete → mark request completion
- `/location` → map-based location picker
- `/profile` → user profile
- `/alerts` → notifications
- `/reviews` → reviews given
- `/help` → help & support

### 4. Main Components
- `BottomNav.tsx`: Bottom navigation for authenticated views
- `TopNavbar.tsx`: Top header
- `MapPicker.tsx`: Interactive map component
- `ServiceSelector.tsx`: Choose labour services
- `ScheduleSelector.tsx`: Date/time selection

### 5. Location Storage System
- `lib/location-storage.ts`: Shared utilities for location localStorage management
  - Stores both coordinates (latitude/longitude) and addresses
  - Key: `labourbaba_user_location`
  - Functions: `getSavedLocation()`, `saveLocation()`, `hasLocationChanged()`, `isLocalStorageAvailable()`
- Components using this:
  - `CurrentLocationButton.tsx`: Saves location when user's current location is retrieved
  - `MapPicker.tsx`: Loads saved location on mount, saves when location/address is updated
  - `LocationCard.tsx`: Displays saved address in Create Request page

### 6. Styling
- Tailwind CSS v4
- Custom colors used:
  - Primary: #FF5404 (orange/brand color)
  - Backgrounds: #F8FAFC, #F6F8FB, #f5f7fa

### 7. Available Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # ESLint check
```

## 8. Important Notes
- **Next.js 16**: This version has breaking changes! Check node_modules/next/dist/docs for details
- **Dependencies Already Installed**: All packages are installed and project builds successfully
- **Build Status**: ✅ Production build completes without errors

## 9. Quick Reference
- Entry point: app/page.tsx (redirects to /landing
- Root layout: app/layout.tsx
- Global styles: app/globals.css
- Alias: @/* maps to project root (configured in tsconfig.json)
