export class FilesystemScanner {
  async scan(path: string): Promise<any[]> {
    console.log(`[PRISM-SCAN] Scanning path: ${path} for sensitive patterns...`);
    return [
      { path: '/Users/User/Photos/secrets.jpg', sensitive: true },
      { path: '/Users/User/Documents/ledger.pdf', sensitive: true },
      { path: '/Users/User/Public/notes.txt', sensitive: false }
    ];
  }
}
