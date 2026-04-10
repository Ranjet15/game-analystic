'use client';

import { useEffect, useState } from 'react';
import { addTeam, loadTeams, Team } from '@/lib/storage';

interface TeamSelectorProps {
  onTeamSelect: (teamId: string, teamName: string) => void;
}

export default function TeamSelector({ onTeamSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCode, setNewTeamCode] = useState('');

  useEffect(() => {
    loadStoredTeams();
  }, []);

  function loadStoredTeams() {
    setLoading(true);
    const data = loadTeams();
    setTeams(data);
    setLoading(false);
  }

  function handleAddTeam(e: React.FormEvent) {
    e.preventDefault();
    if (!newTeamName || !newTeamCode) return;

    try {
      addTeam(newTeamName, newTeamCode);
      setNewTeamName('');
      setNewTeamCode('');
      loadStoredTeams();
    } catch (error) {
      console.error('Failed to add team:', error);
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Teams</h2>
      
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => onTeamSelect(team.id, team.name)}
                className="p-4 border-2 border-yellow-400 rounded-lg hover:bg-yellow-400/20 transition text-left bg-gray-900"
              >
                <h3 className="font-bold text-lg text-yellow-400">{team.name}</h3>
                <p className="text-yellow-300">{team.code}</p>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-600 pt-6">
            <h3 className="font-bold mb-3 text-yellow-400">Add New Team</h3>
            <form onSubmit={handleAddTeam} className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Team Name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
              />
              <input
                type="text"
                placeholder="Team Code"
                value={newTeamCode}
                onChange={(e) => setNewTeamCode(e.target.value)}
                className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
              >
                Add Team
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
