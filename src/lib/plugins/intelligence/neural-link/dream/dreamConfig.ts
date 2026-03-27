export const DreamConfig = {
  TIMING: {
    IDLE_TIMEOUT_MS: 600000, // 10 minutes session idle
    NIGHT_CYCLE_START_HOUR: 23,
    NIGHT_CYCLE_END_HOUR: 6
  },
  ANALYSIS: {
    MAX_PROBLEMS_PER_CYCLE: 10,
    SIMULATION_DEPTH: 'ELITE_SWARM', // legion configuration
    SYNTHESIS_VERBOSITY: 'EXECUTIVE_SUMMARY'
  },
  GOVERNANCE: {
    LOG_BRIEFINGS: true,
    ENCRYPT_SUBPROCESS: true
  }
};
