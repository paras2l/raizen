import { RaizenPlugin, ActionResult } from './types';

export const searchPlugin: RaizenPlugin = {
  id: 'search',
  name: 'Live Search',
  description: 'Real-time web search and information retrieval via DuckDuckGo.',
  status: 'online',
  actions: [
    {
      id: 'query',
      label: 'Search Web',
      description: 'Perform a live web search for a given query.',
      category: 'intelligence',
      sensitive: false,
      icon: 'Search'
    },
    {
      id: 'browse',
      label: 'Open in Browser',
      description: 'Open a URL in the system default browser.',
      category: 'intelligence',
      sensitive: false,
      icon: 'ExternalLink'
    }
  ],
  initialize: async () => {
    console.log('[PLUGIN] Search Engine initialized.');
  },
  execute: async (actionId, params) => {
    if (actionId === 'query') {
      const query = params.query;
      try {
        // DuckDuckGo HTML Endpoint (No API Key Required)
        const url = `https://html.duckduckgo.com/html?q=${encodeURIComponent(query)}`;
        
        // In a real browser/electron environment, we would use fetch or a bridge.
        // For this implementation, we simulate the extraction logic from OpenClaw.
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
          }
        });

        if (!response.ok) throw new Error('Search failed');

        const html = await response.text();
        
        // Basic Regex Extraction (Ported from OpenClaw's ddg-client.ts)
        const results: any[] = [];
        const resultRegex = /<a\b(?=[^>]*\bclass="[^"]*\bresult__a\b[^"]*")([^>]*)>([\s\S]*?)<\/a>/gi;
        
        let match;
        while ((match = resultRegex.exec(html)) !== null && results.length < 5) {
          const rawTitle = match[2].replace(/<[^>]+>/g, '').trim();
          const hrefMatch = /href="([^"]*)"/.exec(match[1]);
          const rawUrl = hrefMatch ? hrefMatch[1] : '';
          
          if (rawTitle && rawUrl) {
            results.push({
              title: rawTitle,
              url: rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl,
            });
          }
        }

        return {
          success: true,
          data: {
            results,
            summary: `Found ${results.length} relevant sources for "${query}".`
          }
        };
      } catch (error: any) {
        return { success: false, error: `Search Error: ${error.message}` };
      }
    }
    if (actionId === 'browse') {
      const url = params.url || `https://www.google.com/search?q=${encodeURIComponent(params.query || '')}`;
      if ((window as any).ipcRenderer) {
        await (window as any).ipcRenderer.invoke('system:open-url', url);
        return { success: true, data: { status: 'opened', url } };
      }
      return { success: false, error: 'System bridge unavailable.' };
    }
    return { success: false, error: 'Unknown action' };
  }
};
