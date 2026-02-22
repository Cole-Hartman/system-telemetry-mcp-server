/**
 * GPU monitoring tools
 */
import { z } from 'zod';
import { getGpuInfo } from '../services/gpu.service.js';
import { logger } from '../utils/logger.js';
export const gpuTools = {
    gpu_get_info: {
        description: 'Get GPU information including vendor, model, VRAM, and connected displays',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling gpu_get_info');
            const info = await getGpuInfo();
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
};
//# sourceMappingURL=gpu.tools.js.map