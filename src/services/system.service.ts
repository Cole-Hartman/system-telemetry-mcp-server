/**
 * System information service using systeminformation package
 */

import si from 'systeminformation';
import { SystemInfo } from '../types/system.types.js';
import { formatUptime } from '../utils/format.js';
import { logger } from '../utils/logger.js';

export async function getSystemInfo(): Promise<SystemInfo> {
  logger.debug('Fetching system info');

  const [osInfo, time] = await Promise.all([
    si.osInfo(),
    si.time(),
  ]);

  return {
    hostname: osInfo.hostname,
    platform: osInfo.platform,
    distro: osInfo.distro,
    release: osInfo.release,
    arch: osInfo.arch,
    uptime: time.uptime,
    uptimeFormatted: formatUptime(time.uptime),
  };
}
