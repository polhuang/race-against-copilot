import { Challenge } from '@/types/challenge';

export const challenges: Challenge[] = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    description: 'Implement fizzbuzz() that returns an array of 100 entries (index 0 → "1", ..., with "Fizz"/"Buzz"/"FizzBuzz" for multiples).',
    starterCode: `function fizzbuzz() {
  // Return an array of 100 entries
  // Numbers divisible by 3: "Fizz"
  // Numbers divisible by 5: "Buzz" 
  // Numbers divisible by both: "FizzBuzz"
  // All other numbers: string representation
  
}`,
    testCases: [
      {
        input: [],
        expected: 100,
        description: 'Should return array of length 100'
      },
      {
        input: [],
        expected: "1",
        description: 'First element should be "1"'
      },
      {
        input: [],
        expected: "Fizz",
        description: 'Element at index 2 should be "Fizz"'
      },
      {
        input: [],
        expected: "Buzz",
        description: 'Element at index 4 should be "Buzz"'
      },
      {
        input: [],
        expected: "FizzBuzz",
        description: 'Element at index 14 should be "FizzBuzz"'
      }
    ],
    ghostSolution: `function fizzbuzz() {
  const result = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(String(i));
    }
  }
  return result;
}`
  },
  {
    id: 'prime-check',
    title: 'Prime Check',
    description: 'Implement isPrime(n) that returns true if the number is prime (only divisible by 1 and itself).',
    starterCode: `function isPrime(n) {
  // Return true if n is a prime number
  // A prime number is only divisible by 1 and itself
  // Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23...
  
}`,
    testCases: [
      {
        input: [2],
        expected: true,
        description: '2 should be prime'
      },
      {
        input: [3],
        expected: true,
        description: '3 should be prime'
      },
      {
        input: [4],
        expected: false,
        description: '4 should not be prime'
      },
      {
        input: [17],
        expected: true,
        description: '17 should be prime'
      },
      {
        input: [1],
        expected: false,
        description: '1 should not be prime'
      }
    ],
    ghostSolution: `function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}`
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Implement isPalindrome(s) that returns true if the string is a palindrome, ignoring case and non-alphanumerics.',
    starterCode: `function isPalindrome(s) {
  // Return true if string is a palindrome
  // Ignore case and non-alphanumeric characters
  
}`,
    testCases: [
      {
        input: ["racecar"],
        expected: true,
        description: 'Simple palindrome should return true'
      },
      {
        input: ["A man a plan a canal Panama"],
        expected: true,
        description: 'Phrase palindrome should return true'
      },
      {
        input: ["race a car"],
        expected: false,
        description: 'Non-palindrome should return false'
      },
      {
        input: [""],
        expected: true,
        description: 'Empty string should return true'
      },
      {
        input: ["Madam"],
        expected: true,
        description: 'Case-insensitive palindrome should return true'
      }
    ],
    ghostSolution: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}`
  }
];