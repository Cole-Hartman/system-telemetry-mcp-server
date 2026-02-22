/**
 * Thermal monitoring tools
 */
import { z } from 'zod';
import { getThermalInfo } from '../services/thermal.service.js';
import { formatTemperature } from '../utils/format.js';
import { logger } from '../utils/logger.js';
export const thermalTools = {
    thermal_get_temperatures: {
        description: 'Get CPU/GPU temperatures. Note: On Apple Silicon, detailed thermal data may require elevated permissions.',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling thermal_get_temperatures');
            const thermal = await getThermalInfo();
            if (thermal.main === 0 && thermal.cores.length === 0) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                available: false,
                                message: 'Temperature sensors not accessible. On Apple Silicon, detailed thermal monitoring may require third-party tools or elevated permissions.',
                            }, null, 2),
                        },
                    ],
                };
            }
            const formatted = {
                main: thermal.main,
                mainFormatted: formatTemperature(thermal.main),
                cores: thermal.cores,
                coresFormatted: thermal.cores.map(formatTemperature),
                max: thermal.max,
                maxFormatted: formatTemperature(thermal.max),
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(formatted, null, 2),
                    },
                ],
            };
        },
    },
};
//# sourceMappingURL=thermal.tools.js.map