import { ledgerLogger } from './ledgerLogger';
import { ComplianceReport } from './ledgerTypes';

export class ComplianceReporter {
  private reports: ComplianceReport[] = [];

  generateReport(type: ComplianceReport['type']): ComplianceReport {
    ledgerLogger.log(`Generating automated ${type} for legal/auditing purposes...`);

    const report: ComplianceReport = {
      id: `report-${Date.now()}`,
      type,
      status: 'ready',
      timestamp: Date.now()
    };

    this.reports.push(report);
    ledgerLogger.compliance('REPORT_GENERATED');
    return report;
  }

  getArchive(): ComplianceReport[] {
    return this.reports;
  }
}

export const complianceReporter = new ComplianceReporter();
