/**
 * Memory monitoring service
 */

import si from 'systeminformation';
import { MemoryUsage } from '../types/system.types.js';
import { logger } from '../utils/logger.js';

export async function getMemoryUsage(): Promise<MemoryUsage> {
  logger.debug('Fetching memory usage');

  const mem = await si.mem();

  return {
    total: mem.total,
    used: mem.used,
    free: mem.free,
    active: mem.active,
    available: mem.available,
    usedPercent: ((mem.total - mem.available) / mem.total) * 100,
    swap: {
      total: mem.swaptotal,
      used: mem.swapused,
      free: mem.swapfree,
      usedPercent: mem.swaptotal > 0 ? (mem.swapused / mem.swaptotal) * 100 : 0,
    },
  };
}
