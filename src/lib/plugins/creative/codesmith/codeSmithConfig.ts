export const codeSmithConfig = {
  defaultStack: 'Vite-React-Tailwind',
  deploymentTargets: ['Web', 'iOS', 'Android'],
  testThreshold: 100, // 100% coverage requirement
  storeCredentialsMapping: {
    'apple': 'SOC-VAULT-APPLE-01',
    'google': 'SOC-VAULT-GOOGLE-01',
  },
};
