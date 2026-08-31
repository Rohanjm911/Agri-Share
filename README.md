# AgriShare 🚜🌾

> **Agricultural Equipment & Machinery Rental Marketplace**  
> *Connecting farmers with reliable, local agricultural equipment owners to optimize field operations and machinery utilization.*

---

## 🌟 Table of Contents
- [Project Milestones Status](#-project-milestones-status)
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Monorepo Architecture](#-monorepo-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Django + DRF)](#backend-setup-django--drf)
  - [Frontend Setup (Next.js 16+ App Router)](#frontend-setup-nextjs-16-app-router)
- [Environment Variables](#-environment-variables)
- [Seed Data & Kisan Demo Accounts](#-seed-data--kisan-demo-accounts)
- [Indian Farm Machinery Fleet](#-indian-farm-machinery-fleet)
- [API Documentation (Swagger / OpenAPI)](#-api-documentation-swagger--openapi)
- [Core Business Rules & Workflows](#-core-business-rules--workflows)
- [Automated Testing & Quality Checks](#-automated-testing--quality-checks)
- [Production Deployment Preparation](#-production-deployment-preparation)
- [Push to GitHub](#-push-to-github)
- [License](#-license)

---

## 🎯 Project Milestones Status

| Milestone | Description | Status |
| :--- | :--- | :--- |
| **Milestone 1: Backend Architecture & Auth** | Django 5.1, DRF, SimpleJWT, Custom User model (email as username), Profile & Password Management. | ✅ **COMPLETED** |
| **Milestone 2: Equipment Catalog & Search** | Categories, Equipment, EquipmentImage, multi-filter search, sorting, pagination, Swagger/OpenAPI docs. | ✅ **COMPLETED** |
| **Milestone 3: Booking Engine & Pricing** | Server-side pricing engine, date overlap prevention, self-rental blocking, approval workflow. | ✅ **COMPLETED** |
| **Milestone 4: Reviews & Notifications** | Verified 1-5 star reviews for completed bookings, average rating recalculation, in-app notification drawer. | ✅ **COMPLETED** |
| **Milestone 5: Role-Based Dashboard** | Analytics for both Owners (earnings, active rentals, inventory) and Renters (expenditure, booking status). | ✅ **COMPLETED** |
| **Milestone 6: Modern Next.js Frontend** | Next.js 16+ App Router, TypeScript, Custom SVG Logo, Google Fonts (Outfit & Inter), Dark/Light mode toggle. | ✅ **COMPLETED** |
| **Milestone 7: Indian Localization & Flat UI** | INR (`₹`) formatting, Indian machinery brands & real photography, Indian agricultural hubs, clean solid flat UI. | ✅ **COMPLETED** |
| **Milestone 8: Automated Test Suite** | 19 Django unit tests (`OK`) + 10-step automated end-to-end integration test (`100% Passed`). | ✅ **COMPLETED** |

---

## 📖 Overview

**AgriShare** solves the high capital expenditure barrier in agricultural mechanization. Tractor and implement owners can monetize idle machinery (tractors, combine harvesters, rotavators, super seeders, reversible ploughs, threshers) during seasonal gaps, while renting farmers access high-performance equipment on-demand without heavy loan burdens or middleman brokerages.

---

## ✨ Key Features

1. **Clean Solid Modern Flat UI**:
   - High-contrast **Agricultural Forest Green** (`#236f41`) and **Harvest Amber** (`#d97706`) solid design system with zero bloated gradients.
   - Seamless **Light / Dark Mode** toggling with local storage persistence.
   - Clean solid cards, responsive grid layouts, and interactive drawer navigation.

2. **Secure User Authentication**:
   - Custom Django `User` model with email-as-username.
   - Secure JWT lifecycle (`access_token` with auto-refresh on 401 via `refresh_token`).
   - Registration, login, profile management, and password change with Django password validators.

3. **Equipment Directory & Advanced Search**:
   - Dynamic search by machine name, brand, model, and location.
   - Multi-facet filters: Category, Condition (`NEW`, `EXCELLENT`, `GOOD`, `FAIR`), Status, and Max Daily Price.
   - Sorting by newest, price low-to-high, price high-to-low, and name.
   - Multiple image uploads and owner equipment inventory management.

4. **Robust Booking & Rental Lifecycle**:
   - Server-side price computation: `total_amount = (price_per_day * total_days) + security_deposit`.
   - Self-rental prevention and overlap conflict checks.
   - Full status lifecycle: `PENDING` &rarr; `APPROVED` &rarr; `REJECTED` &rarr; `CANCELLED` &rarr; `COMPLETED`.

5. **Verified Reviews & Star Ratings**:
   - Only renters with `COMPLETED` bookings can submit reviews (1 review per booking).
   - Real-time average equipment rating calculation.

6. **In-App Notifications & Role-Based Dashboard**:
   - Instant notifications on booking requests, approvals, cancellations, and reviews.
   - Aggregated metrics: Active listings, total earnings, pending requests, and expenditure totals.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript 5+
- **Styling**: Vanilla CSS Design Tokens (Clean flat modern architecture)
- **Fonts**: Google Fonts (`Outfit` for headings, `Inter` for body)
- **Icons**: Lucide React
- **Client Architecture**: Service layer (`services/`) + Centralized API client (`lib/api.ts`) + Context API (`AuthContext`, `ThemeContext`)

### Backend
- **Framework**: [Django 5.1](https://www.djangoproject.com/)
- **API**: [Django REST Framework 3.15+](https://www.django-rest-framework.org/)
- **Authentication**: `djangorestframework-simplejwt` (JWT Access & Refresh)
- **Filtering**: `django-filter`
- **Documentation**: `drf-spectacular` (OpenAPI 3.0 & Swagger UI)
- **CORS**: `django-cors-headers`
- **Image Handling**: Pillow
- **Database**: SQLite (default local development) / PostgreSQL (production-ready)

---

## 📁 Monorepo Architecture

```
AgriShare/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   ├── media/equipment/    # Real equipment photography assets
│   ├── config/
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   └── apps/
│       ├── accounts/       # Custom user, JWT auth, profile, change password
│       ├── equipment/      # Category, Equipment, EquipmentImage, search & filters
│       ├── bookings/       # Booking model, pricing engine, availability & approval
│       ├── reviews/        # Rating & reviews for completed bookings
│       ├── notifications/  # Notification events & unread count
│       └── dashboard/      # Aggregated metrics & activity feeds
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with ThemeProvider, AuthProvider & Google Fonts
│   │   ├── page.tsx        # Homepage landing page
│   │   ├── login/          # Auth login with 1-click Kisan demo buttons
│   │   ├── register/       # Auth register
│   │   ├── profile/        # User profile & password settings
│   │   ├── equipment/      # Catalog, filters, and [id] details
│   │   ├── my-equipment/   # Owner inventory management
│   │   ├── bookings/       # Renter bookings & Owner incoming requests
│   │   ├── dashboard/      # Role-based analytics & stats
│   │   └── globals.css     # Clean solid flat design tokens & CSS classes
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── home/           # HeroSection, FeaturesSection, HowItWorksSection, CTASection
│   │   ├── equipment/      # EquipmentCard, Filters, Gallery
│   │   ├── booking/        # BookingModal with live price calculation
│   │   ├── reviews/        # ReviewModal & StarRating
│   │   ├── notifications/  # NotificationDrawer
│   │   └── ui/             # Logo, ThemeToggle, Button, Badges
│   ├── context/            # AuthContext, ThemeContext
│   ├── services/           # authService, equipmentService, bookingService, reviewService, notificationService, dashboardService
│   ├── lib/                # api.ts, utils.ts
│   ├── public/             # Static assets & machinery photos
│   └── types/              # Domain interfaces & API types
│
├── scripts/
│   └── test_e2e_flow.py    # Complete automated integration workflow test
├── GITHUB_PUSH_GUIDE.md    # Step-by-step instructions to push to GitHub
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.12+ (tested with Python 3.13 / 3.14)
- **Node.js**: 18.x+ (tested with Node v24) & npm
- **Git**

---

### Backend Setup (Django + DRF)

1. Open terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   py -3.13 -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment:
   ```bash
   cp .env.example .env
   ```

5. Apply database migrations:
   ```bash
   python manage.py migrate
   ```

6. Seed demo Indian kisan users, machinery, and categories:
   ```bash
   python manage.py seed_data
   ```

7. Start Django development server on `http://127.0.0.1:8000`:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```

---

### Frontend Setup (Next.js 16+ App Router)

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install npm packages:
   ```bash
   npm install
   ```

3. Validate build compilation:
   ```bash
   npm run build
   ```

4. Start Next.js development server on `http://localhost:3000`:
   ```bash
   npm run dev
   ```

---

## 🔑 Seed Data & Kisan Demo Accounts

The database comes pre-seeded with realistic Indian agricultural machinery across 7 categories.

| Role | Email | Password | Details & Location |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@agrishare.com` | `admin12345` | Platform Administrator (New Delhi) |
| **Owner (Punjab)** | `gurpreet.singh@agrishare.com` | `password123` | Gurpreet Singh: Mahindra 585 DI, Swaraj 855 FE (Ludhiana, Punjab) |
| **Owner (Gujarat)** | `rajesh.patel@agrishare.com` | `password123` | Rajesh Patel: John Deere 5310, Fieldking Thresher (Rajkot, Gujarat) |
| **Owner (Haryana)** | `vikram.choudhary@agrishare.com` | `password123` | Vikram Choudhary: Preet 987 Harvester, Dasmesh Super Seeder (Karnal, Haryana) |
| **Renter (MP)** | `ramesh.sharma@agrishare.com` | `password123` | Ramesh Sharma: Active grower & renter (Indore, Madhya Pradesh) |

*(Quick demo buttons are also built directly into the `/login` page for 1-click testing).*

---

## 🌾 Indian Farm Machinery Fleet

| Machinery Model | Category | Owner & Location | Daily Rate | Refundable Deposit |
| :--- | :--- | :--- | :--- | :--- |
| **Mahindra Yuvo Tech+ 585 DI (49 HP)** | Tractors | Gurpreet Singh &bull; **Ludhiana, Punjab** | **₹2,800/day** | ₹8,000 |
| **Swaraj 855 FE Heavy Duty (52 HP)** | Tractors | Gurpreet Singh &bull; **Sangrur, Punjab** | **₹2,500/day** | ₹7,500 |
| **Preet 987 Self-Propelled Combine Harvester** | Harvesters | Vikram Choudhary &bull; **Karnal, Haryana** | **₹6,500/day** | ₹20,000 |
| **Shaktiman Semi-Champion Rotavator (7 Ft)** | Tillage | Ramesh Sharma &bull; **Indore, Madhya Pradesh** | **₹1,400/day** | ₹4,000 |
| **John Deere 5310 PowerTech CRDI (55 HP)** | Tractors | Rajesh Patel &bull; **Rajkot, Gujarat** | **₹3,200/day** | ₹9,000 |
| **Dasmesh 912 Super Seeder & Straw Chopper** | Seeding | Vikram Choudhary &bull; **Bathinda, Punjab** | **₹2,200/day** | ₹6,000 |
| **Lemken Opal 090 Hydraulic Reversible Plough** | Tillage | Ramesh Sharma &bull; **Nashik, Maharashtra** | **₹1,600/day** | ₹5,000 |
| **Fieldking Multi-Crop High-Yield Thresher** | Threshing | Rajesh Patel &bull; **Guntur, Andhra Pradesh** | **₹1,800/day** | ₹5,000 |

---

## 📚 API Documentation (Swagger / OpenAPI)

Interactive documentation and OpenAPI 3.0 schemas are generated via `drf-spectacular`:

- **Swagger UI**: [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- **OpenAPI Schema (JSON)**: [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/)

### Core API Endpoints

#### Authentication (`/api/auth/`)
- `POST /api/auth/register/` - Create account & receive JWT tokens
- `POST /api/auth/login/` - Authenticate with email & password
- `POST /api/auth/token/refresh/` - Refresh expired access token
- `GET /api/auth/profile/` - Fetch authenticated user profile
- `PUT /api/auth/profile/` - Update profile details & avatar
- `POST /api/auth/change-password/` - Update password securely

#### Equipment Catalog (`/api/equipment/`)
- `GET /api/equipment/categories/` - List all machinery categories
- `GET /api/equipment/` - Search, filter, and paginate machinery listings
- `POST /api/equipment/` - Create equipment listing (Authenticated)
- `GET /api/equipment/{id}/` - Retrieve full specifications & reviews
- `PUT /api/equipment/{id}/` - Update machinery details (Owner only)
- `DELETE /api/equipment/{id}/` - Delete machinery listing (Owner only)
- `GET /api/equipment/my_equipment/` - List all machinery owned by current user

#### Bookings (`/api/bookings/`)
- `POST /api/bookings/` - Create rental booking request (Auto-calculates pricing & validates availability)
- `GET /api/bookings/my_rentals/` - List bookings placed by current user as renter
- `GET /api/bookings/incoming_requests/` - List booking requests received by current user as owner
- `POST /api/bookings/{id}/approve/` - Approve booking request (Owner only)
- `POST /api/bookings/{id}/reject/` - Reject booking request (Owner only)
- `POST /api/bookings/{id}/cancel/` - Cancel booking request
- `POST /api/bookings/{id}/complete/` - Complete rental period

#### Reviews (`/api/reviews/`)
- `POST /api/reviews/` - Submit 1-5 star review (Requires completed booking)
- `GET /api/reviews/?equipment={id}` - List verified reviews for equipment

#### Notifications & Dashboard (`/api/notifications/`, `/api/dashboard/`)
- `GET /api/notifications/` - List user notifications with unread count
- `POST /api/notifications/{id}/read/` - Mark notification as read
- `POST /api/notifications/mark_all_read/` - Mark all notifications as read
- `GET /api/dashboard/stats/` - Aggregate metrics for Owner & Renter

---

## 🧪 Automated Testing & Quality Checks

### Run Django Unit Tests (19 Tests)
```bash
cd backend
python manage.py test
```
*Output: `Ran 19 tests in 18.8s -> OK`*

### Run Automated End-to-End Integration Flow
```bash
# Ensure Django server is running on 127.0.0.1:8000
python scripts/test_e2e_flow.py
```
*Output: `10 / 10 steps passed with 100% success`*

### Run Frontend Production Build Check
```bash
cd frontend
npm run build
```
*Output: `✓ Compiled successfully (11/11 static and dynamic routes)`*

---

## 🚢 Production Deployment Preparation

1. **Environment Configuration**: Set `DJANGO_ENV=production` and `DEBUG=False` in `backend/.env`.
2. **Database**: Switch from SQLite to PostgreSQL by providing `DATABASE_URL` or individual Postgres variables.
3. **Static Files & Media Storage**: Run `python manage.py collectstatic` and configure AWS S3 / Cloudinary for `MEDIA_ROOT`.
4. **CORS & CSRF**: Set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to your production frontend domain (e.g., `https://agrishare.com`).
5. **WSGI/ASGI Server**: Deploy backend with **Gunicorn** / **Uvicorn** behind Nginx reverse proxy.
6. **Frontend**: Deploy `frontend/` to **Vercel** or containerized Docker service with `NEXT_PUBLIC_API_URL=https://api.agrishare.com/api`.

---

## 📤 Push to GitHub

For detailed instructions on pushing this monorepo to your GitHub account, please see:
👉 [**GITHUB_PUSH_GUIDE.md**](file:///d:/projects%20and%20certificates/projects/web/AgriShare/GITHUB_PUSH_GUIDE.md)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
