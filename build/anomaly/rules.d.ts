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
export declare const defaultRules: AnomalyRule[];
export declare function getRule(type: string): AnomalyRule | undefined;
//# sourceMappingURL=rules.d.ts.map