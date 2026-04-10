export interface Team {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

export interface Hero {
  id: string;
  name: string;
  role: string;
}

export interface MatchRecord {
  id: string;
  teamId: string;
  matchType: string;
  result: 'Win' | 'Loss';
  heroIds: string[];
  date: string;
}

export interface HeroStat {
  id: string;
  teamId: string;
  heroId: string;
  hero: Hero;
  totalMatches: number;
  wins: number;
  losses: number;
  winrate: number;
  matchType: string;
  createdAt: string;
  updatedAt: string;
}

const TEAM_KEY = 'mlad_teams';
const MATCH_KEY = 'mlad_matches';
const HERO_STATS_KEY = 'mlad_hero_stats';

const HERO_LIST: Hero[] = [
  { id: 'akai', name: 'Akai', role: 'Tank' },
  { id: 'belerick', name: 'Belerick', role: 'Tank' },
  { id: 'baxia', name: 'Baxia', role: 'Tank' },
  { id: 'gloo', name: 'Gloo', role: 'Tank' },
  { id: 'khufra', name: 'Khufra', role: 'Tank' },
  { id: 'alice', name: 'Alice', role: 'Support' },
  { id: 'estes', name: 'Estes', role: 'Support' },
  { id: 'lolita', name: 'Lolita', role: 'Support' },
  { id: 'minotaur', name: 'Minotaur', role: 'Support' },
  { id: 'rafaela', name: 'Rafaela', role: 'Support' },
  { id: 'aldous', name: 'Aldous', role: 'Fighter' },
  { id: 'badang', name: 'Badang', role: 'Fighter' },
  { id: 'chou', name: 'Chou', role: 'Fighter' },
  { id: 'dyrroth', name: 'Dyrroth', role: 'Fighter' },
  { id: 'esa', name: 'Esa', role: 'Fighter' },
  { id: 'alucard', name: 'Alucard', role: 'Assassin' },
  { id: 'hayabusa', name: 'Hayabusa', role: 'Assassin' },
  { id: 'natalia', name: 'Natalia', role: 'Assassin' },
  { id: 'selena', name: 'Selena', role: 'Assassin' },
  { id: 'yin', name: 'Yin', role: 'Assassin' },
  { id: 'brody', name: 'Brody', role: 'Marksman' },
  { id: 'claude', name: 'Claude', role: 'Marksman' },
  { id: 'granger', name: 'Granger', role: 'Marksman' },
  { id: 'moskov', name: 'Moskov', role: 'Marksman' },
  { id: 'wanwan', name: 'Wanwan', role: 'Marksman' },
  { id: 'aurora', name: 'Aurora', role: 'Mage' },
  { id: 'cyclops', name: 'Cyclops', role: 'Mage' },
  { id: 'harith', name: 'Harith', role: 'Mage' },
  { id: 'pharsa', name: 'Pharsa', role: 'Mage' },
];

function readStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getHeroes(): Hero[] {
  return HERO_LIST;
}

export function loadTeams(): Team[] {
  return readStorage<Team[]>(TEAM_KEY) ?? [];
}

export function addTeam(name: string, code: string): Team {
  const teams = loadTeams();
  const team: Team = {
    id: crypto.randomUUID(),
    name,
    code,
    createdAt: new Date().toISOString(),
  };
  teams.push(team);
  writeStorage(TEAM_KEY, teams);
  return team;
}

export function loadMatches(teamId: string): MatchRecord[] {
  const matches = readStorage<MatchRecord[]>(MATCH_KEY) ?? [];
  return matches.filter((match) => match.teamId === teamId).sort((a, b) => b.date.localeCompare(a.date));
}

export function addMatch(teamId: string, matchType: string, result: 'Win' | 'Loss', heroIds: string[]): MatchRecord {
  const matches = readStorage<MatchRecord[]>(MATCH_KEY) ?? [];
  const match: MatchRecord = {
    id: crypto.randomUUID(),
    teamId,
    matchType,
    result,
    heroIds,
    date: new Date().toISOString(),
  };
  matches.push(match);
  writeStorage(MATCH_KEY, matches);
  updateStatsForMatch(teamId, matchType, result, heroIds);
  return match;
}

function getStats(): HeroStat[] {
  return readStorage<HeroStat[]>(HERO_STATS_KEY) ?? [];
}

function saveStats(stats: HeroStat[]) {
  writeStorage(HERO_STATS_KEY, stats);
}

export function getHeroStats(teamId: string): HeroStat[] {
  return getStats().filter((stat) => stat.teamId === teamId);
}

export function getHeroStatsByMatchType(teamId: string, matchType: 'Overall' | 'Scrim' | 'Official'): HeroStat[] {
  const teamStats = getStats().filter((stat) => stat.teamId === teamId);

  if (matchType !== 'Overall') {
    return teamStats.filter((stat) => stat.matchType === matchType);
  }

  const aggregated = new Map<string, HeroStat>();

  teamStats.forEach((stat) => {
    const key = `${stat.heroId}`;
    const existing = aggregated.get(key);

    if (existing) {
      existing.totalMatches += stat.totalMatches;
      existing.wins += stat.wins;
      existing.losses += stat.losses;
      existing.winrate = existing.totalMatches > 0 ? parseFloat(((existing.wins / existing.totalMatches) * 100).toFixed(1)) : 0;
      existing.updatedAt = stat.updatedAt > existing.updatedAt ? stat.updatedAt : existing.updatedAt;
      existing.matchType = 'Overall';
    } else {
      aggregated.set(key, {
        ...stat,
        id: `overall-${teamId}-${stat.heroId}`,
        matchType: 'Overall',
      });
    }
  });

  return Array.from(aggregated.values());
}

function updateStatsForMatch(teamId: string, matchType: string, result: 'Win' | 'Loss', heroIds: string[]) {
  const stats = getStats();
  const updated: HeroStat[] = [...stats];
  const isWin = result === 'Win';

  heroIds.forEach((heroId) => {
    const keyMatch = updated.find((item) => item.teamId === teamId && item.heroId === heroId && item.matchType === matchType);
    if (keyMatch) {
      keyMatch.totalMatches += 1;
      keyMatch.wins += isWin ? 1 : 0;
      keyMatch.losses += isWin ? 0 : 1;
      keyMatch.winrate = keyMatch.totalMatches > 0 ? parseFloat(((keyMatch.wins / keyMatch.totalMatches) * 100).toFixed(1)) : 0;
      keyMatch.updatedAt = new Date().toISOString();
    } else {
      const hero = HERO_LIST.find((item) => item.id === heroId) ?? {
        id: heroId,
        name: heroId,
        role: 'Unknown',
      };
      updated.push({
        id: crypto.randomUUID(),
        teamId,
        heroId,
        hero,
        totalMatches: 1,
        wins: isWin ? 1 : 0,
        losses: isWin ? 0 : 1,
        winrate: isWin ? 100 : 0,
        matchType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  saveStats(updated);
}

export function updateHeroStat(id: string, wins: number, losses: number): HeroStat | null {
  const stats = getStats();
  const stat = stats.find((item) => item.id === id);
  if (!stat) return null;
  stat.wins = wins;
  stat.losses = losses;
  stat.totalMatches = wins + losses;
  stat.winrate = stat.totalMatches > 0 ? parseFloat(((wins / stat.totalMatches) * 100).toFixed(1)) : 0;
  stat.updatedAt = new Date().toISOString();
  saveStats(stats);
  return stat;
}
