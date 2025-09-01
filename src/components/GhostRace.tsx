'use client';

import { useState, useEffect } from 'react';

interface GhostRaceProps {
  ghostCode: string;
  userCode: string;
  isUserComplete: boolean;
  onGhostComplete: () => void;
}

export default function GhostRace({ 
  ghostCode, 
  userCode, 
  isUserComplete, 
  onGhostComplete 
}: GhostRaceProps) {
  const [ghostProgress, setGhostProgress] = useState(0);
  const [isGhostComplete, setIsGhostComplete] = useState(false);
  const [startTime] = useState(Date.now());
  
  // Ghost typing speed: roughly 100 characters per minute
  const GHOST_SPEED = 100; // characters per minute
  const GHOST_DELAY = (60 * 1000) / GHOST_SPEED; // ms per character

  useEffect(() => {
    if (isUserComplete || isGhostComplete) return;

    const interval = setInterval(() => {
      setGhostProgress(prev => {
        const next = Math.min(prev + 1, ghostCode.length);
        
        if (next === ghostCode.length && !isGhostComplete) {
          setIsGhostComplete(true);
          onGhostComplete();
        }
        
        return next;
      });
    }, GHOST_DELAY);

    return () => clearInterval(interval);
  }, [ghostCode.length, isUserComplete, isGhostComplete, onGhostComplete]);

  const userProgress = Math.min(userCode.length, ghostCode.length);
  const userPercentage = (userProgress / ghostCode.length) * 100;
  const ghostPercentage = (ghostProgress / ghostCode.length) * 100;

  const getStatusMessage = () => {
    if (isUserComplete && !isGhostComplete) {
      return { text: "You won! 🏆", color: "text-green-400", bg: "bg-green-900/20", border: "border-green-500/30" };
    } else if (isGhostComplete && !isUserComplete) {
      return { text: "GitHub Copilot wins! 🤖", color: "text-red-400", bg: "bg-red-900/20", border: "border-red-500/30" };
    } else if (isUserComplete && isGhostComplete) {
      return { text: "It's a tie! 🤝", color: "text-yellow-400", bg: "bg-yellow-900/20", border: "border-yellow-500/30" };
    } else if (userProgress > ghostProgress) {
      return { text: "You're ahead! 🚀", color: "text-green-300", bg: "bg-green-900/10", border: "border-green-500/20" };
    } else if (ghostProgress > userProgress) {
      return { text: "GitHub Copilot leading! 🤖", color: "text-purple-300", bg: "bg-purple-900/10", border: "border-purple-500/20" };
    } else {
      return { text: "Start coding to race! 📝", color: "text-gray-400", bg: "bg-gray-800/30", border: "border-gray-700" };
    }
  };

  const status = getStatusMessage();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">GitHub Copilot Race</h3>
          <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs font-medium rounded border border-purple-500/30">
            Live
          </span>
        </div>
      </div>

      {/* Status Message */}
      <div className={`p-4 rounded-lg border mb-6 ${status.bg} ${status.border}`}>
        <div className="flex items-center justify-center">
          <span className={`font-semibold ${status.color}`}>
            {status.text}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* User Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">You</p>
                <p className="text-xs text-gray-400">{userProgress} characters</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-400 font-bold text-lg">{Math.round(userPercentage)}%</p>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 flex items-center justify-end pr-1"
              style={{ width: `${userPercentage}%` }}
            >
              {userPercentage > 10 && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>

        {/* Ghost Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-sm">👻</span>
              </div>
              <div>
                <p className="text-white font-medium">GitHub Copilot</p>
                <p className="text-xs text-gray-400">{ghostProgress} characters</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-400 font-bold text-lg">{Math.round(ghostPercentage)}%</p>
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-100 flex items-center justify-end pr-1"
              style={{ width: `${ghostPercentage}%` }}
            >
              {ghostPercentage > 10 && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ghost Code Preview */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-3">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          <span className="text-sm font-medium text-gray-300">GitHub Copilot's Live Coding</span>
        </div>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">copilot-solution.js</span>
            </div>
          </div>
          
          <div className="p-4 font-mono text-sm max-h-32 overflow-hidden">
            <span className="text-purple-300">
              {ghostCode.substring(0, ghostProgress)}
            </span>
            <span className="opacity-20 text-gray-500">
              {ghostCode.substring(ghostProgress)}
            </span>
            {ghostProgress < ghostCode.length && (
              <span className="animate-pulse text-purple-400 font-bold">|</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}