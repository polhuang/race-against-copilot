'use client';

import Link from 'next/link';

export default function GitHubHeader() {
  return (
    <header className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-700/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">🏁</span>
              </div>
              <span className="text-white font-semibold text-xl">Race against Copilot</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/play" className="text-gray-300 hover:text-white transition-colors">
                Play
              </Link>
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <a href="https://www.github.com/polhuang/race-against-copilot" className="text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/play"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
            >
              Try it now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
