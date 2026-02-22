/**
 * CPU monitoring tools
 */
import { z } from 'zod';
import { getCpuInfo, getCpuUsage } from '../services/cpu.service.js';
import { logger } from '../utils/logger.js';
export const cpuTools = {
    cpu_get_info: {
        description: 'Get CPU specifications including manufacturer, model, cores, speed, and cache sizes',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling cpu_get_info');
            const info = await getCpuInfo();
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(info, null, 2),
                    },
                ],
            };
        },
    },
    cpu_get_usage: {
        description: 'Get current CPU usage including overall load and per-core usage',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling cpu_get_usage');
            const usage = await getCpuUsage();
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(usage, null, 2),
                    },
                ],
            };
        },
    },
};
//# sourceMappingURL=cpu.tools.js.map