'use client';

import { Challenge } from '@/types/challenge';

interface ChallengeSelectorProps {
  challenges: Challenge[];
  selectedChallenge: Challenge;
  onChallengeSelect: (challenge: Challenge) => void;
}

export default function ChallengeSelector({
  challenges,
  selectedChallenge,
  onChallengeSelect
}: ChallengeSelectorProps) {
  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
      <h2 className="text-white font-semibold mb-3">Select Challenge</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {challenges.map((challenge) => (
          <button
            key={challenge.id}
            onClick={() => onChallengeSelect(challenge)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedChallenge.id === challenge.id
                ? 'border-blue-500 bg-blue-900/20 text-blue-200'
                : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600'
            }`}
          >
            <div className="font-medium mb-1">{challenge.title}</div>
            <div className="text-sm opacity-80 line-clamp-2">
              {challenge.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}