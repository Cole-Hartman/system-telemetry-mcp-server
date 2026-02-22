/**
 * Anomaly detection rules and thresholds
 */

export interface AnomalyRule {
  type: string;
  name: string;
  warningThreshold: number;
  criticalThreshold: number;
  comparison: 'greater' | 'less';
  unit: string;
}

export const defaultRules: AnomalyRule[] = [
  {
    type: 'cpu_usage',
    name: 'CPU Usage',
    warningThreshold: 80,
    criticalThreshold: 95,
    comparison: 'greater',
    unit: '%',
  },
  {
    type: 'memory_usage',
    name: 'Memory Usage',
    warningThreshold: 85,
    criticalThreshold: 95,
    comparison: 'greater',
    unit: '%',
  },
  {
    type: 'disk_usage',
    name: 'Disk Usage',
    warningThreshold: 85,
    criticalThreshold: 95,
    comparison: 'greater',
    unit: '%',
  },
  {
    type: 'swap_usage',
    name: 'Swap Usage',
    warningThreshold: 50,
    criticalThreshold: 80,
    comparison: 'greater',
    unit: '%',
  },
  {
    type: 'battery_health',
    name: 'Battery Health',
    warningThreshold: 80,
    criticalThreshold: 50,
    comparison: 'less',
    unit: '%',
  },
  {
    type: 'battery_level',
    name: 'Battery Level',
    warningThreshold: 20,
    criticalThreshold: 10,
    comparison: 'less',
    unit: '%',
  },
];

export function getRule(type: string): AnomalyRule | undefined {
  return defaultRules.find((rule) => rule.type === type);
}
