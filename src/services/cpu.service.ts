/**
 * CPU monitoring service
 */

import si from 'systeminformation';
import { CpuInfo, CpuUsage } from '../types/system.types.js';
import { logger } from '../utils/logger.js';

export async function getCpuInfo(): Promise<CpuInfo> {
  logger.debug('Fetching CPU info');

  const cpu = await si.cpu();

  return {
    manufacturer: cpu.manufacturer,
    brand: cpu.brand,
    cores: cpu.cores,
    physicalCores: cpu.physicalCores,
    speed: cpu.speed,
    speedMin: cpu.speedMin,
    speedMax: cpu.speedMax,
    cache: {
      l1d: cpu.cache.l1d,
      l1i: cpu.cache.l1i,
      l2: cpu.cache.l2,
      l3: cpu.cache.l3,
    },
  };
}

export async function getCpuUsage(): Promise<CpuUsage> {
  logger.debug('Fetching CPU usage');

  const load = await si.currentLoad();

  return {
    overall: load.currentLoad,
    user: load.currentLoadUser,
    system: load.currentLoadSystem,
    idle: load.currentLoadIdle,
    cores: load.cpus.map((cpu) => cpu.load),
  };
}
