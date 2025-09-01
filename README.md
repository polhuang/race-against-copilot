# 🏁 Race against GitHub Copilot

A competitive coding challenge app where users race against GitHub Copilot to solve simple coding problems as quickly as possible.

## Features

- **3 Built-in Challenges**:
  - **FizzBuzz**: Classic FizzBuzz implementation returning an array (Easy)
  - **Prime Check**: Determine if a number is prime (Medium)
  - **Palindrome Check**: Check if a string is a palindrome (Hard)

- **Real-time Racing**: Watch GitHub Copilot type out the solution while you code
- **Sandboxed Execution**: Safe code execution using iframe sandboxing
- **Live Testing**: Immediate feedback with comprehensive test results
- **Code Comparison**: Side-by-side diff viewer to compare your solution with GitHub Copilot's
- **Monaco Editor**: Full-featured code editor with JavaScript syntax highlighting

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **react-diff-viewer-continued** for code comparison

## Security

- Code execution happens in a sandboxed iframe with `allow-scripts` only
- No access to Node.js APIs or browser APIs
- Timeout protection against infinite loops
- All user code runs in an isolated environment

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to start racing!

## How to Play

1. **Select a Challenge**: Choose from FizzBuzz, Prime Check, or Palindrome Check
2. **Start Coding**: Begin typing your solution in JavaScript
3. **Race GitHub Copilot**: Watch GitHub Copilot's progress bar as it "types" the solution
4. **Run Tests**: Click "Run Tests" to check your solution against test cases
5. **Compare Solutions**: Use "Compare Code" to see how your approach differs from GitHub Copilot's
6. **Win the Race**: Complete all tests before GitHub Copilot finishes typing!

## Challenge Details

### FizzBuzz
- Return an array of 100 entries
- Index 0 should be "1", index 1 should be "2", etc.
- Replace multiples of 3 with "Fizz"
- Replace multiples of 5 with "Buzz"  
- Replace multiples of both with "FizzBuzz"

### Prime Check
- Return true if the number is prime (only divisible by 1 and itself)
- Example: isPrime(17) → true, isPrime(4) → false
- Handle edge cases like 1 (not prime) and 2 (smallest prime)

### Palindrome Check
- Return `true` if the string reads the same forwards and backwards
- Ignore case and non-alphanumeric characters
- Example: "A man a plan a canal Panama" → `true`
