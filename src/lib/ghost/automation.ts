/**
 * Ghost Automation Scripts
 * Zero Fallback (Ghost Power) DOM Interactors
 */

export const GHOST_SCRIPTS = {
  whatsapp: {
    send: (to: string, text: string) => `
      (async () => {
        const sendMessage = async () => {
          // 1. Search for contact
          const searchBox = document.querySelector('div[contenteditable="true"][data-tab="3"]');
          if (searchBox) {
            searchBox.innerHTML = "${to}";
            searchBox.dispatchEvent(new Event('input', { bubbles: true }));
          }
          
          await new Promise(r => setTimeout(r, 2000));
          
          // 2. Click the contact
          const contact = document.querySelector('span[title="${to}"]');
          if (contact) {
            contact.click();
          }
          
          await new Promise(r => setTimeout(r, 1000));
          
          // 3. Type and send
          const input = document.querySelectorAll('div[contenteditable="true"]')[1];
          if (input) {
            input.innerHTML = "${text}";
            input.dispatchEvent(new Event('input', { bubbles: true }));
            
            await new Promise(r => setTimeout(r, 500));
            const sendBtn = document.querySelector('span[data-icon="send"]');
            if (sendBtn) sendBtn.click();
            return { success: true };
          }
          return { success: false, error: 'Input box not found' };
        };
        return await sendMessage();
      })()
    `,
    getStatus: () => `
      (() => {
        const qrCode = document.querySelector('canvas[aria-label="Scan me!"]');
        if (qrCode) return 'needs_auth';
        const main = document.querySelector('#pane-side');
        if (main) return 'ready';
        return 'loading';
      })()
    `
  },
  
  discord: {
    send: (channel: string, text: string) => `
      (async () => {
        const input = document.querySelector('div[role="textbox"]');
        if (input) {
          input.innerHTML = "${text}";
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
          return { success: true };
        }
        return { success: false, error: 'Discord textbox not found' };
      })()
    `
  }
};
