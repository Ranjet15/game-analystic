# 📊 Mobile Legends Analytics Dashboard

A comprehensive game analytics platform for Mobile Legends teams to track hero performance, match results, and ban statistics. Built with Next.js, PostgreSQL, and Prisma ORM.

## 🎯 Features

- **Team Management** - Create and manage multiple teams
- **Match Tracking** - Record match results and hero selections
- **Hero Win Rate Analytics** - Track hero performance across matches
- **Ban Statistics** - Monitor hero ban patterns
- **Interactive Dashboards** - Visual analytics with charts and metrics
- **Real-time Data Updates** - Instantly see changes reflected
- **Manual Stats Editing** - Adjust win/loss records for historical data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (React, TypeScript, Tailwind CSS)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Charts**: Recharts
- **Validation**: Zod
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ and npm installed
- PostgreSQL database running
- PostgreSQL connection string ready

## ⚙️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env.local` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mpl_analytics"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Replace the connection string with your PostgreSQL credentials.

### 3. Initialize Database

Create the database schema and migrations:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all necessary tables
- Set up relationships and constraints
- Generate Prisma Client

### 4. Seed Sample Data (Optional)

To populate the database with sample heroes:

```bash
npx prisma db seed
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📊 Database Schema

### Main Tables

- **teams** - Team information
- **heroes** - Hero/champion data with roles
- **players** - Team roster management
- **matches** - Match records with results
- **match_heroes** - Heroes used in each match
- **bans** - Banned heroes per match
- **hero_stats** - Aggregated hero statistics

## 🎮 How to Use

### 1. Create a Team

- Click "Add New Team" in the Team Selector
- Enter team name and code
- Click "Add Team"

### 2. Add Match Result

- Select a team
- Go to "Add Match" section
- Choose Match Type (Scrim/Official)
- Select Result (Win/Loss)
- Select 5 heroes used in the match
- Click "Add Match"

### 3. View Analytics

- Navigate to "Analytics" section
- View charts for:
  - Win/Loss distribution
  - Hero win rates
  - Role distribution
  - Pick rate statistics
  - Overall team metrics

### 4. Edit Hero Stats

- Go to "Hero Statistics" table
- Click "Edit" on any hero row
- Modify wins/losses directly
- Click "Save" to update

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── teams/route.ts          # Teams CRUD API
│   │   ├── heroes/route.ts         # Heroes CRUD API
│   │   ├── matches/route.ts        # Matches creation API
│   │   └── hero-stats/route.ts     # Stats management API
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main dashboard
│   └── globals.css                 # Global styles
├── components/
│   ├── TeamSelector.tsx            # Team selection component
│   ├── MatchForm.tsx               # Match input form
│   ├── HeroStatsTable.tsx          # Hero statistics table
│   └── Analytics.tsx               # Analytics dashboard
└── prisma/
    └── schema.prisma               # Database schema

```

## 🔌 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/teams` | GET | Fetch all teams |
| `/api/teams` | POST | Create new team |
| `/api/heroes` | GET | Fetch all heroes |
| `/api/heroes` | POST | Add new hero |
| `/api/matches` | POST | Record new match |
| `/api/matches` | GET | Fetch team matches |
| `/api/hero-stats` | GET | Fetch hero statistics |
| `/api/hero-stats` | PUT | Update hero stats |

## 🎨 UI Components

### TeamSelector
Displays teams and allows creating new teams

### MatchForm
Form for recording new match results with hero selection

### HeroStatsTable
Editable table showing hero win rates and statistics

### Analytics
Dashboard with visualizations:
- Summary cards (wins, losses, overall WR)
- Win rate bar chart
- Win/loss pie chart
- Role distribution
- Pick rate chart

## 📊 Data Models

### Team
```typescript
- id: string
- name: string (unique)
- code: string (unique)
- players: Player[]
- matches: Match[]
- heroStats: HeroStats[]
```

### Hero
```typescript
- id: string
- name: string (unique)
- role: string
- heroStats: HeroStats[]
- matchHeroes: MatchHero[]
```

### Match
```typescript
- id: string
- teamId: string
- matchType: "Scrim" | "Official"
- result: "Win" | "Loss"
- date: DateTime
- heroes: MatchHero[]
- bans: Ban[]
```

### HeroStats
```typescript
- id: string
- teamId: string
- heroId: string
- totalMatches: number
- wins: number
- losses: number
- winrate: float
- matchType: string
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env.local`
- Ensure database exists and credentials are correct

### Migration Issues
```bash
npx prisma migrate reset
```
(⚠️ Warning: Deletes all data)

### Port Already in Use
```bash
npm run dev -- -p 3001
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Follow your platform's Next.js deployment guide.

## 📝 Future Enhancements

- [ ] Player statistics and rankings
- [ ] Team comparison analytics
- [ ] Export data (CSV, PDF)
- [ ] Advanced filtering and search
- [ ] Match history timeline
- [ ] Hero recommendation engine
- [ ] Real-time collaboration
- [ ] Mobile app version

## 📄 License

MIT License - Feel free to use this project as a template!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

For questions or issues, please create an issue in the repository.

---

**Ready to track hero performance?** 🎮📊

