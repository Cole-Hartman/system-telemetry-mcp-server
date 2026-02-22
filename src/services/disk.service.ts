/**
 * Disk monitoring service
 */

import si from 'systeminformation';
import { DiskUsage, DiskIO } from '../types/system.types.js';
import { logger } from '../utils/logger.js';

let lastDiskIO: { timestamp: number; read: number; write: number } | null = null;

export async function getDiskUsage(): Promise<DiskUsage[]> {
  logger.debug('Fetching disk usage');

  const fsSize = await si.fsSize();

  return fsSize.map((fs) => ({
    filesystem: fs.fs,
    mount: fs.mount,
    type: fs.type,
    size: fs.size,
    used: fs.used,
    available: fs.available,
    usedPercent: fs.use,
  }));
}

export async function getDiskIO(): Promise<DiskIO> {
  logger.debug('Fetching disk IO');

  const disksIO = await si.disksIO();
  const now = Date.now();

  let readPerSecond = 0;
  let writePerSecond = 0;

  if (lastDiskIO) {
    const elapsed = (now - lastDiskIO.timestamp) / 1000;
    if (elapsed > 0) {
      readPerSecond = (disksIO.rIO_sec ?? 0) || (disksIO.rIO - lastDiskIO.read) / elapsed;
      writePerSecond = (disksIO.wIO_sec ?? 0) || (disksIO.wIO - lastDiskIO.write) / elapsed;
    }
  }

  lastDiskIO = {
    timestamp: now,
    read: disksIO.rIO,
    write: disksIO.wIO,
  };

  return {
    readBytes: disksIO.rIO,
    writeBytes: disksIO.wIO,
    readPerSecond: readPerSecond >= 0 ? readPerSecond : 0,
    writePerSecond: writePerSecond >= 0 ? writePerSecond : 0,
  };
}
