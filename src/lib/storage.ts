export interface Team {
  id: string;
  name: string;
  code: string;
  logo?: string; // Base64 encoded logo
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
  bannedHeroes: string[];
  enemyHeroIds: string[];
  enemyBannedHeroes: string[];
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
  banCount: number;
  banRate: number;
  matchType: string;
  createdAt: string;
  updatedAt: string;
}

const TEAM_KEY = 'mlad_teams';
const MATCH_KEY = 'mlad_matches';
const HERO_STATS_KEY = 'mlad_hero_stats';

const HERO_LIST: Hero[] = [
  { id: 'aamon', name: 'Aamon', role: 'Assassin' },
  { id: 'akai', name: 'Akai', role: 'Tank' },
  { id: 'aldous', name: 'Aldous', role: 'Fighter' },
  { id: 'alice', name: 'Alice', role: 'Support' },
  { id: 'alpha', name: 'Alpha', role: 'Fighter' },
  { id: 'alucard', name: 'Alucard', role: 'Assassin' },
  { id: 'angela', name: 'Angela', role: 'Support' },
  { id: 'argus', name: 'Argus', role: 'Fighter' },
  { id: 'arlott', name: 'Arlott', role: 'Fighter' },
  { id: 'atlas', name: 'Atlas', role: 'Tank' },
  { id: 'aulus', name: 'Aulus', role: 'Fighter' },
  { id: 'aurora', name: 'Aurora', role: 'Mage' },
  { id: 'badang', name: 'Badang', role: 'Fighter' },
  { id: 'balmond', name: 'Balmond', role: 'Fighter' },
  { id: 'bane', name: 'Bane', role: 'Fighter' },
  { id: 'barats', name: 'Barats', role: 'Fighter' },
  { id: 'baxia', name: 'Baxia', role: 'Tank' },
  { id: 'beatrix', name: 'Beatrix', role: 'Marksman' },
  { id: 'belerick', name: 'Belerick', role: 'Tank' },
  { id: 'benedetta', name: 'Benedetta', role: 'Assassin' },
  { id: 'brody', name: 'Brody', role: 'Marksman' },
  { id: 'bruno', name: 'Bruno', role: 'Marksman' },
  { id: 'carmilla', name: 'Carmilla', role: 'Support' },
  { id: 'cecilion', name: 'Cecilion', role: 'Mage' },
  { id: 'change', name: 'Chang\'e', role: 'Mage' },
  { id: 'chip', name: 'Chip', role: 'Tank' },
  { id: 'chou', name: 'Chou', role: 'Fighter' },
  { id: 'cici', name: 'Cici', role: 'Mage' },
  { id: 'claude', name: 'Claude', role: 'Marksman' },
  { id: 'clint', name: 'Clint', role: 'Marksman' },
  { id: 'cyclops', name: 'Cyclops', role: 'Mage' },
  { id: 'diggie', name: 'Diggie', role: 'Support' },
  { id: 'dyrroth', name: 'Dyrroth', role: 'Fighter' },
  { id: 'edith', name: 'Edith', role: 'Tank' },
  { id: 'esmeralda', name: 'Esmeralda', role: 'Mage' },
  { id: 'estes', name: 'Estes', role: 'Support' },
  { id: 'eudora', name: 'Eudora', role: 'Mage' },
  { id: 'fanny', name: 'Fanny', role: 'Assassin' },
  { id: 'faramis', name: 'Faramis', role: 'Support' },
  { id: 'floryn', name: 'Floryn', role: 'Support' },
  { id: 'franco', name: 'Franco', role: 'Tank' },
  { id: 'fredrinn', name: 'Fredrinn', role: 'Fighter' },
  { id: 'freya', name: 'Freya', role: 'Fighter' },
  { id: 'gatotkaca', name: 'Gatotkaca', role: 'Tank' },
  { id: 'gloo', name: 'Gloo', role: 'Tank' },
  { id: 'gord', name: 'Gord', role: 'Mage' },
  { id: 'granger', name: 'Granger', role: 'Marksman' },
  { id: 'grock', name: 'Grock', role: 'Tank' },
  { id: 'guinevere', name: 'Guinevere', role: 'Fighter' },
  { id: 'gusion', name: 'Gusion', role: 'Assassin' },
  { id: 'hanabi', name: 'Hanabi', role: 'Marksman' },
  { id: 'hanzo', name: 'Hanzo', role: 'Assassin' },
  { id: 'harith', name: 'Harith', role: 'Mage' },
  { id: 'harley', name: 'Harley', role: 'Assassin' },
  { id: 'hayabusa', name: 'Hayabusa', role: 'Assassin' },
  { id: 'helcurt', name: 'Helcurt', role: 'Assassin' },
  { id: 'hilda', name: 'Hilda', role: 'Fighter' },
  { id: 'hylos', name: 'Hylos', role: 'Tank' },
  { id: 'irithel', name: 'Irithel', role: 'Marksman' },
  { id: 'ixia', name: 'Ixia', role: 'Mage' },
  { id: 'jawhead', name: 'Jawhead', role: 'Fighter' },
  { id: 'johnson', name: 'Johnson', role: 'Tank' },
  { id: 'joy', name: 'Joy', role: 'Assassin' },
  { id: 'julian', name: 'Julian', role: 'Fighter' },
  { id: 'kadita', name: 'Kadita', role: 'Assassin' },
  { id: 'kagura', name: 'Kagura', role: 'Mage' },
  { id: 'kaja', name: 'Kaja', role: 'Support' },
  { id: 'kalea', name: 'Kalea', role: 'Mage' },
  { id: 'karina', name: 'Karina', role: 'Assassin' },
  { id: 'karrie', name: 'Karrie', role: 'Marksman' },
  { id: 'khaleed', name: 'Khaleed', role: 'Support' },
  { id: 'khufra', name: 'Khufra', role: 'Tank' },
  { id: 'kimmy', name: 'Kimmy', role: 'Mage' },
  { id: 'lancelot', name: 'Lancelot', role: 'Assassin' },
  { id: 'lapu-lapu', name: 'Lapu-Lapu', role: 'Fighter' },
  { id: 'layla', name: 'Layla', role: 'Marksman' },
  { id: 'leomord', name: 'Leomord', role: 'Fighter' },
  { id: 'lesley', name: 'Lesley', role: 'Marksman' },
  { id: 'ling', name: 'Ling', role: 'Assassin' },
  { id: 'lolita', name: 'Lolita', role: 'Support' },
  { id: 'lukas', name: 'Lukas', role: 'Fighter' },
  { id: 'lunox', name: 'Lunox', role: 'Mage' },
  { id: 'luo-yi', name: 'Luo Yi', role: 'Assassin' },
  { id: 'lylia', name: 'Lylia', role: 'Mage' },
  { id: 'marcel', name: 'Marcel', role: 'Fighter' },
  { id: 'martis', name: 'Martis', role: 'Fighter' },
  { id: 'masha', name: 'Masha', role: 'Fighter' },
  { id: 'mathilda', name: 'Mathilda', role: 'Support' },
  { id: 'melissa', name: 'Melissa', role: 'Support' },
  { id: 'minotaur', name: 'Minotaur', role: 'Support' },
  { id: 'minsitthar', name: 'Minsitthar', role: 'Fighter' },
  { id: 'miya', name: 'Miya', role: 'Marksman' },
  { id: 'moskov', name: 'Moskov', role: 'Marksman' },
  { id: 'nana', name: 'Nana', role: 'Mage' },
  { id: 'natalia', name: 'Natalia', role: 'Assassin' },
  { id: 'natan', name: 'Natan', role: 'Marksman' },
  { id: 'nolan', name: 'Nolan', role: 'Assassin' },
  { id: 'novaria', name: 'Novaria', role: 'Mage' },
  { id: 'obsidia', name: 'Obsidia', role: 'Mage' },
  { id: 'odette', name: 'Odette', role: 'Mage' },
  { id: 'paquito', name: 'Paquito', role: 'Fighter' },
  { id: 'pharsa', name: 'Pharsa', role: 'Mage' },
  { id: 'phoveus', name: 'Phoveus', role: 'Fighter' },
  { id: 'popol-and-kupa', name: 'Popol and Kupa', role: 'Marksman' },
  { id: 'rafaela', name: 'Rafaela', role: 'Support' },
  { id: 'roger', name: 'Roger', role: 'Fighter' },
  { id: 'ruby', name: 'Ruby', role: 'Fighter' },
  { id: 'saber', name: 'Saber', role: 'Assassin' },
  { id: 'selena', name: 'Selena', role: 'Assassin' },
  { id: 'silvanna', name: 'Silvanna', role: 'Support' },
  { id: 'sora', name: 'Sora', role: 'Support' },
  { id: 'sun', name: 'Sun', role: 'Fighter' },
  { id: 'suyou', name: 'Suyou', role: 'Fighter' },
  { id: 'terizla', name: 'Terizla', role: 'Support' },
  { id: 'thamuz', name: 'Thamuz', role: 'Fighter' },
  { id: 'tigreal', name: 'Tigreal', role: 'Tank' },
  { id: 'uranus', name: 'Uranus', role: 'Tank' },
  { id: 'vale', name: 'Vale', role: 'Support' },
  { id: 'valentina', name: 'Valentina', role: 'Mage' },
  { id: 'valir', name: 'Valir', role: 'Marksman' },
  { id: 'vexana', name: 'Vexana', role: 'Mage' },
  { id: 'wanwan', name: 'Wanwan', role: 'Marksman' },
  { id: 'x-borg', name: 'X.Borg', role: 'Fighter' },
  { id: 'xavier', name: 'Xavier', role: 'Mage' },
  { id: 'yi-sun-shin', name: 'Yi Sun-shin', role: 'Assassin' },
  { id: 'yin', name: 'Yin', role: 'Assassin' },
  { id: 'yu-zhong', name: 'Yu Zhong', role: 'Fighter' },
  { id: 'yve', name: 'Yve', role: 'Mage' },
  { id: 'zetian', name: 'Zetian', role: 'Fighter' },
  { id: 'zhask', name: 'Zhask', role: 'Mage' },
  { id: 'zhuxin', name: 'Zhuxin', role: 'Mage' },
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

export function addTeam(name: string, code: string, logo?: string): Team {
  const teams = loadTeams();
  const team: Team = {
    id: crypto.randomUUID(),
    name,
    code,
    logo,
    createdAt: new Date().toISOString(),
  };
  teams.push(team);
  writeStorage(TEAM_KEY, teams);
  return team;
}

export function removeTeam(teamId: string): void {
  const teams = loadTeams();
  const filtered = teams.filter(t => t.id !== teamId);
  writeStorage(TEAM_KEY, filtered);
  
  // Also remove all matches and stats for this team
  const matches = readStorage<MatchRecord[]>(MATCH_KEY) ?? [];
  const filteredMatches = matches.filter(m => m.teamId !== teamId);
  writeStorage(MATCH_KEY, filteredMatches);
  
  const stats = getStats();
  const filteredStats = stats.filter(s => s.teamId !== teamId);
  saveStats(filteredStats);
}

export function updateTeamLogo(teamId: string, logo: string): Team | null {
  const teams = loadTeams();
  const team = teams.find(t => t.id === teamId);
  if (team) {
    team.logo = logo;
    writeStorage(TEAM_KEY, teams);
    return team;
  }
  return null;
}

export function loadMatches(teamId: string): MatchRecord[] {
  const matches = readStorage<MatchRecord[]>(MATCH_KEY) ?? [];
  return matches.filter((match) => match.teamId === teamId).sort((a, b) => b.date.localeCompare(a.date));
}

export function addMatch(teamId: string, matchType: string, result: 'Win' | 'Loss', heroIds: string[], bannedHeroes: string[], enemyHeroIds: string[] = [], enemyBannedHeroes: string[] = []): MatchRecord {
  const matches = readStorage<MatchRecord[]>(MATCH_KEY) ?? [];
  const match: MatchRecord = {
    id: crypto.randomUUID(),
    teamId,
    matchType,
    result,
    heroIds,
    bannedHeroes,
    enemyHeroIds,
    enemyBannedHeroes,
    date: new Date().toISOString(),
  };
  matches.push(match);
  writeStorage(MATCH_KEY, matches);
  updateStatsForMatch(teamId, matchType, result, heroIds, bannedHeroes);
  return match;
}

function getStats(): HeroStat[] {
  const stats = readStorage<HeroStat[]>(HERO_STATS_KEY) ?? [];
  // Migrate old stats to include banCount and banRate
  return stats.map(stat => ({
    ...stat,
    banCount: stat.banCount ?? 0,
    banRate: stat.banRate ?? 0,
  }));
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
      existing.banCount += stat.banCount;
      existing.winrate = existing.totalMatches > 0 ? parseFloat(((existing.wins / existing.totalMatches) * 100).toFixed(1)) : 0;
      existing.banRate = existing.totalMatches > 0 ? parseFloat(((existing.banCount / existing.totalMatches) * 100).toFixed(1)) : 0;
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

function updateStatsForMatch(teamId: string, matchType: string, result: 'Win' | 'Loss', heroIds: string[], bannedHeroes: string[]) {
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
        banCount: 0,
        banRate: 0,
        matchType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  // Update ban counts for all heroes
  const totalMatches = loadMatches(teamId).length + 1; // +1 for current match
  HERO_LIST.forEach((hero) => {
    const stat = updated.find((item) => item.teamId === teamId && item.heroId === hero.id && item.matchType === matchType);
    if (stat) {
      if (bannedHeroes.includes(hero.id)) {
        stat.banCount += 1;
      }
      stat.banRate = totalMatches > 0 ? parseFloat(((stat.banCount / totalMatches) * 100).toFixed(1)) : 0;
    } else if (bannedHeroes.includes(hero.id)) {
      // Create stat for banned hero if not exists
      updated.push({
        id: crypto.randomUUID(),
        teamId,
        heroId: hero.id,
        hero,
        totalMatches: 0,
        wins: 0,
        losses: 0,
        winrate: 0,
        banCount: 1,
        banRate: parseFloat((1 / totalMatches * 100).toFixed(1)),
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

export function resetAllDataExceptTeams(): void {
  if (typeof window === 'undefined') return;
  // Clear matches and hero statistics
  window.localStorage.removeItem(MATCH_KEY);
  window.localStorage.removeItem(HERO_STATS_KEY);
}
