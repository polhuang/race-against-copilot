# Race Against GitHub Copilot - Development Instructions

**ALWAYS follow these instructions first** and only use additional search or bash commands when the information here is incomplete or found to be in error.

This is a Next.js 15.5.2 TypeScript application that provides an interactive coding challenge platform where developers compete against GitHub Copilot to solve programming problems.

## Working Effectively

### Bootstrap and Setup
**CRITICAL**: Use exact commands below with specified timeouts:

1. **Install dependencies** (takes ~8 seconds):
   ```bash
   npm install --legacy-peer-deps
   ```
   **NEVER use `npm install` without `--legacy-peer-deps`** - it fails due to React version conflicts with react-diff-viewer-continued.

2. **Start development server** (takes ~1.2 seconds):
   ```bash
   npm run dev
   ```
   Access at: http://localhost:3000

### Build Commands
**WARNING: Production build currently FAILS** due to Google Fonts being blocked:
```bash
npm run build
# FAILS: Cannot fetch Geist fonts from fonts.googleapis.com
```
**DO NOT attempt production builds** until Google Fonts access is resolved or fonts are replaced with local alternatives.

### Linting
**Always run before committing** (takes ~2 seconds):
```bash
npm run lint
```
**Note**: Currently shows 14 errors and 5 warnings that need fixing.

## Validation Requirements

### Manual Testing Scenarios
**ALWAYS test these complete user workflows after making changes:**

1. **Homepage Navigation**:
   - Visit http://localhost:3000
   - Verify header navigation works (Play, Features, GitHub links)
   - Test "Start Racing →" and "Try it now" buttons

2. **Challenge Selection**:
   - Navigate to http://localhost:3000/play
   - Select each challenge: FizzBuzz, Prime Check, Palindrome Check
   - Verify challenge descriptions load correctly

3. **Coding Interface**:
   - Write sample code in Monaco editor
   - Click "Run Tests" and verify test results display
   - Check that GitHub Copilot simulation animates correctly
   - Test "Show Solution" and "Compare" buttons

4. **Code Execution**:
   - Implement a simple FizzBuzz solution:
     ```javascript
     function fizzbuzz() {
       const result = [];
       for (let i = 1; i <= 100; i++) {
         if (i % 15 === 0) result.push("FizzBuzz");
         else if (i % 3 === 0) result.push("Fizz");
         else if (i % 5 === 0) result.push("Buzz");
         else result.push(String(i));
       }
       return result;
     }
     ```
   - Run tests and verify all 5 test cases pass

### Expected Development Environment
- **Node.js**: v20.19.4 (confirmed working)
- **npm**: 10.8.2 (confirmed working)
- **Next.js**: 15.5.2 with Turbopack
- **TypeScript**: v5.x
- **React**: v19.1.0

## Key Projects and Structure

### Source Code Organization
```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx        # Homepage
│   ├── play/           # Main coding interface
│   └── layout.tsx      # Root layout (contains blocked Google Fonts)
├── components/         # React components
│   ├── CodeEditor.tsx  # Monaco editor wrapper
│   ├── GhostRace.tsx   # Copilot simulation
│   └── TestResults.tsx # Test execution display
├── lib/                # Core utilities
│   ├── sandbox.ts      # Code execution in iframe
│   └── simpleSandbox.ts # Alternative sandbox implementation
├── data/
│   └── challenges.ts   # Challenge definitions and test cases
├── types/
│   └── challenge.ts    # TypeScript interfaces
└── hooks/
    └── useTestRunner.ts # Test execution logic
```

### Critical Files for Development
- **Challenge definitions**: `src/data/challenges.ts`
- **Code execution**: `src/lib/sandbox.ts` and `src/lib/simpleSandbox.ts`
- **Main interface**: `src/app/play/page.tsx`
- **Test framework**: `src/hooks/useTestRunner.ts`

## Common Development Tasks

### Adding New Challenges
1. Edit `src/data/challenges.ts`
2. Add new challenge object with test cases
3. Update `src/types/challenge.ts` if new interfaces needed
4. Test manually by selecting the new challenge in the UI

### Modifying Code Execution
1. **Primary sandbox**: Edit `src/lib/sandbox.ts`
2. **Alternative implementation**: Edit `src/lib/simpleSandbox.ts`
3. **ALWAYS test with actual code execution** after changes
4. Verify timeout handling works (default 5 seconds)

### Fixing Linting Issues
Current ESLint errors to address:
- React unescaped entities (use `&apos;` for apostrophes)
- Unused variables (@typescript-eslint/no-unused-vars)
- Explicit `any` types (@typescript-eslint/no-explicit-any)
- Missing React dependencies (react-hooks/exhaustive-deps)

### Styling Changes
- Uses **Tailwind CSS 4.x**
- Main styles in `src/app/globals.css`
- Component-level styles use Tailwind classes

## Known Issues and Workarounds

### 1. Build Failure (Google Fonts)
**Issue**: `npm run build` fails with "Failed to fetch Geist from Google Fonts"
**Workaround**: Development mode works fine. For production, consider:
- Replace Google Fonts with local fonts
- Use different font providers
- Remove font imports temporarily

### 2. Dependency Conflicts
**Issue**: `npm install` fails with React peer dependency conflicts
**Solution**: **ALWAYS use `--legacy-peer-deps` flag**

### 3. Monaco Editor CDN Issues
**Issue**: Some CDN resources blocked (cdn.jsdelivr.net)
**Impact**: Editor still works but may show console errors
**Workaround**: Development functionality unaffected

### 4. Development Server Performance
**Timing**: 
- Cold start: ~1 second
- Hot reload: ~100-600ms
- **NEVER CANCEL** - always wait for "Ready" message

## Repository Information

### Key Commands Reference
```bash
# Setup (8 seconds)
npm install --legacy-peer-deps

# Development (1.2 seconds startup)
npm run dev

# Linting (2 seconds)
npm run lint

# Build (CURRENTLY FAILS)
npm run build  # Do not use until Google Fonts issue resolved
```

### File System Locations
- **Config files**: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`
- **Styles**: `postcss.config.mjs`, `src/app/globals.css`
- **Public assets**: `public/` (SVG icons)

### No Testing Framework
**Important**: This repository has no automated test framework (Jest, Vitest, etc.). All testing must be done manually through the web interface.

## Development Workflow

1. **Always start with**:
   ```bash
   npm install --legacy-peer-deps
   npm run dev
   ```

2. **Before making changes**:
   - Test current functionality using validation scenarios above
   - Note any existing issues

3. **After making changes**:
   - Run `npm run lint` and fix new errors
   - Test all validation scenarios manually
   - Verify Monaco editor and code execution still work
   - Check GitHub Copilot simulation animations

4. **Before committing**:
   - Ensure linting passes or document why errors remain
   - Confirm application still runs on `npm run dev`
   - Test at least one complete coding scenario

Remember: **This application is fully functional in development mode** despite build issues. Focus on development server testing and manual validation of all user workflows.