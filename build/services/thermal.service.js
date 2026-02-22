/**
 * Thermal monitoring service
 */
import si from 'systeminformation';
import { logger } from '../utils/logger.js';
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
export async function getThermalInfo() {
    logger.debug('Fetching thermal info');
    // Try systeminformation first
    const temps = await si.cpuTemperature();
    if (temps.main !== null && temps.main > 0) {
        return {
            main: temps.main,
            cores: temps.cores.filter((t) => t !== null),
            max: temps.max ?? temps.main,
        };
    }
    // Fallback: try native macOS commands for Apple Silicon
    try {
        const result = await getThermalFromNative();
        if (result) {
            return result;
        }
    }
    catch (error) {
        logger.debug('Native thermal reading failed', error);
    }
    // Return default values if no data available
    return {
        main: 0,
        cores: [],
        max: 0,
    };
}
async function getThermalFromNative() {
    try {
        // Use powermetrics for Apple Silicon (requires sudo for full data)
        // Alternative: use ioreg for basic thermal data
        const { stdout } = await execAsync('ioreg -r -c AppleSmartBattery 2>/dev/null | grep -i temperature || echo ""', { timeout: 5000 });
        // This is a basic fallback - full thermal monitoring on Apple Silicon
        // typically requires elevated permissions or third-party tools
        if (stdout.includes('Temperature')) {
            const match = stdout.match(/(\d+)/);
            if (match) {
                // Apple reports in centi-degrees
                const temp = parseInt(match[1], 10) / 100;
                if (temp > 0 && temp < 150) {
                    return {
                        main: temp,
                        cores: [],
                        max: temp,
                    };
                }
            }
        }
        return null;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=thermal.service.js.map