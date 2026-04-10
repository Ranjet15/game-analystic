# 📊 Mobile Legends Analytics Dashboard

A comprehensive game analytics platform for Mobile Legends teams to track hero performance, match results, and ban statistics. Built with Next.js, Tailwind CSS, Recharts, and browser localStorage.

## 🎯 Features

- **Team Management** - Create and manage multiple teams
- **Match Tracking** - Record match results and hero selections
- **Hero Win Rate Analytics** - Track hero performance across matches
- **Ban Statistics** - Monitor hero ban patterns
- **Interactive Dashboards** - Visual analytics with charts and metrics
- **Real-time Data Updates** - Instantly see changes reflected
- **Manual Stats Editing** - Adjust win/loss records for historical data

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.2.3 (React, TypeScript)
- **Styling**: Tailwind CSS
- **Data persistence**: Browser localStorage
- **Charts**: Recharts
- **Package Manager**: npm

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ and npm installed

## ⚙️ Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open your browser to `http://localhost:3000`.

No database configuration is required.

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
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main dashboard
│   └── globals.css                 # Global styles
├── components/
│   ├── TeamSelector.tsx            # Team selection component
│   ├── MatchForm.tsx               # Match input form
│   ├── HeroStatsTable.tsx          # Hero statistics table
│   └── Analytics.tsx               # Analytics dashboard
└── lib/
    └── storage.ts                 # Browser localStorage persistence
```

This app stores all data locally in the browser using localStorage. There is no external database or server-side ORM required.

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

### Common Issues
- If the dashboard does not load, ensure your browser supports localStorage.
- If data does not persist, verify that storage is not blocked by privacy settings or incognito mode.
- If a form does not submit, make sure all fields are completed and 5 heroes are selected.

### Build Issues
- Run `npm install` again if dependencies are missing.
- Run `npm run build` to check production compilation.

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

