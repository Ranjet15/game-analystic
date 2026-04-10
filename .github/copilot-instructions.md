# Mobile Legends Analytics Dashboard - Development Instructions

This is a Next.js application for tracking Mobile Legends team performance, hero statistics, and match analytics.

## Project Overview

- **Purpose**: Game analytics platform for Mobile Legends teams
- **Tech Stack**: Next.js 16, React, TypeScript, Recharts, Tailwind CSS, localStorage
- **Key Features**: Team management, match tracking, hero analytics, interactive dashboards

## Architecture

### Frontend
- Next.js App Router with TypeScript
- React components in `src/components/`
- Client-side persistence using browser localStorage
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- No server-side database required
- All data is stored in the browser using localStorage

## Getting Started

### 1. Run Development Server
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
| `src/lib/storage.ts` | Browser localStorage persistence |
| `README.md` | Comprehensive user guide |

## Common Development Tasks

### Adding a New Feature
1. Update or add React components in `src/components/`
2. Use 'use client' for interactive UI
3. Leverage localStorage helpers in `src/lib/storage.ts`
4. Style with Tailwind CSS
5. Integrate into the dashboard page

### Modifying Persistence
1. Update helper functions in `src/lib/storage.ts`
2. Keep data stored in browser localStorage
3. Avoid introducing server-side database dependencies

### Creating New Components
1. Create in `src/components/ComponentName.tsx`
2. Use 'use client' directive for interactive components
3. Use TypeScript interfaces for props
4. Leverage Tailwind CSS for styling

## Important Notes

- The app uses browser localStorage for all data storage
- Components use React hooks (useState, useEffect)
- Styling is Tailwind CSS-based
- Charts use Recharts library
- No Prisma or PostgreSQL setup is required

## Next Steps
- Run `npm install`
- Run `npm run dev`
- Use the dashboard in the browser

---

**Last Updated**: 2026-04-11
