import { useState, useCallback, useRef } from 'react';
import { SimpleSandbox } from '@/lib/simpleSandbox';
import { ExecutionResult, TestCase } from '@/types/challenge';

export const useTestRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<ExecutionResult | null>(null);
  const sandboxRef = useRef<SimpleSandbox | null>(null);

  const initializeSandbox = useCallback(() => {
    if (!sandboxRef.current) {
      sandboxRef.current = new SimpleSandbox();
    }
  }, []);

  const runTests = useCallback(async (
    code: string, 
    testCases: TestCase[], 
    functionName: string
  ): Promise<ExecutionResult> => {
    setIsRunning(true);
    
    try {
      if (!sandboxRef.current) {
        initializeSandbox();
      }
      
      const result = await sandboxRef.current!.executeCode(code, testCases, functionName);
      setLastResult(result);
      return result;
    } catch (error) {
      const errorResult: ExecutionResult = {
        success: false,
        results: [],
        executionTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      setLastResult(errorResult);
      return errorResult;
    } finally {
      setIsRunning(false);
    }
  }, [initializeSandbox]);

  const cleanup = useCallback(() => {
    sandboxRef.current = null;
  }, []);

  return {
    runTests,
    isRunning,
    lastResult,
    cleanup,
    initializeSandbox
  };
};