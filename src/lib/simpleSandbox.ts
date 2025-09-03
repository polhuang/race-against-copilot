import { ExecutionResult, TestCase } from '@/types/challenge';

export class SimpleSandbox {
  async executeCode(code: string, testCases: TestCase[], functionName: string, timeout = 5000): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.sandbox.add('allow-scripts');
      
      // eslint-disable-next-line prefer-const
      let timeoutId: NodeJS.Timeout;
      let resolved = false;
      
      const cleanup = () => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutId);
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        window.removeEventListener('message', messageHandler);
      };
      
      const messageHandler = (event: MessageEvent) => {
        if (event.source !== iframe.contentWindow) return;
        
        cleanup();
        const { success, results, executionTime, error } = event.data;
        
        if (success) {
          resolve({
            success: true,
            results,
            executionTime
          });
        } else {
          resolve({
            success: false,
            results: [],
            executionTime: 0,
            error
          });
        }
      };
      
      timeoutId = setTimeout(() => {
        cleanup();
        resolve({
          success: false,
          results: [],
          executionTime: timeout,
          error: 'Execution timeout'
        });
      }, timeout);
      
      window.addEventListener('message', messageHandler);
      
      const sandboxHTML = this.createSandboxHTML(code, testCases, functionName);
      iframe.src = 'data:text/html,' + encodeURIComponent(sandboxHTML);
      document.body.appendChild(iframe);
    });
  }
  
  private createSandboxHTML(code: string, testCases: TestCase[], functionName: string): string {
    return `
<!DOCTYPE html>
<html>
<head></head>
<body>
<script>
(function() {
  try {
    const startTime = performance.now();
    
    // Execute the user code
    ${code}
    
    // Check if function exists
    if (typeof ${functionName} !== 'function') {
      throw new Error('Function ${functionName} not found');
    }
    
    const testCases = ${JSON.stringify(testCases)};
    const results = [];
    
    // Run test cases
    testCases.forEach((testCase, index) => {
      try {
        const result = ${functionName}.apply(null, testCase.input);
        let passed = false;
        
        // Special handling for different test types
        if ('${functionName}' === 'fizzbuzz') {
          if (index === 0) {
            passed = Array.isArray(result) && result.length === testCase.expected;
          } else if (index === 1) {
            passed = Array.isArray(result) && result[0] === testCase.expected;
          } else if (index === 2) {
            passed = Array.isArray(result) && result[2] === testCase.expected;
          } else if (index === 3) {
            passed = Array.isArray(result) && result[4] === testCase.expected;
          } else if (index === 4) {
            passed = Array.isArray(result) && result[14] === testCase.expected;
          }
        } else {
          passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        }
        
        results.push({
          passed,
          actualResult: result,
          expectedResult: testCase.expected
        });
      } catch (error) {
        results.push({
          passed: false,
          error: error.message,
          expectedResult: testCase.expected
        });
      }
    });
    
    const executionTime = performance.now() - startTime;
    
    parent.postMessage({
      success: true,
      results,
      executionTime
    }, '*');
    
  } catch (error) {
    parent.postMessage({
      success: false,
      error: error.message
    }, '*');
  }
})();
</script>
</body>
</html>`;
  }
}