# LuffBlog - Full-Stack Modern Blog Platform

A production-ready blog platform built with Next.js 15, Auth.js v5, Prisma, and Neon PostgreSQL.

## Features

- **Auth.js v5 (NextAuth)**: Google OAuth integration with Prisma adapter.
- **Next.js 15 App Router**: Optimized with Server Components and Server Actions.
- **Neon PostgreSQL**: Serverless database for high performance.
- **Prisma ORM**: Type-safe database queries.
- **shadcn/ui (Base Nova)**: Beautiful, accessible UI components.
- **Framer Motion**: Smooth, premium animations.
- **Search & Filter**: Real-time search with debounced inputs and tag-based filtering.
- **Dark Mode**: Complete support via `next-themes`.
- **Responsive Layout**: Designed for all device sizes.
- **Toast Notifications**: Interactive feedback with Sonner.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: Auth.js (NextAuth v5 Beta)
- **Validation**: Zod
- **Animations**: Framer Motion

## Getting Started

### 1. Prerequisite

- [Neon Database](https://neon.tech) account and a PostgreSQL database.
- Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com).

### 2. Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="your-neon-connection-string"
AUTH_SECRET="your-generated-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Installation

```bash
npm install
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Running the App

```bash
npm run dev
```

## Deployment

Deploy easily to **Vercel**:

1.  Push your code to GitHub.
2.  Connect your repository to Vercel.
3.  Add the environment variables in the Vercel dashboard.
4.  Deploy!

---

Built with ❤️ by Antigravity
