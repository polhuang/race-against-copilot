export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  ghostSolution: string;
}

export interface TestCase {
  input: any[];
  expected: any;
  description: string;
}

export interface TestResult {
  passed: boolean;
  error?: string;
  actualResult?: any;
  expectedResult?: any;
}

export interface ExecutionResult {
  success: boolean;
  results: TestResult[];
  executionTime: number;
  error?: string;
}