'use client';

import { useState, useEffect } from 'react';
import GitHubHeader from '@/components/GitHubHeader';
import CodeEditor from '@/components/CodeEditor';
import TestResults from '@/components/TestResults';
import GhostRace from '@/components/GhostRace';
import ChallengeSelector from '@/components/ChallengeSelector';
import DiffViewer from '@/components/DiffViewer';
import { useTestRunner } from '@/hooks/useTestRunner';
import { challenges } from '@/data/challenges';
import { Challenge } from '@/types/challenge';

export default function PlayPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [userCode, setUserCode] = useState(selectedChallenge.starterCode);
  const [isUserComplete, setIsUserComplete] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const { runTests, isRunning, lastResult, cleanup, initializeSandbox } = useTestRunner();

  useEffect(() => {
    initializeSandbox();
    return cleanup;
  }, [initializeSandbox, cleanup]);

  useEffect(() => {
    setUserCode(selectedChallenge.starterCode);
    setIsUserComplete(false);
    setShowDiff(false);
    setShowSolution(false);
  }, [selectedChallenge]);

  const handleRunTests = async () => {
    const functionName = getFunctionName(selectedChallenge.id);
    const result = await runTests(userCode, selectedChallenge.testCases, functionName);
    
    if (result.success) {
      const allPassed = result.results.every(r => r.passed);
      setIsUserComplete(allPassed);
    }
  };

  const getFunctionName = (challengeId: string) => {
    switch (challengeId) {
      case 'fizzbuzz': return 'fizzbuzz';
      case 'prime-check': return 'isPrime';
      case 'palindrome-check': return 'isPalindrome';
      default: return 'solution';
    }
  };

  const handleGhostComplete = () => {
    console.log('Ghost completed!');
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleCompareCodes = () => {
    setShowDiff(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <GitHubHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <span className="text-2xl">🏁</span>
                <span>Code Racing Arena</span>
              </h1>
              <p className="text-gray-400">
                Compete against GitHub Copilot • Solve challenges • Improve your skills
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Selector - Modern GitHub Style */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <h2 className="text-lg font-semibold text-white">Select Challenge</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge) => (
              <button
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className={`group relative p-4 text-left border rounded-lg transition-all duration-200 ${
                  selectedChallenge.id === challenge.id
                    ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>
                  {selectedChallenge.id === challenge.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mt-1"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Code Editor */}
          <div className="xl:col-span-2 space-y-6">
            {/* Challenge Info Card */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                      <span>{selectedChallenge.title}</span>
                      <span className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-medium rounded">
                        Challenge
                      </span>
                    </h3>
                    <p className="text-gray-400 mt-1">{selectedChallenge.description}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={handleRunTests}
                    disabled={isRunning}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:opacity-50 text-white rounded-lg font-medium transition-all transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h1m4 0h1m.172-4.828l-5.656 5.656a4 4 0 010-5.656l5.656-5.656a4 4 0 015.656 0z"/>
                        </svg>
                        <span>Run Tests</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleShowSolution}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 rounded-lg font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <span>Show Solution</span>
                  </button>

                  <button
                    onClick={handleCompareCodes}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 rounded-lg font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
                    </svg>
                    <span>Compare</span>
                  </button>
                </div>

                {/* Code Editor Container */}
                <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-400 ml-3">solution.js</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">JavaScript</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <CodeEditor
                    value={userCode}
                    onChange={setUserCode}
                    height="400px"
                    theme="vs-dark"
                  />
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur">
              <div className="p-1">
                <TestResults
                  result={lastResult}
                  testCases={selectedChallenge.testCases}
                  isRunning={isRunning}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Ghost Race & Solution */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur">
              <GhostRace
                ghostCode={selectedChallenge.ghostSolution}
                userCode={userCode}
                isUserComplete={isUserComplete}
                onGhostComplete={handleGhostComplete}
              />
            </div>

            {showSolution && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <span>🤖</span>
                    <span>GitHub Copilot Solution</span>
                    <span className="px-2 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-medium rounded">
                      AI Generated
                    </span>
                  </h3>
                </div>
                <div className="bg-gray-900">
                  <CodeEditor
                    value={selectedChallenge.ghostSolution}
                    onChange={() => {}}
                    height="300px"
                    readOnly={true}
                    theme="vs-dark"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DiffViewer
        userCode={userCode}
        ghostCode={selectedChallenge.ghostSolution}
        isVisible={showDiff}
        onClose={() => setShowDiff(false)}
      />
    </div>
  );
}