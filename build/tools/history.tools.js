/**
 * Historical data tools
 */
import { z } from 'zod';
import { metricStore } from '../history/store.js';
import { logger } from '../utils/logger.js';
export const historyTools = {
    cpu_get_history: {
        description: 'Get CPU usage history over time. Returns data points collected at 1-second intervals.',
        inputSchema: z.object({
            durationSeconds: z.number().min(1).max(300).optional()
                .describe('Duration of history to return in seconds (default: all available, max: 300)'),
        }),
        handler: async (args) => {
            logger.debug('Handling cpu_get_history', args);
            const durationMs = args.durationSeconds ? args.durationSeconds * 1000 : undefined;
            const points = metricStore.getCpuHistory(durationMs);
            const result = {
                points,
                duration: points.length > 0 ? points[points.length - 1].timestamp - points[0].timestamp : 0,
                interval: metricStore.getIntervalMs(),
            };
            // Calculate statistics if we have data
            if (points.length > 0) {
                const values = points.map((p) => p.value);
                const stats = {
                    ...result,
                    statistics: {
                        min: Math.min(...values),
                        max: Math.max(...values),
                        avg: values.reduce((a, b) => a + b, 0) / values.length,
                        current: values[values.length - 1],
                        sampleCount: values.length,
                    },
                };
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(stats, null, 2),
                        },
                    ],
                };
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            ...result,
                            message: 'No historical data available yet. Data collection starts when the server runs.',
                        }, null, 2),
                    },
                ],
            };
        },
    },
    memory_get_history: {
        description: 'Get memory usage history over time. Returns data points collected at 1-second intervals.',
        inputSchema: z.object({
            durationSeconds: z.number().min(1).max(300).optional()
                .describe('Duration of history to return in seconds (default: all available, max: 300)'),
        }),
        handler: async (args) => {
            logger.debug('Handling memory_get_history', args);
            const durationMs = args.durationSeconds ? args.durationSeconds * 1000 : undefined;
            const points = metricStore.getMemoryHistory(durationMs);
            const result = {
                points,
                duration: points.length > 0 ? points[points.length - 1].timestamp - points[0].timestamp : 0,
                interval: metricStore.getIntervalMs(),
            };
            // Calculate statistics if we have data
            if (points.length > 0) {
                const values = points.map((p) => p.value);
                const stats = {
                    ...result,
                    statistics: {
                        min: Math.min(...values),
                        max: Math.max(...values),
                        avg: values.reduce((a, b) => a + b, 0) / values.length,
                        current: values[values.length - 1],
                        sampleCount: values.length,
                    },
                };
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(stats, null, 2),
                        },
                    ],
                };
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            ...result,
                            message: 'No historical data available yet. Data collection starts when the server runs.',
                        }, null, 2),
                    },
                ],
            };
        },
    },
};
//# sourceMappingURL=history.tools.js.map