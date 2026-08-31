# AgriShare 🚜🌾

> **Agricultural Equipment & Machinery Rental Marketplace**  
> *Connecting farmers with reliable, local agricultural equipment owners to optimize field operations and machinery utilization.*

---

## 🌟 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Monorepo Architecture](#monorepo-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Django + DRF)](#backend-setup-django--drf)
  - [Frontend Setup (Next.js 16+ App Router)](#frontend-setup-nextjs-16-app-router)
- [Environment Variables](#environment-variables)
- [Seed Data & Demo Accounts](#seed-data--demo-accounts)
- [API Documentation (Swagger / OpenAPI)](#api-documentation-swagger--openapi)
- [Core Business Rules & Workflows](#core-business-rules--workflows)
- [Automated Testing & Quality Checks](#automated-testing--quality-checks)
- [Production Deployment Preparation](#production-deployment-preparation)
- [License](#license)

---

## 📖 Overview

**AgriShare** solves the high capital expenditure barrier in modern farming. Equipment owners can monetize idle machinery (tractors, combine harvesters, air seeders, sprayers, tillage implements) during seasonal gaps, while renting farmers access high-performance machinery on-demand without prohibitive loan commitments.

---

## ✨ Key Features

1. **Modern Agricultural Design & UI**:
   - Custom agricultural green color palette (`#3f7d3a`, `#f7f9f4`, dark mode `#101711`).
   - Seamless **Light / Dark Mode** toggling with local storage persistence.
   - Glassmorphic panels, responsive grid cards, and mobile navigation drawer.

2. **Secure User Authentication**:
   - Custom Django `User` model with email-as-username.
   - Secure JWT lifecycle (`access_token` with auto-refresh on 401 via `refresh_token`).
   - Registration, login, profile management, and password change with Django password validators.

3. **Equipment Directory & Advanced Search**:
   - Dynamic search by machine name, brand, model, and location.
   - Multi-facet filters: Category, Condition (`NEW`, `EXCELLENT`, `GOOD`, `FAIR`), Status, and Max Daily Price.
   - Sorting by newest, price low-to-high, price high-to-low, and name.
   - Gallery image uploading and owner management.

4. **Robust Booking & Rental Lifecycle**:
   - Server-side price computation (`total_amount = (price_per_day * total_days) + security_deposit`).
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
- **Styling**: Modern CSS Architecture & CSS Design Tokens (No bloated frameworks)
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
│   │   ├── layout.tsx      # Root layout with ThemeProvider & AuthProvider
│   │   ├── page.tsx        # Homepage landing page
│   │   ├── login/          # Auth login
│   │   ├── register/       # Auth register
│   │   ├── profile/        # User profile & password settings
│   │   ├── equipment/      # Catalog, filters, and [id] details
│   │   ├── my-equipment/   # Owner inventory management
│   │   ├── bookings/       # Renter bookings & Owner incoming requests
│   │   ├── dashboard/      # Role-based analytics & stats
│   │   └── globals.css     # Agricultural design tokens & CSS classes
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── home/           # Hero, Features, HowItWorks, CTA
│   │   ├── equipment/      # EquipmentCard, Filters, Gallery
│   │   ├── booking/        # BookingModal with live price calculation
│   │   ├── reviews/        # ReviewModal & StarRating
│   │   ├── notifications/  # NotificationDrawer
│   │   └── ui/             # ThemeToggle, Button, Badges
│   ├── context/            # AuthContext, ThemeContext
│   ├── services/           # authService, equipmentService, bookingService, reviewService, notificationService, dashboardService
│   ├── lib/                # api.ts, utils.ts
│   └── types/              # Domain interfaces & API types
│
├── scripts/
│   └── test_e2e_flow.py    # Complete automated integration workflow test
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

1. Navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   py -3.13 -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment:
   ```bash
   cp .env.example .env
   ```

5. Run migrations & seed demo dataset:
   ```bash
   python manage.py migrate
   python manage.py seed_data
   ```

6. Run backend tests:
   ```bash
   python manage.py test
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

## 🔑 Seed Data & Demo Accounts

The database comes pre-seeded with realistic agricultural machinery across 7 categories (Tractors, Harvesters, Planters, Sprayers, Tillage, Balers, Haulers).

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@agrishare.com` | `admin12345` | Superuser / Staff admin |
| **Owner 1** | `john.farmer@agrishare.com` | `password123` | John Deere 8R, Case IH 8250 Combine |
| **Owner 2** | `sarah.agri@agrishare.com` | `password123` | Kinze Planter, Hagie Sprayer |
| **Renter** | `david.miller@agrishare.com` | `password123` | Active renter with sample rentals |

*(Quick demo buttons are also built directly into the `/login` page for 1-click testing).*

---

## 📚 API Documentation (Swagger / OpenAPI)

Once the backend is running, open your browser to:
- **Swagger UI Interactive Docs**: [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)
- **ReDoc Documentation**: [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)
- **OpenAPI Schema JSON**: [http://127.0.0.1:8000/api/schema/](http://127.0.0.1:8000/api/schema/)

---

## 🔒 Core Business Rules

1. **Server-Side Pricing**: The frontend never controls prices. Total amount and days are computed strictly on the backend:
   $$\text{Total Amount} = (\text{Equipment Daily Rate} \times \text{Total Days}) + \text{Security Deposit}$$
2. **Self-Rental Prevention**: Equipment owners cannot book their own listings.
3. **Availability & Conflict Checks**: Overlapping approved dates for the same machine are strictly rejected.
4. **Verified Review Integrity**: Only the renter who completed the rental contract can leave a review.
5. **Object-Level Permissions**: Only the equipment owner can edit or delete their listings.

---

## 🧪 Automated Testing & Quality Checks

Run the Django unit test suite:
```bash
python manage.py test
```

Run the complete end-to-end integration workflow test:
```bash
python scripts/test_e2e_flow.py
```

---

## 📄 License
MIT License. Built for agricultural innovation and sustainable machinery sharing.
