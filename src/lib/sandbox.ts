import { ExecutionResult, TestCase } from '@/types/challenge';

export class CodeSandbox {
  private iframe: HTMLIFrameElement | null = null;
  private messageId = 0;
  private pendingPromises = new Map<number, { resolve: (value: ExecutionResult) => void; reject: (error: unknown) => void }>();
  private isReady = false;
  private messageHandler: (event: MessageEvent) => void;

  constructor() {
    this.messageHandler = this.handleMessage.bind(this);
    this.setupIframe();
  }

  private setupIframe() {
    return new Promise<void>((resolve) => {
      this.iframe = document.createElement('iframe');
      this.iframe.style.display = 'none';
      this.iframe.sandbox.add('allow-scripts');
      
      this.iframe.onload = () => {
        this.isReady = true;
        resolve();
      };
      
      const sandboxHTML = `<!DOCTYPE html>
<html>
<head></head>
<body>
<script>
${this.getSandboxScript()}
</script>
</body>
</html>`;
      
      this.iframe.src = 'data:text/html,' + encodeURIComponent(sandboxHTML);
      document.body.appendChild(this.iframe);
      window.addEventListener('message', this.messageHandler);
    });
  }

  private getSandboxScript() {
    return `
      window.addEventListener('message', function(event) {
        const { id, code, testCases, functionName } = event.data;
        
        try {
          const startTime = performance.now();
          
          // Execute the user code
          eval(code);
          
          // Check if function exists
          if (typeof window[functionName] !== 'function') {
            throw new Error('Function ' + functionName + ' not found');
          }
          
          const func = window[functionName];
          const results = [];
          
          // Run test cases
          testCases.forEach((testCase, index) => {
            try {
              const result = func.apply(null, testCase.input);
              let passed = false;
              
              // Special handling for different test types
              if (functionName === 'fizzbuzz') {
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
            id,
            success: true,
            results,
            executionTime
          }, '*');
          
        } catch (error) {
          parent.postMessage({
            id,
            success: false,
            error: error.message
          }, '*');
        }
      });
    `;
  }

  private handleMessage(event: MessageEvent) {
    if (event.source !== this.iframe?.contentWindow) return;
    
    const { id, success, results, executionTime, error } = event.data;
    const promise = this.pendingPromises.get(id);
    
    if (promise) {
      this.pendingPromises.delete(id);
      
      if (success) {
        promise.resolve({
          success: true,
          results,
          executionTime
        });
      } else {
        promise.resolve({
          success: false,
          results: [],
          executionTime: 0,
          error
        });
      }
    }
  }

  async executeCode(code: string, testCases: TestCase[], functionName: string, timeout = 5000): Promise<ExecutionResult> {
    // Wait for iframe to be ready if not already
    if (!this.isReady) {
      await this.waitForReady();
    }
    
    if (!this.iframe?.contentWindow) {
      throw new Error('Sandbox not initialized');
    }

    const id = ++this.messageId;
    
    return new Promise((resolve, reject) => {
      this.pendingPromises.set(id, { resolve, reject });
      
      // Timeout handling
      const timeoutId = setTimeout(() => {
        this.pendingPromises.delete(id);
        resolve({
          success: false,
          results: [],
          executionTime: timeout,
          error: 'Execution timeout'
        });
      }, timeout);
      
      // Clear timeout when promise resolves
      const originalResolve = this.pendingPromises.get(id)?.resolve;
      if (originalResolve) {
        this.pendingPromises.set(id, {
          resolve: (value) => {
            clearTimeout(timeoutId);
            originalResolve(value);
          },
          reject
        });
      }
      
      this.iframe!.contentWindow!.postMessage({
        id,
        code,
        testCases,
        functionName
      }, '*');
    });
  }

  private waitForReady(): Promise<void> {
    return new Promise((resolve) => {
      const checkReady = () => {
        if (this.isReady) {
          resolve();
        } else {
          setTimeout(checkReady, 10);
        }
      };
      checkReady();
    });
  }

  destroy() {
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }
    window.removeEventListener('message', this.messageHandler);
    this.pendingPromises.clear();
    this.isReady = false;
  }
}