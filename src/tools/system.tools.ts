/**
 * System tools - thin layer that validates input, calls service, formats output
 */

import { z } from 'zod';
import { getSystemInfo } from '../services/system.service.js';
import { getCpuInfo, getCpuUsage } from '../services/cpu.service.js';
import { getMemoryUsage } from '../services/memory.service.js';
import { getDiskUsage } from '../services/disk.service.js';
import { getBatteryStatus } from '../services/battery.service.js';
import { formatBytes } from '../utils/format.js';
import { logger } from '../utils/logger.js';

export const systemTools = {
  system_get_info: {
    description: 'Get basic system information including macOS version, hostname, uptime, and architecture',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling system_get_info');
      const info = await getSystemInfo();
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    },
  },

  system_get_overview: {
    description: 'Get a combined system health snapshot including CPU, memory, disk, and battery status',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling system_get_overview');

      const [system, cpuInfo, cpuUsage, memory, disk, battery] = await Promise.all([
        getSystemInfo(),
        getCpuInfo(),
        getCpuUsage(),
        getMemoryUsage(),
        getDiskUsage(),
        getBatteryStatus(),
      ]);

      const overview = {
        system,
        cpu: {
          info: cpuInfo,
          usage: cpuUsage,
        },
        memory: {
          ...memory,
          totalFormatted: formatBytes(memory.total),
          usedFormatted: formatBytes(memory.used),
          availableFormatted: formatBytes(memory.available),
        },
        disk: disk.map((d) => ({
          ...d,
          sizeFormatted: formatBytes(d.size),
          usedFormatted: formatBytes(d.used),
          availableFormatted: formatBytes(d.available),
        })),
        battery: battery.hasBattery ? battery : null,
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(overview, null, 2),
          },
        ],
      };
    },
  },
};
