/**
 * Battery monitoring service
 */

import si from 'systeminformation';
import { BatteryStatus } from '../types/system.types.js';
import { logger } from '../utils/logger.js';

export async function getBatteryStatus(): Promise<BatteryStatus> {
  logger.debug('Fetching battery status');

  const battery = await si.battery();

  return {
    hasBattery: battery.hasBattery,
    isCharging: battery.isCharging,
    percent: battery.percent,
    timeRemaining: battery.timeRemaining !== -1 ? battery.timeRemaining : null,
    cycleCount: battery.cycleCount,
    maxCapacity: battery.maxCapacity,
    designedCapacity: battery.designedCapacity,
    health: battery.designedCapacity > 0
      ? (battery.maxCapacity / battery.designedCapacity) * 100
      : 100,
    voltage: battery.voltage,
    acConnected: battery.acConnected,
  };
}
