'use client';

import { useState, useEffect } from 'react';
import { addMatch, getHeroes, Hero } from '@/lib/storage';

interface MatchFormProps {
  teamId: string;
  onMatchAdded: () => void;
}

interface HeroSelectProps {
  heroes: Hero[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

// Searchable Hero Select Component
function HeroSelect({ heroes, value, onChange, placeholder, disabled = false }: HeroSelectProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedHero = heroes.find(h => h.id === value);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder={selectedHero ? selectedHero.name : placeholder}
          value={isOpen ? search : (selectedHero ? selectedHero.name : '')}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          className="flex-1 px-3 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-700 text-white"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setSearch('');
            }}
            className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
          >
            ✕
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-yellow-400 rounded-lg max-h-48 overflow-y-auto">
          {filteredHeroes.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No heroes found</div>
          ) : (
            filteredHeroes.map(hero => (
              <button
                key={hero.id}
                type="button"
                onClick={() => {
                  onChange(hero.id);
                  setIsOpen(false);
                  setSearch('');
                }}
                className="w-full text-left px-3 py-2 hover:bg-yellow-400 hover:text-black transition text-white"
              >
                {hero.name} <span className="text-xs text-gray-400">({hero.role})</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function MatchForm({ teamId, onMatchAdded }: MatchFormProps) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedHeroes, setSelectedHeroes] = useState<string[]>([]);
  const [selectedBannedHeroes, setSelectedBannedHeroes] = useState<string[]>([]);
  const [selectedEnemyHeroes, setSelectedEnemyHeroes] = useState<string[]>([]);
  const [selectedEnemyBannedHeroes, setSelectedEnemyBannedHeroes] = useState<string[]>([]);
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
    if (!teamId || selectedHeroes.length === 0 || selectedHeroes.some((h) => !h)) {
      alert('Please select at least 1 hero for your team');
      return;
    }

    addMatch(teamId, matchType, result, selectedHeroes, selectedBannedHeroes, selectedEnemyHeroes, selectedEnemyBannedHeroes);
    setSelectedHeroes([]);
    setSelectedBannedHeroes([]);
    setSelectedEnemyHeroes([]);
    setSelectedEnemyBannedHeroes([]);
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

  const addHero = () => {
    if (selectedHeroes.length < 5) {
      setSelectedHeroes([...selectedHeroes, '']);
    }
  };

  const removeHero = (index: number) => {
    const newHeroes = selectedHeroes.filter((_, i) => i !== index);
    setSelectedHeroes(newHeroes);
  };

  const handleBannedHeroChange = (index: number, heroId: string) => {
    const newHeroes = [...selectedBannedHeroes];
    newHeroes[index] = heroId;
    setSelectedBannedHeroes(newHeroes);
  };

  const addBannedHero = () => {
    if (selectedBannedHeroes.length < 5) {
      setSelectedBannedHeroes([...selectedBannedHeroes, '']);
    }
  };

  const removeBannedHero = (index: number) => {
    const newHeroes = selectedBannedHeroes.filter((_, i) => i !== index);
    setSelectedBannedHeroes(newHeroes);
  };

  const handleEnemyHeroChange = (index: number, heroId: string) => {
    const newHeroes = [...selectedEnemyHeroes];
    newHeroes[index] = heroId;
    setSelectedEnemyHeroes(newHeroes);
  };

  const addEnemyHero = () => {
    if (selectedEnemyHeroes.length < 5) {
      setSelectedEnemyHeroes([...selectedEnemyHeroes, '']);
    }
  };

  const removeEnemyHero = (index: number) => {
    const newHeroes = selectedEnemyHeroes.filter((_, i) => i !== index);
    setSelectedEnemyHeroes(newHeroes);
  };

  const handleEnemyBannedHeroChange = (index: number, heroId: string) => {
    const newHeroes = [...selectedEnemyBannedHeroes];
    newHeroes[index] = heroId;
    setSelectedEnemyBannedHeroes(newHeroes);
  };

  const addEnemyBannedHero = () => {
    if (selectedEnemyBannedHeroes.length < 5) {
      setSelectedEnemyBannedHeroes([...selectedEnemyBannedHeroes, '']);
    }
  };

  const removeEnemyBannedHero = (index: number) => {
    const newHeroes = selectedEnemyBannedHeroes.filter((_, i) => i !== index);
    setSelectedEnemyBannedHeroes(newHeroes);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Add Match Result</h2>
      
      {loading ? (
        <p>Loading heroes...</p>
      ) : (
        <form onSubmit={handleAddMatch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TEAM SECTION */}
            <div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Your Team</h3>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-semibold text-yellow-400">Heroes ({selectedHeroes.length}/5)</label>
                    <button
                      type="button"
                      onClick={addHero}
                      disabled={selectedHeroes.length >= 5}
                      className="px-3 py-1 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedHeroes.map((heroId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <HeroSelect
                          heroes={heroes}
                          value={heroId}
                          onChange={(value) => handleHeroChange(index, value)}
                          placeholder={`Hero ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeHero(index)}
                          className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedHeroes.length === 0 && (
                    <p className="text-gray-400 text-sm mt-2">Click "Add" to select your team's heroes.</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-semibold text-yellow-400">Banned ({selectedBannedHeroes.length}/5)</label>
                    <button
                      type="button"
                      onClick={addBannedHero}
                      disabled={selectedBannedHeroes.length >= 5}
                      className="px-3 py-1 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedBannedHeroes.map((heroId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <HeroSelect
                          heroes={heroes}
                          value={heroId}
                          onChange={(value) => handleBannedHeroChange(index, value)}
                          placeholder={`Banned Hero ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeBannedHero(index)}
                          className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedBannedHeroes.length === 0 && (
                    <p className="text-gray-400 text-sm mt-2">Click "Add" to record your team's banned heroes.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ENEMY SECTION */}
            <div>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold text-red-400 mb-4">Enemy Team</h3>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-semibold text-red-400">Heroes ({selectedEnemyHeroes.length}/5)</label>
                    <button
                      type="button"
                      onClick={addEnemyHero}
                      disabled={selectedEnemyHeroes.length >= 5}
                      className="px-3 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedEnemyHeroes.map((heroId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <HeroSelect
                          heroes={heroes}
                          value={heroId}
                          onChange={(value) => handleEnemyHeroChange(index, value)}
                          placeholder={`Enemy Hero ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeEnemyHero(index)}
                          className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedEnemyHeroes.length === 0 && (
                    <p className="text-gray-400 text-sm mt-2">Click "Add" to select the enemy team's heroes.</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-semibold text-red-400">Banned ({selectedEnemyBannedHeroes.length}/5)</label>
                    <button
                      type="button"
                      onClick={addEnemyBannedHero}
                      disabled={selectedEnemyBannedHeroes.length >= 5}
                      className="px-3 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedEnemyBannedHeroes.map((heroId, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <HeroSelect
                          heroes={heroes}
                          value={heroId}
                          onChange={(value) => handleEnemyBannedHeroChange(index, value)}
                          placeholder={`Enemy Banned Hero ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeEnemyBannedHero(index)}
                          className="px-2 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {selectedEnemyBannedHeroes.length === 0 && (
                    <p className="text-gray-400 text-sm mt-2">Click "Add" to record the enemy team's banned heroes.</p>
                  )}
                </div>
              </div>
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
