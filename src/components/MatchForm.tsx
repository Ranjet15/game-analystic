'use client';

import { useState, useEffect } from 'react';
import { addMatch, getHeroes, Hero } from '@/lib/storage';

interface MatchFormProps {
  teamId: string;
  onMatchAdded: () => void;
}

export default function MatchForm({ teamId, onMatchAdded }: MatchFormProps) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>(['', '', '', '', '']);
  const [result, setResult] = useState<'Win' | 'Loss'>('Win');
  const [matchType, setMatchType] = useState('Scrim');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getHeroes();
    setHeroes(data);
    setLoading(false);
  }, []);

  function handleAddMatch(e: React.FormEvent) {
    e.preventDefault();
    if (!teamId || selectedHeroes.some((h) => !h)) {
      alert('Please select all 5 heroes');
      return;
    }

    addMatch(teamId, matchType, result, selectedHeroes);
    setSelectedHeroes(['', '', '', '', '']);
    setResult('Win');
    setMatchType('Scrim');
    onMatchAdded();
    alert('Match added successfully!');
  }

  const handleHeroChange = (index: number, heroId: string) => {
    const newHeroes = [...selectedHeroes];
    newHeroes[index] = heroId;
    setSelectedHeroes(newHeroes);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Add Match Result</h2>
      
      {loading ? (
        <p>Loading heroes...</p>
      ) : (
        <form onSubmit={handleAddMatch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-2 text-yellow-400">Match Type</label>
              <select
                value={matchType}
                onChange={(e) => setMatchType(e.target.value)}
                className="w-full px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
              >
                <option>Scrim</option>
                <option>Official</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-yellow-400">Result</label>
              <select
                value={result}
                onChange={(e) => setResult(e.target.value as 'Win' | 'Loss')}
                className="w-full px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 text-yellow-400">Select Heroes (5)</label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {selectedHeroes.map((heroId, index) => (
                <select
                  key={index}
                  value={heroId}
                  onChange={(e) => handleHeroChange(index, e.target.value)}
                  required
                  className="px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
                >
                  <option value="">Hero {index + 1}</option>
                  {heroes.map(hero => (
                    <option key={hero.id} value={hero.id}>
                      {hero.name}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
          >
            Add Match
          </button>
        </form>
      )}
    </div>
  );
}
