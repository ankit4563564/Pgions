# Pgions 🏙️✨

> **Modern, Premium PG Discovery & Roommate Matching Platform**

🌍 **Live Demo:** [https://pgions.vercel.app/](https://pgions.vercel.app/)

![Pgions Preview](https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80)

Pgions (pronounced *Pigeons*) is a next-generation Coliving and PG search engine built to solve urban living's biggest pain points: **Trust, Quality, and Compatibility.** 

Built with a stunning **Glassmorphic Design System**, deep gradients, and highly interactive UI components, Pgions provides an unparalleled, premium user experience compared to traditional listing sites.

---

## 🌟 Key Features

### 💎 Premium Glassmorphic UI/UX
A beautiful, highly-polished user interface featuring dynamic gradient orbs, frosted glass components, subtle SVG noise texturing, and buttery-smooth animations. Designed to look and feel like a top-tier modern startup product.

### 🧬 Vibe-Match Algorithm
Don't just choose a room; choose your community. Pgions calculates a **Compatibility Score** based on lifestyle habits (Quiet vs. Social, Night Owl vs. Early Bird, WFH friendly).

### 🛡️ Z-Scam Shield
In a market filled with fake listings, the **Pgions Shield** marks verified properties with a Trust Score algorithm.

### 💸 "Fair Share" Rent Splitter
Built-in smart calculator for shared rooms. Toggle perks like "Window Bed" or "Attached Washroom" to mathematically calculate the fair rent share for each roommate.

### 📜 1-Click AI Rent Agreement
Generate professional, legal-grade Rent Agreement PDFs instantly by entering basic tenant and owner details. Built-in **jsPDF** integration.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Actions)
- **Styling**: Vanilla CSS Modules with custom Glassmorphism tokens
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Google & Credentials)
- **Database Architecture**: Flexible Data Layer (Static JSON for Vercel edge delivery, or [Prisma ORM](https://www.prisma.io/) with PostgreSQL/SQLite)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Local Development

To run Pgions locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/ankit4563564/Pgions.git
cd Pgions
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
# Change this to your database URL if using Prisma, otherwise the app falls back to local JSON data.
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-super-secret-key-123"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

A clean, maintainable Next.js App Router architecture:

```
Pgions/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── api/              # Backend endpoints (Listings, Auth)
│   ├── listing/          # Dynamic property detail pages
│   └── search/           # Filterable search experience
├── components/           # Reusable UI components (Glass cards, Navbar, Footer)
├── data/                 # Static data layer (fallback DB)
├── lib/                  # Utility functions and Prisma client
├── prisma/               # Database schemas and seed scripts
└── public/               # Static assets
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with ❤️ for a seamless PG experience.*