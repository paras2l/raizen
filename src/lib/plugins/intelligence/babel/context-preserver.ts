export class ContextPreserver {
  private protectedTerms = ['git', 'npm', 'pnpm', 'electron', 'raizen', 'paxion', 'quantum', 'constellation'];

  protect(text: string): string {
    let output = text;
    this.protectedTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      output = output.replace(regex, `__PROTECT_${term}__`);
    });
    return output;
  }

  restore(text: string): string {
    return text.replace(/__PROTECT_(.*?)__/g, '$1');
  }
}
