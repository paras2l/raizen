export class FilesystemScanner {
  async scanSensitivePaths(): Promise<string[]> {
    console.log('[PRISM-SCAN] Indexing sensitive user data locations...');
    return [
      '/Users/User/Documents',
      '/Users/User/Photos',
      '/Users/User/Downloads',
      '/AppData/Paxion/Memory'
    ];
  }
}
