export const avatarLogger = {
  log: (msg: string) => console.log(`[AVATAR] ${msg}`),
  warn: (msg: string) => console.warn(`[AVATAR-WARN] ${msg}`),
  error: (msg: string) => console.error(`[AVATAR-ERROR] ${msg}`)
};
