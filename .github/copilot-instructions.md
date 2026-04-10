# Mobile Legends Analytics Dashboard - Development Instructions

This is a Next.js application for tracking Mobile Legends team performance, hero statistics, and match analytics.

## Project Overview

- **Purpose**: Game analytics platform for Mobile Legends teams
- **Tech Stack**: Next.js 15, React, TypeScript, PostgreSQL, Prisma, Recharts, Tailwind CSS
- **Key Features**: Team management, match tracking, hero analytics, interactive dashboards

## Architecture

### Frontend
- Next.js App Router with TypeScript
- React components in `src/components/`
- Server and client components
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- API routes in `src/app/api/`
- Prisma ORM for database operations
- RESTful endpoints for CRUD operations

### Database
- PostgreSQL with Prisma schema
- 9 interconnected tables for data management
- Automatic winrate calculations

## Getting Started

### 1. Database Setup
```bash
# Configure DATABASE_URL in .env.local
npx prisma migrate dev --name init
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Access Application
Open http://localhost:3000

## Key Files & Directories

| Path | Purpose |
|------|---------|
| `src/components/` | React components (TeamSelector, MatchForm, HeroStatsTable, Analytics) |
| `src/app/page.tsx` | Main dashboard page |
| `src/app/api/` | Backend API routes |
| `prisma/schema.prisma` | Database schema definition |
| `.env.local` | Environment variables (DATABASE_URL, NEXT_PUBLIC_API_URL) |
| `README.md` | Comprehensive user guide |

## Common Development Tasks

### Adding a New Feature
1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev --name feature_name`
3. Create API routes in `src/app/api/`
4. Build React components in `src/components/`
5. Integrate into dashboard pages

### Modifying the Database
1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name change_description`
3. Update API routes and components accordingly

### Adding New API Endpoints
1. Create new route file: `src/app/api/[resource]/route.ts`
2. Implement GET, POST, PUT, DELETE as needed
3. Use Prisma client for database operations
4. Return JSON responses

### Creating New Components
1. Create in `src/components/ComponentName.tsx`
2. Use 'use client' directive for interactive components
3. Use TypeScript interfaces for props
4. Leverage Tailwind CSS for styling

## Important Notes

- All API endpoints use Prisma for database interactions
- Components use React hooks (useState, useEffect) for state management
- Styling is Tailwind CSS-based
- Charts use Recharts library
- Database cascades on delete for referential integrity

## Database Models
- Team, Hero, Player, Match, MatchHero, Ban, HeroStats

## Next Steps
- Set up PostgreSQL database
- Configure .env.local
- Run migrations
- Seed initial hero data
- Start development

---

**Last Updated**: 2026-04-11
