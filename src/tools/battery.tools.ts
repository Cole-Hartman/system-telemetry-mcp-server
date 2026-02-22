/**
 * Battery monitoring tools
 */

import { z } from 'zod';
import { getBatteryStatus } from '../services/battery.service.js';
import { logger } from '../utils/logger.js';

export const batteryTools = {
  battery_get_status: {
    description: 'Get battery status including charge level, health, cycle count, and charging state',
    inputSchema: z.object({}),
    handler: async () => {
      logger.debug('Handling battery_get_status');
      const status = await getBatteryStatus();

      if (!status.hasBattery) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({ hasBattery: false, message: 'No battery detected on this system' }, null, 2),
            },
          ],
        };
      }

      const formatted = {
        ...status,
        healthFormatted: `${status.health.toFixed(1)}%`,
        timeRemainingFormatted: status.timeRemaining
          ? `${Math.floor(status.timeRemaining / 60)}h ${status.timeRemaining % 60}m`
          : null,
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
