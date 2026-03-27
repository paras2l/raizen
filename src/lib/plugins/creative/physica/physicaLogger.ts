export const physicaLogger = {
  log: (message: string, ...args: any[]) => {
    console.log(`[PHYSICA] ${message}`, ...args);
  },
  success: (message: string, ...args: any[]) => {
    console.log(`[PHYSICA] 🏗️🧪 ${message}`, ...args);
  },
  simulation: (message: string, ...args: any[]) => {
    console.log(`[PHYSICA] ⚛️ PHYSICS SIMULATION: ${message}`, ...args);
  },
  cad: (message: string, ...args: any[]) => {
    console.log(`[PHYSICA] 📐 CAD GENERATION: ${message}`, ...args);
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[PHYSICA] ❌ ENGINEERING ERROR: ${message}`, ...args);
  },
};
