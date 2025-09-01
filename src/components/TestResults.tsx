'use client';

import { ExecutionResult, TestCase } from '@/types/challenge';

interface TestResultsProps {
  result: ExecutionResult | null;
  testCases: TestCase[];
  isRunning: boolean;
}

export default function TestResults({ result, testCases, isRunning }: TestResultsProps) {
  if (isRunning) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Test Results</h3>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          <span className="text-blue-300 font-medium">Running tests...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Test Results</h3>
        </div>
        
        <div className="flex items-center justify-center p-8 border border-gray-700 rounded-lg bg-gray-800/30">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <p className="text-gray-400">Run your code to see test results</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Execution Error</h3>
        </div>
        
        <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <div>
              <p className="text-red-300 font-medium mb-1">Runtime Error</p>
              <p className="text-red-200 text-sm font-mono bg-red-900/30 p-2 rounded border border-red-800/50">
                {result.error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const passedCount = result.results.filter(r => r.passed).length;
  const totalCount = result.results.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          <h3 className="text-lg font-semibold text-white">Test Results</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            allPassed 
              ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
              : 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30'
          }`}>
            {passedCount}/{totalCount} passed
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>{result.executionTime.toFixed(1)}ms</span>
        </div>
      </div>

      <div className="space-y-3">
        {result.results.map((testResult, index) => (
          <div key={index} className={`border rounded-lg overflow-hidden ${
            testResult.passed 
              ? 'border-green-500/30 bg-green-900/10'
              : 'border-red-500/30 bg-red-900/10'
          }`}>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                  testResult.passed 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {testResult.passed ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`font-medium ${testResult.passed ? 'text-green-300' : 'text-red-300'}`}>
                    {testCases[index].description}
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    {testResult.error ? (
                      <div className="bg-red-900/30 border border-red-800/50 rounded p-3">
                        <p className="text-red-200 text-sm font-mono">{testResult.error}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-800/50 border border-gray-700 rounded p-3">
                          <p className="text-xs text-gray-400 mb-1">Expected</p>
                          <p className="text-sm font-mono text-green-300">{JSON.stringify(testResult.expectedResult)}</p>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-700 rounded p-3">
                          <p className="text-xs text-gray-400 mb-1">Your Result</p>
                          <p className={`text-sm font-mono ${testResult.passed ? 'text-green-300' : 'text-red-300'}`}>
                            {JSON.stringify(testResult.actualResult)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div>
              <h4 className="text-green-300 font-semibold">All tests passed!</h4>
              <p className="text-green-200 text-sm">Great job! Your solution is working perfectly.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}