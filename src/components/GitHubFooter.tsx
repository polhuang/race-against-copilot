export default function GitHubFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">🏁</span>
            </div>
            <span className="text-gray-400">&copy; 2025 Paul Huang. All rights reserved.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}