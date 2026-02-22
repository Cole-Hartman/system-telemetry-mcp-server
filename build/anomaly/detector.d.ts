/**
 * Anomaly detection engine
 */
import { AnomalyAlert } from '../types/system.types.js';
export declare function checkSystemAnomalies(): Promise<AnomalyAlert[]>;
export declare function getAlertHistory(limit?: number): AnomalyAlert[];
export declare function clearAlertHistory(): void;
//# sourceMappingURL=detector.d.ts.map