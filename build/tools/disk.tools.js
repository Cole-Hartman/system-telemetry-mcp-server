/**
 * Disk monitoring tools
 */
import { z } from 'zod';
import { getDiskUsage, getDiskIO } from '../services/disk.service.js';
import { formatBytes } from '../utils/format.js';
import { logger } from '../utils/logger.js';
export const diskTools = {
    disk_get_usage: {
        description: 'Get disk space usage for all mounted filesystems',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling disk_get_usage');
            const usage = await getDiskUsage();
            // Add human-readable formatted values
            const formatted = usage.map((disk) => ({
                ...disk,
                sizeFormatted: formatBytes(disk.size),
                usedFormatted: formatBytes(disk.used),
                availableFormatted: formatBytes(disk.available),
            }));
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(formatted, null, 2),
                    },
                ],
            };
        },
    },
    disk_get_io: {
        description: 'Get disk I/O throughput (read/write bytes per second)',
        inputSchema: z.object({}),
        handler: async () => {
            logger.debug('Handling disk_get_io');
            const io = await getDiskIO();
            const formatted = {
                ...io,
                readBytesFormatted: formatBytes(io.readBytes),
                writeBytesFormatted: formatBytes(io.writeBytes),
                readPerSecondFormatted: formatBytes(io.readPerSecond) + '/s',
                writePerSecondFormatted: formatBytes(io.writePerSecond) + '/s',
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(formatted, null, 2),
                    },
                ],
            };
        },
    },
};
//# sourceMappingURL=disk.tools.js.map