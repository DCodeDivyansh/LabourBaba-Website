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
- **HTTP Client**: axios 1.18.1

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
│   ├── CreateRequest/
│   ├── auth/
│   ├── ui/
│   ├── layout/
│   ├── features/
│   └── providers/
│
├── lib/
│   ├── api/
│   │   ├── demo.ts
│   │   ├── job.ts
│   │   └── auth.ts
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
- `TopBar.tsx`/`CommonHeader.tsx`: Common header component
- `MapPicker.tsx`: Interactive map component
- `ServiceSelector.tsx`: Choose labour services
- `ScheduleSelector.tsx`: Date/time selection
- `WorkerCard.tsx`: Worker type selection card
- `RateInput.tsx`: Daily rate input component
- `LoginCard.tsx`: Login form card
- `LogoSection.tsx`: Logo component

### 5. Location Storage System
- `lib/location-storage.ts`: Shared utilities for location localStorage management
  - Stores both coordinates (latitude/longitude) and addresses
  - Key: `labourbaba_user_location`
  - Functions: `getSavedLocation()`, `saveLocation()`, `hasLocationChanged()`, `isLocalStorageAvailable()`
- Components using this:
  - `CurrentLocationButton.tsx`: Saves location when user's current location is retrieved
  - `MapPicker.tsx`: Loads saved location on mount, saves when location/address is updated
  - `LocationCard.tsx`: Displays saved address in Create Request page
  - `app/(user)/create-request/page.tsx`: Uses saved location

### 6. Authentication System
- `lib/api/auth.ts`: Server-side authentication API functions
  - `clientSignup()`: Signs up a new client with phone, name, and password, saves `auth_token` and `customer_id` to cookies
  - `clientLogin()`: Logs in a client with phone and password, saves `auth_token` and `customer_id` to cookies
  - `setAuthToken()`, `getAuthToken()`, `removeAuthToken()`: Secure token management using HTTP-only cookies
  - `setCustomerId()`, `getCustomerId()`, `removeCustomerId()`: Customer ID management using HTTP-only cookies
  - `logout()`: Removes both `auth_token` and `customer_id` from cookies
- Routes:
  - `app/(auth)/signup/page.tsx`: Updated to include password field and connect to signup API
  - `components/auth/LoginCard.tsx`: Updated to include password field and connect to login API

### 7. Job/Request Creation System
- `lib/api/job.ts`: Server-side job API functions
  - `createJob()`: Creates a new job with location, initial requirements, and customer_id, includes authorization header with auth_token
  - `addJobRequirement()`: Adds requirements to an existing job with wave_size, includes authorization header with auth_token
  - `getJob()`: Retrieves job information
- Request Flow:
  1. Create job with `/api/jobs`
  2. Add requirements with `/api/jobs/{jobId}/requirements`
  3. Navigate to requests page

### 8. Styling
- Tailwind CSS v4
- Custom colors used:
  - Primary: #FF5404 (orange/brand color)
  - Backgrounds: #F8FAFC, #F6F8FB, #f5f7fa, #FAFAFA

### 9. Available Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # ESLint check
```

## 10. Important Notes
- **Next.js 16**: This version has breaking changes! Check node_modules/next/dist/docs for details
- **Dependencies Already Installed**: All packages are installed and project builds successfully
- **Build Status**: ✅ Production build completes without errors

## 11. Integrated APIs

### 11.1 Health Check API
- **Endpoint**: `GET /health`
- **File**: `lib/api/demo.ts`
- **Function**: `getDemo()`
- **Description**: Basic health check endpoint to verify backend connectivity

### 11.2 Authentication APIs
- **File**: `lib/api/auth.ts`

#### Client Signup
- **Endpoint**: `POST /api/clients/signup`
- **Function**: `clientSignup(data: SignupRequest)`
- **Payload**: `{ phone: string, name: string, password: string }`
- **Response**: `{ token: string, customer_id: string }`
- **Description**: Registers a new client and stores auth_token and customer_id in HTTP-only cookies

#### Client Login
- **Endpoint**: `POST /api/clients/login`
- **Function**: `clientLogin(data: LoginRequest)`
- **Payload**: `{ phone: string, password: string }`
- **Response**: `{ token: string, customer_id: string }`
- **Description**: Authenticates a client and stores auth_token and customer_id in HTTP-only cookies

#### Cookie Management
- `setAuthToken(token: string)`: Stores auth_token in HTTP-only cookie
- `getAuthToken()`: Retrieves auth_token from cookie
- `removeAuthToken()`: Deletes auth_token cookie
- `setCustomerId(customer_id: string)`: Stores customer_id in HTTP-only cookie
- `getCustomerId()`: Retrieves customer_id from cookie
- `removeCustomerId()`: Deletes customer_id cookie
- `logout()`: Removes both auth_token and customer_id cookies

### 11.3 Job/Request APIs
- **File**: `lib/api/job.ts`

#### Create Job
- **Endpoint**: `POST /api/jobs`
- **Function**: `createJob(data: CreateJobRequest)`
- **Payload**: 
  ```typescript
  {
    customer_id?: string,
    latitude: number,
    longitude: number,
    location: string,
    requirements: Array<{
      skill_type: string,
      worker_count_needed: number,
      rate_per_day: number
    }>
  }
  ```
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**: Job object with `id`
- **Description**: Creates a new job request with location and initial requirements

#### Add Job Requirement
- **Endpoint**: `POST /api/jobs/{jobId}/requirements`
- **Function**: `addJobRequirement(jobId: string, data: AddRequirementRequest)`
- **Payload**:
  ```typescript
  {
    skill_type: string,
    worker_count_needed: number,
    rate_per_day: number,
    wave_size: number
  }
  ```
- **Headers**: `Authorization: Bearer <auth_token>`
- **Description**: Adds additional requirements to an existing job

#### Get Jobs
- **Endpoint**: `GET /api/jobs`
- **Function**: `getJobs()`
- **Headers**: `Authorization: Bearer <auth_token>`
- **Params**: `customer_id`
- **Response**: Array of Job objects
- **Description**: Retrieves all jobs for the authenticated customer

#### Get Job By ID
- **Endpoint**: `GET /api/jobs/{jobId}`
- **Function**: `getJobById(jobId: string)`
- **Headers**: `Authorization: Bearer <auth_token>`
- **Response**: Single Job object
- **Description**: Retrieves a specific job by ID

## 12. Quick Reference
- Entry point: app/page.tsx (redirects to /landing
- Root layout: app/layout.tsx
- Global styles: app/globals.css
- Alias: @/* maps to project root (configured in tsconfig.json)
- Backend URL: Configured via BACKEND_URL environment variable
