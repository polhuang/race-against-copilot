export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  ghostSolution: string;
}

export interface TestCase {
  input: unknown[];
  expected: unknown;
  description: string;
}

export interface TestResult {
  passed: boolean;
  error?: string;
  actualResult?: unknown;
  expectedResult?: unknown;
}

export interface ExecutionResult {
  success: boolean;
  results: TestResult[];
  executionTime: number;
  error?: string;
}