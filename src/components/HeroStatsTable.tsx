'use client';

import { useEffect, useState } from 'react';
import { getHeroStatsByMatchType, updateHeroStat } from '@/lib/storage';

interface HeroStat {
  id: string;
  totalMatches: number;
  wins: number;
  losses: number;
  winrate: number;
  banCount: number;
  banRate: number;
  matchType: string;
  hero: {
    name: string;
    role: string;
  };
}

interface HeroStatsTableProps {
  teamId: string;
  refreshTrigger: number;
}

export default function HeroStatsTable({ teamId, refreshTrigger }: HeroStatsTableProps) {
  const [stats, setStats] = useState<HeroStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('Overall');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ wins: 0, losses: 0 });

  useEffect(() => {
    fetchStats();
  }, [teamId, refreshTrigger, filterType]);

  function fetchStats() {
    setLoading(true);
    const data = getHeroStatsByMatchType(teamId, filterType as 'Overall' | 'Scrim' | 'Official');
    setStats(data);
    setLoading(false);
  }

  function handleEditStat(statId: string, wins: number, losses: number) {
    const updated = updateHeroStat(statId, wins, losses);
    if (updated) {
      setEditingId(null);
      fetchStats();
      alert('Stats updated!');
    }
  }

  const filteredStats = stats;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Hero Win Rates</h2>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white font-semibold"
        >
          <option>Overall</option>
          <option>Scrim</option>
          <option>Official</option>
        </select>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading stats...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 border-b border-yellow-400">
                <th className="px-4 py-2 text-left text-yellow-400 font-bold">Hero</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Role</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Matches</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Wins</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Losses</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Win Rate %</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Ban Count</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Ban Rate %</th>
                <th className="px-4 py-2 text-center text-yellow-400 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStats.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-4 text-center text-yellow-300">
                    No data for {filterType}
                  </td>
                </tr>
              ) : (
                filteredStats
                  .sort((a, b) => b.totalMatches - a.totalMatches)
                  .map((stat) => (
                    <tr key={stat.id} className="border-b border-gray-600 hover:bg-gray-700/50">
                      <td className="px-4 py-3 font-semibold text-yellow-400">{stat.hero.name}</td>
                      <td className="px-4 py-3 text-center text-sm text-yellow-300">
                        {stat.hero.role}
                      </td>
                      <td className="px-4 py-3 text-center text-white">{stat.totalMatches}</td>
                      {editingId === stat.id ? (
                        <>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={editValues.wins}
                              onChange={(e) =>
                                setEditValues({...editValues, wins: parseInt(e.target.value)})
                              }
                              className="w-12 px-2 py-1 border border-yellow-400 rounded text-center bg-gray-700 text-white"
                              min="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="number"
                              value={editValues.losses}
                              onChange={(e) =>
                                setEditValues({...editValues, losses: parseInt(e.target.value)})
                              }
                              className="w-12 px-2 py-1 border border-yellow-400 rounded text-center bg-gray-700 text-white"
                              min="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-center text-yellow-400 font-bold">
                            {editValues.wins + editValues.losses > 0
                              ? (
                                  (editValues.wins /
                                    (editValues.wins + editValues.losses)) *
                                  100
                                ).toFixed(1)
                              : '0'}
                            %
                          </td>
                          <td className="px-4 py-3 text-center flex gap-2 justify-center">
                            <button
                              onClick={() =>
                                handleEditStat(stat.id, editValues.wins, editValues.losses)
                              }
                              className="px-2 py-1 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-center text-white">{stat.wins}</td>
                          <td className="px-4 py-3 text-center text-white">{stat.losses}</td>
                          <td className="px-4 py-3 text-center font-bold text-yellow-400">
                            {stat.winrate.toFixed(1)}%
                          </td>
                          <td className="px-4 py-3 text-center text-white">{stat.banCount}</td>
                          <td className="px-4 py-3 text-center font-bold text-red-400">
                            {stat.banRate.toFixed(1)}%
                          </td>
                          <td className="px-4 py-3 text-center">
                            {filterType === 'Overall' ? (
                              <span className="text-yellow-300 text-sm">Read-only</span>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingId(stat.id);
                                  setEditValues({wins: stat.wins, losses: stat.losses});
                                }}
                                className="px-3 py-1 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 text-sm"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
