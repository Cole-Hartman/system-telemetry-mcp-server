/**
 * Anomaly detection tools
 */
import { z } from 'zod';
import { checkSystemAnomalies, getAlertHistory } from '../anomaly/detector.js';
import { defaultRules } from '../anomaly/rules.js';
import { logger } from '../utils/logger.js';
export const anomalyTools = {
    anomaly_check_system: {
        description: 'Check current system state for anomalies (high CPU, low memory, disk space, battery issues, etc.)',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling anomaly_check_system');
            const alerts = await checkSystemAnomalies();
            const result = {
                alertCount: alerts.length,
                alerts,
                thresholds: defaultRules.map((rule) => ({
                    type: rule.type,
                    name: rule.name,
                    warning: `${rule.comparison === 'greater' ? '>' : '<'} ${rule.warningThreshold}${rule.unit}`,
                    critical: `${rule.comparison === 'greater' ? '>' : '<'} ${rule.criticalThreshold}${rule.unit}`,
                })),
                status: alerts.length === 0 ? 'healthy' :
                    alerts.some((a) => a.severity === 'critical') ? 'critical' : 'warning',
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        },
    },
    anomaly_get_alerts: {
        description: 'Get recent anomaly alerts from the alert history',
        inputSchema: z.object({
            limit: z.number().min(1).max(100).optional()
                .describe('Maximum number of alerts to return (default: 20, max: 100)'),
        }),
        handler: async (args) => {
            logger.debug('Handling anomaly_get_alerts', args);
            const alerts = getAlertHistory(args.limit ?? 20);
            const result = {
                alertCount: alerts.length,
                alerts: alerts.map((alert) => ({
                    ...alert,
                    timestampFormatted: new Date(alert.timestamp).toISOString(),
                })),
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        },
    },
};
//# sourceMappingURL=anomaly.tools.js.map