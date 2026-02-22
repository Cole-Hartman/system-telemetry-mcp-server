/**
 * Memory monitoring tools
 */

import { z } from 'zod';
import { getMemoryUsage } from '../services/memory.service.js';
import { formatBytes } from '../utils/format.js';
import { logger } from '../utils/logger.js';

export const memoryTools = {
  memory_get_usage: {
    description: 'Get current memory usage including RAM and swap, with usage percentages',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling memory_get_usage');
      const usage = await getMemoryUsage();

      // Add human-readable formatted values
      const formatted = {
        ...usage,
        totalFormatted: formatBytes(usage.total),
        usedFormatted: formatBytes(usage.used),
        freeFormatted: formatBytes(usage.free),
        availableFormatted: formatBytes(usage.available),
        swap: {
          ...usage.swap,
          totalFormatted: formatBytes(usage.swap.total),
          usedFormatted: formatBytes(usage.swap.used),
          freeFormatted: formatBytes(usage.swap.free),
        },
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatted, null, 2),
          },
        ],
      };
    },
  },
};
