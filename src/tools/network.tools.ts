/**
 * Network monitoring tools
 */

import { z } from 'zod';
import { getNetworkInterfaces, getNetworkStats } from '../services/network.service.js';
import { formatBytes } from '../utils/format.js';
import { logger } from '../utils/logger.js';

export const networkTools = {
  network_get_interfaces: {
    description: 'Get network interfaces with IP addresses, MAC addresses, and connection type',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling network_get_interfaces');
      const interfaces = await getNetworkInterfaces();
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(interfaces, null, 2),
          },
        ],
      };
    },
  },

  network_get_stats: {
    description: 'Get network traffic statistics (bytes sent/received) for all interfaces',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling network_get_stats');
      const stats = await getNetworkStats();

      const formatted = stats.map((stat) => ({
        ...stat,
        rxBytesFormatted: formatBytes(stat.rxBytes),
        txBytesFormatted: formatBytes(stat.txBytes),
        rxPerSecondFormatted: formatBytes(stat.rxPerSecond) + '/s',
        txPerSecondFormatted: formatBytes(stat.txPerSecond) + '/s',
      }));

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
