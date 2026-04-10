'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getHeroStatsByMatchType } from '@/lib/storage';

interface HeroStat {
  id: string;
  totalMatches: number;
  wins: number;
  losses: number;
  winrate: number;
  matchType: string;
  hero: {
    name: string;
    role: string;
  };
}

interface AnalyticsProps {
  teamId: string;
  refreshTrigger: number;
}

export default function Analytics({ teamId, refreshTrigger }: AnalyticsProps) {
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [teamId, refreshTrigger]);

  function fetchStats() {
    setLoading(true);
    const data = getHeroStatsByMatchType(teamId, 'Overall');
    setStats(data);
    setLoading(false);
  }

  if (loading) return <p className="text-yellow-400">Loading analytics...</p>;

  // Get overall stats
  const overallStats = stats.filter(s => s.matchType === 'Overall');
  
  // Prepare data for bar chart
  const chartData = overallStats
    .sort((a, b) => b.totalMatches - a.totalMatches)
    .slice(0, 10)
    .map(stat => ({
      name: stat.hero.name,
      winrate: stat.winrate,
      matches: stat.totalMatches
    }));

  // Get win/loss distribution
  const totalWins = overallStats.reduce((sum, s) => sum + s.wins, 0);
  const totalLosses = overallStats.reduce((sum, s) => sum + s.losses, 0);
  const winLossData = [
    { name: 'Wins', value: totalWins, fill: '#fbbf24' },
    { name: 'Losses', value: totalLosses, fill: '#6b7280' }
  ];

  // Get role distribution
  const roleData = overallStats.reduce((acc, stat) => {
    const role = stat.hero.role;
    const existing = acc.find(r => r.name === role);
    if (existing) {
      existing.count += stat.totalMatches;
    } else {
      acc.push({ name: role, count: stat.totalMatches });
    }
    return acc;
  }, [] as {name: string, count: number}[]);

  const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#6b7280', '#374151'];

  return (
    <div className="space-y-6 mb-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Total Wins</h3>
          <p className="text-4xl font-bold">{totalWins}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-400 p-6 rounded-lg shadow-md border-2 border-yellow-400">
          <h3 className="text-lg font-bold mb-2">Total Losses</h3>
          <p className="text-4xl font-bold">{totalLosses}</p>
        </div>
        <div className="bg-gradient-to-br from-black to-gray-900 text-yellow-400 p-6 rounded-lg shadow-md border-2 border-yellow-400">
          <h3 className="text-lg font-bold mb-2">Overall WR</h3>
          <p className="text-4xl font-bold">
            {totalWins + totalLosses > 0
              ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1)
              : '0'}
            %
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Win Rate Bar Chart */}
        {chartData.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Top 10 Heroes by Win Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#fbbf24" />
                <YAxis stroke="#fbbf24" />
                <Tooltip />
                <Bar dataKey="winrate" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Win/Loss Pie Chart */}
        {totalWins + totalLosses > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Win/Loss Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({name, value, percent}) => {
                    const pct = percent ?? 0;
                    return `${name}: ${value} (${(pct * 100).toFixed(1)}%)`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Role Distribution */}
        {roleData.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Role Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#fbbf24"
                  dataKey="count"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pick Rate */}
        {chartData.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Pick Rate Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis type="number" stroke="#fbbf24" />
                <YAxis dataKey="name" type="category" width={100} stroke="#fbbf24" />
                <Tooltip />
                <Bar dataKey="matches" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
