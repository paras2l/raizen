export class FileAccessInterceptor {
  intercept(path: string, processId: string): boolean {
    console.log(`[PRISM-ACCESS] Validating access to ${path} by process ${processId}`);
    return true; // Simple allow for now
  }
}
