import { irisLogger } from './irisLogger';
import { TriageReport, VitalsData, HealthAnomaly } from './irisTypes';

export class ReportGenerator {
  generateReport(vitals: VitalsData, anomalies: HealthAnomaly[]): TriageReport {
    irisLogger.log('Compiling medical vitals and anomaly data into triage report...');

    const report: TriageReport = {
      id: `triage-${Date.now()}`,
      vitals,
      anomalies,
      status: 'archived'
    };

    irisLogger.success(`Triage report ${report.id} generated [${anomalies.length} anomalies recorded].`);
    return report;
  }
}

export const reportGenerator = new ReportGenerator();
