/**
 * GPU monitoring service
 */

import si from 'systeminformation';
import { GpuInfo } from '../types/system.types.js';
import { logger } from '../utils/logger.js';

export async function getGpuInfo(): Promise<GpuInfo[]> {
  logger.debug('Fetching GPU info');

  const graphics = await si.graphics();

  return graphics.controllers.map((controller, index) => {
    const displays = graphics.displays.filter((d) => {
      // On macOS, displays are typically associated with the first controller
      return index === 0 || graphics.controllers.length === 1;
    });

    return {
      vendor: controller.vendor,
      model: controller.model,
      vram: controller.vram ?? 0,
      vramDynamic: controller.vramDynamic,
      displays: displays.map((display) => ({
        vendor: display.vendor || '',
        model: display.model,
        resolution: `${display.resolutionX}x${display.resolutionY}`,
        main: display.main,
        builtin: display.builtin,
      })),
    };
  });
}
