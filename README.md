# Pgions

A PG (Paying Guest) discovery and roommate matching platform built with Next.js.

## Overview

Pgions addresses common challenges in the Indian rental market: trust verification, property quality assessment, and roommate compatibility. The platform includes features for property search, trust scoring, roommate matching, and rent agreement generation.

## Features

- **Vibe-Match Compatibility Engine**: Lifestyle-based roommate matching algorithm considering sleep schedules, work-from-home preferences, and social behavior
- **Z-Scam Shield**: Multi-parameter verification system for property owners and listings to prevent rental scams
- **Property Search**: Filter and search PG listings by location, amenities, and price
- **Rent Agreement Generator**: PDF generation for rental agreements using jsPDF
- **Rent Split Calculator**: Fair rent distribution tool for shared accommodations based on room features
- **Visit Scheduling**: In-app scheduling for property visits

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: CSS Modules with custom design tokens
- **Authentication**: NextAuth.js (Google OAuth + credentials)
- **Database**: Prisma ORM with PostgreSQL
- **PDF Generation**: jsPDF
- **Icons**: Lucide React

## Project Structure

```
Pgions/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # REST API endpoints
│   ├── listing/          # Property detail pages
│   ├── search/           # Search and filter interface
│   └── roommate/         # Roommate matching feature
├── components/           # Reusable UI components
├── data/                 # Static data fallback
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ankit4563564/Pgions.git
cd Pgions
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Initialize the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application is deployed on Vercel: [https://pgions.vercel.app/](https://pgions.vercel.app/)

## Key Implementation Details

### Trust Score Algorithm
The trust score evaluates properties across 20+ parameters including owner verification history, tenant reviews, listing consistency, and response times.

### Compatibility Matching
Roommate matching uses a weighted scoring system based on lifestyle preferences, budget alignment, and schedule compatibility.

### Flexible Data Layer
The application supports both static JSON data for quick deployment and Prisma-connected databases for production use cases.

## License

MIT License - see LICENSE file for details.