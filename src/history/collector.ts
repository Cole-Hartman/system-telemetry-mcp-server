/**
 * Background collector for historical metrics
 */

import si from 'systeminformation';
import { metricStore } from './store.js';
import { logger } from '../utils/logger.js';

let collectorInterval: NodeJS.Timeout | null = null;
let isRunning = false;

async function collectMetrics(): Promise<void> {
  try {
    const [load, mem] = await Promise.all([
      si.currentLoad(),
      si.mem(),
    ]);

    metricStore.recordCpu(load.currentLoad);
    metricStore.recordMemory(((mem.total - mem.available) / mem.total) * 100);
  } catch (error) {
    logger.error('Error collecting metrics', error);
  }
}

export function startCollector(): void {
  if (isRunning) {
    logger.debug('Collector already running');
    return;
  }

  logger.info('Starting metrics collector');
  isRunning = true;

  // Collect immediately, then on interval
  collectMetrics();

  collectorInterval = setInterval(collectMetrics, metricStore.getIntervalMs());
}

export function stopCollector(): void {
  if (collectorInterval) {
    clearInterval(collectorInterval);
    collectorInterval = null;
    isRunning = false;
    logger.info('Metrics collector stopped');
  }
}

export function isCollectorRunning(): boolean {
  return isRunning;
}
