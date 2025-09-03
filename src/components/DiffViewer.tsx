'use client';

import { useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued-react19';

interface DiffViewerProps {
  userCode: string;
  ghostCode: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function DiffViewer({
  userCode,
  ghostCode,
  isVisible,
  onClose
}: DiffViewerProps) {
  const [splitView, setSplitView] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-600 w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-white font-semibold text-lg">Code Comparison</h3>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={splitView}
                onChange={(e) => setSplitView(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Split View</span>
            </label>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ReactDiffViewer
            oldValue={userCode}
            newValue={ghostCode}
            splitView={splitView}
            leftTitle="Your Solution"
            rightTitle="GitHub Copilot Solution"
            styles={{
              variables: {
                dark: {
                  diffViewerBackground: '#1f2937',
                  diffViewerColor: '#f3f4f6',
                  addedBackground: '#065f46',
                  addedColor: '#ecfdf5',
                  removedBackground: '#991b1b',
                  removedColor: '#fef2f2',
                  wordAddedBackground: '#047857',
                  wordRemovedBackground: '#dc2626',
                  addedGutterBackground: '#064e3b',
                  removedGutterBackground: '#7f1d1d',
                  gutterBackground: '#374151',
                  gutterBackgroundDark: '#111827',
                  highlightBackground: '#374151',
                  highlightGutterBackground: '#4b5563',
                  codeFoldGutterBackground: '#374151',
                  codeFoldBackground: '#1f2937',
                  emptyLineBackground: '#1f2937',
                  gutterColor: '#9ca3af',
                  addedGutterColor: '#d1fae5',
                  removedGutterColor: '#fecaca',
                  codeFoldContentColor: '#9ca3af',
                  diffViewerTitleBackground: '#111827',
                  diffViewerTitleColor: '#f3f4f6',
                  diffViewerTitleBorderColor: '#4b5563'
                }
              },
              diffContainer: {
                fontSize: '14px',
                fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
              }
            }}
            useDarkTheme={true}
            showDiffOnly={false}
            hideLineNumbers={false}
          />
        </div>
      </div>
    </div>
  );
}