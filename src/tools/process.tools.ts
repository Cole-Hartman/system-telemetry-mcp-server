/**
 * Process monitoring tools
 */

import { z } from 'zod';
import { getProcessList, getProcessDetails } from '../services/process.service.js';
import { formatBytes } from '../utils/format.js';
import { logger } from '../utils/logger.js';

export const processTools = {
  process_list: {
    description: 'List top processes sorted by CPU or memory usage',
    inputSchema: z.object({
      sortBy: z.enum(['cpu', 'memory']).optional().describe('Sort by CPU or memory usage (default: cpu)'),
      limit: z.number().min(1).max(50).optional().describe('Number of processes to return (default: 10, max: 50)'),
    }),
    handler: async (args: { sortBy?: 'cpu' | 'memory'; limit?: number }) => {
      logger.debug('Handling process_list', args);
      const processes = await getProcessList({
        sortBy: args.sortBy ?? 'cpu',
        limit: args.limit ?? 10,
      });

      const formatted = processes.map((proc) => ({
        ...proc,
        cpuFormatted: `${proc.cpu.toFixed(1)}%`,
        memoryFormatted: `${proc.memory.toFixed(1)}%`,
        memoryBytesFormatted: formatBytes(proc.memoryBytes),
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

  process_get_details: {
    description: 'Get detailed information about a specific process by PID',
    inputSchema: z.object({
      pid: z.number().describe('Process ID to get details for'),
    }),
    handler: async (args: { pid: number }) => {
      logger.debug('Handling process_get_details', args);
      const details = await getProcessDetails(args.pid);

      if (!details) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ error: `Process with PID ${args.pid} not found` }, null, 2),
            },
          ],
        };
      }

      const formatted = {
        ...details,
        cpuFormatted: `${details.cpu.toFixed(1)}%`,
        memoryFormatted: `${details.memory.toFixed(1)}%`,
        memoryBytesFormatted: formatBytes(details.memoryBytes),
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
