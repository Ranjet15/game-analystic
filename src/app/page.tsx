'use client';

import { useState } from 'react';
import TeamSelector from '@/components/TeamSelector';
import MatchForm from '@/components/MatchForm';
import HeroStatsTable from '@/components/HeroStatsTable';
import Analytics from '@/components/Analytics';
import { resetAllDataExceptTeams } from '@/lib/storage';

export default function Home() {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedTeamName, setSelectedTeamName] = useState('');
  const [selectedTeamCode, setSelectedTeamCode] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTeamSelect = (teamId: string, teamName: string, teamCode: string) => {
    setSelectedTeamId(teamId);
    setSelectedTeamName(teamName);
    setSelectedTeamCode(teamCode);
  };

  const handleMatchAdded = () => {
    // Trigger refresh of stats and analytics
    setRefreshTrigger(prev => prev + 1);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to clear all matches and hero statistics? Your teams will be kept.')) {
      resetAllDataExceptTeams();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Header */}
      <header className="bg-black border-b-4 border-yellow-400 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-yellow-400">Mobile Legends Analytics Dashboard</h1>
          <p className="text-yellow-300 mt-2 font-semibold">Track hero performance, match results, and ban statistics</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Team Selection */}
        <TeamSelector onTeamSelect={handleTeamSelect} />

        {selectedTeamId ? (
          <>
            {/* Team Info */}
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-6 border-l-4 border-yellow-400 flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center text-2xl font-bold text-black border-2 border-yellow-400">
                {selectedTeamCode}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-yellow-400">
                  {selectedTeamName}
                </h2>
                <p className="text-yellow-300 text-sm mt-1">Team Analytics Dashboard</p>
              </div>
              <button
                onClick={handleResetData}
                className="ml-auto px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition text-sm"
              >
                🔄 Reset Data
              </button>
            </div>

            {/* Tabs/Sections */}
            <div className="space-y-6">
              {/* Analytics Section */}
              <section>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">📈 Analytics</h2>
                <Analytics teamId={selectedTeamId} refreshTrigger={refreshTrigger} />
              </section>

              {/* Add Match Section */}
              <section>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">➕ Add Match</h2>
                <MatchForm teamId={selectedTeamId} onMatchAdded={handleMatchAdded} />
              </section>

              {/* Hero Stats Section */}
              <section>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">🎯 Hero Statistics</h2>
                <HeroStatsTable teamId={selectedTeamId} refreshTrigger={refreshTrigger} />
              </section>
            </div>
          </>
        ) : (
          <div className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-8 text-center">
            <p className="text-xl text-black font-bold">👈 Select a team to get started</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-yellow-400 text-yellow-300 text-center py-4 mt-12">
        <p className="font-semibold">Mobile Legends Analytics Dashboard © 2026</p>
      </footer>
    </div>
  );
}
