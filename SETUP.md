# 🚀 Quick Start Setup Guide

This guide will help you get the Mobile Legends Analytics Dashboard up and running in minutes.

## Prerequisites

Make sure you have installed:
- ✅ Node.js 18+ ([Download](https://nodejs.org/))

## Step-by-Step Installation

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open the App

Open your browser and go to:

```bash
http://localhost:3000
```

## ✅ You're Done!

The Mobile Legends Analytics Dashboard should now be running locally.

## 📊 First Steps

1. **Create a Team** - Click "Add New Team" and enter team details
2. **Select a Team** - Choose a team card to start recording matches
3. **Add a Match** - Record a match result with hero selections
4. **View Analytics** - Check charts and hero performance notes

## 🐛 Troubleshooting

### App Does Not Load
- Make sure your browser supports localStorage
- Exit private/incognito mode if localStorage is blocked

### Data Does Not Persist
- Ensure browser storage permissions are enabled
- Clear cache and refresh the page if the app fails to update

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

## 📚 Useful Commands

```bash
npm install
npm run dev
npm run build
npm start
npm run lint
```

## 📖 Next Steps

- Read [README.md](./README.md) for feature details
- Explore the code in `src/components/` and `src/lib/storage.ts`

## 🎮 Start Tracking Analytics!

Use the dashboard to record match results, track hero performance, and analyze team stats—all without an external database.

