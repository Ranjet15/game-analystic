# 🚀 Quick Start Setup Guide

This guide will help you get the Mobile Legends Analytics Dashboard up and running in 5 minutes!

## Prerequisites

Make sure you have installed:
- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ PostgreSQL 12+ ([Download](https://www.postgresql.org/download/))

## Step-by-Step Installation

### Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

### Step 2: Create PostgreSQL Database (1 minute)

Open your PostgreSQL client (pgAdmin, psql, or DBeaver) and run:

```sql
CREATE DATABASE mpl_analytics;
```

### Step 3: Configure Environment Variables (30 seconds)

1. Copy `.env.example` to `.env.local`
2. Update `DATABASE_URL` with your PostgreSQL credentials

**Example:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mpl_analytics"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Step 4: Setup Database Schema (1 minute)

Run Prisma migrations to create tables:

```bash
npx prisma migrate dev --name init
```

### Step 5: (Optional) Seed Sample Heroes (30 seconds)

Populate the database with Mobile Legends heroes:

```bash
npm run db:seed
```

### Step 6: Start Development Server (10 seconds)

```bash
npm run dev
```

**Open your browser and navigate to:** http://localhost:3000

## ✅ You're Done!

You should now see the Mobile Legends Analytics Dashboard! 🎉

## 📊 First Steps

1. **Create a Team** - Click "Add New Team" and enter team details
2. **Add a Match** - Select your team and record a match result
3. **View Analytics** - Check out the charts and statistics

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
- PostgreSQL is not running. Start your PostgreSQL service:
  - **Windows**: Services > PostgreSQL > Start
  - **Mac**: `brew services start postgresql`
  - **Linux**: `sudo service postgresql start`

### Error: "database "mpl_analytics" does not exist"
- Create the database manually (see Step 2 above)
- Or run: `npx prisma migrate dev --name init` (creates database automatically)

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Migration Failed
```bash
# Reset database (⚠️ Deletes all data)
npx prisma migrate reset
```

## 📚 Useful Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Check database schema
npx prisma db push

# View pending migrations
npx prisma migrate status

# Create a new migration
npx prisma migrate dev --name migration_name

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

## 📖 Next Steps

- Read [README.md](./README.md) for features and detailed documentation
- Check [.github/copilot-instructions.md](.github/copilot-instructions.md) for development guidelines
- Explore the code in `src/components/` and `src/app/api/`

## 🎮 Start Tracking Analytics!

Your Mobile Legends analytics platform is ready. Start recording matches and analyzing hero performance! 📊

---

**Need help?** Check the README.md or review the API endpoints in `.src/app/api/`
