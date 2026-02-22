/**
 * Network monitoring service
 */
import si from 'systeminformation';
import { logger } from '../utils/logger.js';
let lastNetStats = new Map();
export async function getNetworkInterfaces() {
    logger.debug('Fetching network interfaces');
    const interfaces = await si.networkInterfaces();
    // Handle both array and single object return types
    const interfaceArray = Array.isArray(interfaces) ? interfaces : [interfaces];
    return interfaceArray.map((iface) => ({
        name: iface.iface,
        ip4: iface.ip4,
        ip6: iface.ip6,
        mac: iface.mac,
        type: iface.type,
        speed: iface.speed,
        dhcp: iface.dhcp,
        internal: iface.internal,
    }));
}
export async function getNetworkStats() {
    logger.debug('Fetching network stats');
    const stats = await si.networkStats();
    const now = Date.now();
    return stats.map((stat) => {
        let rxPerSecond = 0;
        let txPerSecond = 0;
        const last = lastNetStats.get(stat.iface);
        if (last) {
            const elapsed = (now - last.timestamp) / 1000;
            if (elapsed > 0) {
                rxPerSecond = (stat.rx_bytes - last.rx) / elapsed;
                txPerSecond = (stat.tx_bytes - last.tx) / elapsed;
            }
        }
        lastNetStats.set(stat.iface, {
            timestamp: now,
            rx: stat.rx_bytes,
            tx: stat.tx_bytes,
        });
        return {
            interface: stat.iface,
            rxBytes: stat.rx_bytes,
            txBytes: stat.tx_bytes,
            rxPerSecond: rxPerSecond >= 0 ? rxPerSecond : 0,
            txPerSecond: txPerSecond >= 0 ? txPerSecond : 0,
        };
    });
}
//# sourceMappingURL=network.service.js.map