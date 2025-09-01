import GitHubHeader from '@/components/GitHubHeader';
import GitHubFooter from '@/components/GitHubFooter';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <GitHubHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-900">
        {/* Additional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-600/60 via-cyan-500/40 to-emerald-600/50"></div>
        <div className="absolute inset-0 bg-gray-900/40"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Race against</span>
              <br />
              <span className="text-cyan-400 font-extrabold">
                GitHub Copilot
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Race against Copilot is an interactive coding challenge platform where developers compete against GitHub's AI assistant to solve programming problems as quickly as possible. Sharpen your skills, learn new algorithms, and have fun coding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/play"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Racing →
              </Link>
              
              <button className="flex items-center space-x-2 bg-red-500/10 border-2 border-red-500/70 text-red-400 hover:bg-red-500/20 hover:border-red-400 rounded-lg px-8 py-3 font-medium transition-colors text-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch Demo</span>
              </button>
              
              <a href="https://www.github.com/polhuang/race-against-copilot" className="flex items-center space-x-2 bg-gray-500/10 border-2 border-gray-500/70 text-gray-400 hover:bg-gray-500/20 hover:border-gray-400 rounded-lg px-8 py-3 font-medium transition-colors text-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          </div>
          
          <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-xl border border-slate-600/50 p-1 shadow-2xl max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-slate-700 to-gray-700">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm ml-4">Race against Copilot</div>
              </div>
              
              <div className="p-6 min-h-96 bg-gradient-to-br from-slate-900 to-indigo-900/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <Link 
                    href="/play"
                    className="inline-block mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Try it now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built by GitHub Copilot
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Challenge yourself against the world's most advanced AI coding assistant. Test your skills, learn new patterns, and discover how you measure up against GitHub Copilot's solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-lg p-6 border border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Racing</h3>
              <p className="text-gray-400">
                Watch GitHub Copilot type out the solution in real-time while you code. Feel the pressure and excitement of a live coding competition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-lg p-6 border border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Execution</h3>
              <p className="text-gray-400">
                Code runs in a sandboxed iframe environment with no access to your system. Safe, secure, and reliable testing for all your solutions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-lg p-6 border border-slate-600/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Monaco Editor</h3>
              <p className="text-gray-400">
                Full-featured code editor with syntax highlighting, autocomplete, and all the features you expect from a modern development environment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="docs" className="py-20 bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Build and run locally
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Get the source code and run your own instance of the app.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold">Clone the repository</h3>
                    <p className="text-gray-400">Download the source code from GitHub</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold">Install dependencies</h3>
                    <p className="text-gray-400">Run npm install to set up the project</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold">Start development server</h3>
                    <p className="text-gray-400">Run npm run dev and open localhost:3000</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-lg p-6 border border-slate-600/50 shadow-lg">
              <div className="bg-gray-800 rounded p-4 font-mono text-sm">
                <div className="text-green-400">$ git clone https://github.com/polhuang/race-against-copilot.git</div>
                <div className="text-green-400 mt-2">$ cd race-against-copilot</div>
                <div className="text-green-400 mt-2">$ npm install</div>
                <div className="text-green-400 mt-2">$ npm run dev</div>
                <div className="text-gray-400 mt-3"># Open http://localhost:3000</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <GitHubFooter />
    </div>
  );
}
