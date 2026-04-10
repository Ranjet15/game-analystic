'use client';

import { useEffect, useState } from 'react';
import { addTeam, loadTeams, Team } from '@/lib/storage';
import { getAllPHMLTeams } from '@/lib/phMplTeams';

interface TeamSelectorProps {
  onTeamSelect: (teamId: string, teamName: string, teamLogo?: string) => void;
}

export default function TeamSelector({ onTeamSelect }: TeamSelectorProps) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCode, setNewTeamCode] = useState('');
  const [showPHMLTeams, setShowPHMLTeams] = useState(false);
  const phMLTeams = getAllPHMLTeams();

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

  function handleAddPHMLTeam(phmlTeam: typeof phMLTeams[0]) {
    try {
      // Check if team already exists
      const exists = teams.some(t => t.code === phmlTeam.code);
      if (exists) {
        alert(`${phmlTeam.name} is already added`);
        return;
      }
      
      addTeam(phmlTeam.name, phmlTeam.code);
      loadStoredTeams();
      setShowPHMLTeams(false);
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => onTeamSelect(team.id, team.name, team.logo)}
                className="p-4 border-2 border-yellow-400 rounded-lg hover:bg-yellow-400/20 transition text-center bg-gray-900 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center text-sm font-bold text-black border border-yellow-400">
                  {team.code}
                </div>
                <div>
                  <h3 className="font-bold text-yellow-400 text-sm">{team.name}</h3>
                  <p className="text-yellow-300 text-xs">{team.code}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-600 pt-6">
            <div className="flex gap-3 mb-4 flex-wrap">
              <button
                onClick={() => setShowPHMLTeams(!showPHMLTeams)}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                {showPHMLTeams ? '➖ Hide PH-MPL Teams' : '➕ Quick Add PH-MPL Teams'}
              </button>
            </div>

            {showPHMLTeams && (
              <div className="bg-gray-900 rounded-lg p-4 mb-4 border border-blue-500">
                <h4 className="font-bold text-blue-400 mb-3">Professional MPL Philippines Teams</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {phMLTeams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => handleAddPHMLTeam(team)}
                      className="p-2 border border-blue-400 rounded hover:bg-blue-400/20 transition text-center bg-gray-800 flex flex-col items-center justify-center gap-2 text-sm"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-xs font-bold text-white">
                        {team.code}
                      </div>
                      <div>
                        <p className="font-bold text-blue-400 text-xs">{team.code}</p>
                        <p className="text-blue-300 text-xs">{team.name.split(' ').slice(0, 2).join(' ')}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <h3 className="font-bold mb-3 text-yellow-400">Add Custom Team</h3>
            <form onSubmit={handleAddTeam}>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <input
                    type="text"
                    placeholder="Team Name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white flex-1"
                  />
                  <input
                    type="text"
                    placeholder="Team Code"
                    value={newTeamCode}
                    onChange={(e) => setNewTeamCode(e.target.value)}
                    className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white flex-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
                >
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
