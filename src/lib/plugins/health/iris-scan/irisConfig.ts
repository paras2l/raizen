export const irisConfig = {
  vitalsThresholds: {
    heartRate: { min: 45, max: 120 },
    respiratoryRate: { min: 8, max: 25 },
    oxygenSat: { min: 92 },
    skinPallorMax: 0.7
  },

  scanIntervalMs: 5000,
  thermalVisionEnabled: true,
  
  emergencyProtocol: {
    directAlertEnabled: true,
    firstResponderRadiusKm: 5.0,
    reportAutoTransmit: true
  },

  jurisdictionMedicalStandards: ['HIPAA-Compliant', 'GDPR-Health', 'Iso-13485-Sovereign']
};
