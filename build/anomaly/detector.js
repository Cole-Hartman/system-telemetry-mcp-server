/**
 * Anomaly detection engine
 */
import si from 'systeminformation';
import { defaultRules } from './rules.js';
import { logger } from '../utils/logger.js';
const MAX_ALERTS = 100;
const alertHistory = [];
function checkThreshold(value, rule) {
    if (rule.comparison === 'greater') {
        if (value >= rule.criticalThreshold) {
            return { triggered: true, severity: 'critical' };
        }
        if (value >= rule.warningThreshold) {
            return { triggered: true, severity: 'warning' };
        }
    }
    else {
        if (value <= rule.criticalThreshold) {
            return { triggered: true, severity: 'critical' };
        }
        if (value <= rule.warningThreshold) {
            return { triggered: true, severity: 'warning' };
        }
    }
    return { triggered: false, severity: null };
}
function addAlert(alert) {
    alertHistory.push(alert);
    // Keep only the most recent alerts
    if (alertHistory.length > MAX_ALERTS) {
        alertHistory.shift();
    }
}
export async function checkSystemAnomalies() {
    logger.debug('Checking system anomalies');
    const currentAlerts = [];
    const now = Date.now();
    // Gather all metrics
    const [load, mem, fsSize, battery] = await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.fsSize(),
        si.battery(),
    ]);
    // Check CPU usage
    const cpuRule = defaultRules.find((r) => r.type === 'cpu_usage');
    const cpuResult = checkThreshold(load.currentLoad, cpuRule);
    if (cpuResult.triggered && cpuResult.severity) {
        const alert = {
            type: 'cpu_usage',
            severity: cpuResult.severity,
            message: `CPU usage is ${cpuResult.severity === 'critical' ? 'critically' : ''} high at ${load.currentLoad.toFixed(1)}%`,
            value: load.currentLoad,
            threshold: cpuResult.severity === 'critical' ? cpuRule.criticalThreshold : cpuRule.warningThreshold,
            timestamp: now,
        };
        currentAlerts.push(alert);
        addAlert(alert);
    }
    // Check memory usage (use available, not used, for accurate macOS memory pressure)
    const memUsagePercent = ((mem.total - mem.available) / mem.total) * 100;
    const memRule = defaultRules.find((r) => r.type === 'memory_usage');
    const memResult = checkThreshold(memUsagePercent, memRule);
    if (memResult.triggered && memResult.severity) {
        const alert = {
            type: 'memory_usage',
            severity: memResult.severity,
            message: `Memory usage is ${memResult.severity === 'critical' ? 'critically' : ''} high at ${memUsagePercent.toFixed(1)}%`,
            value: memUsagePercent,
            threshold: memResult.severity === 'critical' ? memRule.criticalThreshold : memRule.warningThreshold,
            timestamp: now,
        };
        currentAlerts.push(alert);
        addAlert(alert);
    }
    // Check swap usage
    if (mem.swaptotal > 0) {
        const swapUsagePercent = (mem.swapused / mem.swaptotal) * 100;
        const swapRule = defaultRules.find((r) => r.type === 'swap_usage');
        const swapResult = checkThreshold(swapUsagePercent, swapRule);
        if (swapResult.triggered && swapResult.severity) {
            const alert = {
                type: 'swap_usage',
                severity: swapResult.severity,
                message: `Swap usage is ${swapResult.severity === 'critical' ? 'critically' : ''} high at ${swapUsagePercent.toFixed(1)}%`,
                value: swapUsagePercent,
                threshold: swapResult.severity === 'critical' ? swapRule.criticalThreshold : swapRule.warningThreshold,
                timestamp: now,
            };
            currentAlerts.push(alert);
            addAlert(alert);
        }
    }
    // Check disk usage (only for main filesystems)
    const diskRule = defaultRules.find((r) => r.type === 'disk_usage');
    for (const fs of fsSize) {
        // Skip virtual filesystems
        if (fs.mount.startsWith('/System') || fs.mount.startsWith('/private')) {
            continue;
        }
        const diskResult = checkThreshold(fs.use, diskRule);
        if (diskResult.triggered && diskResult.severity) {
            const alert = {
                type: 'disk_usage',
                severity: diskResult.severity,
                message: `Disk usage on ${fs.mount} is ${diskResult.severity === 'critical' ? 'critically' : ''} high at ${fs.use.toFixed(1)}%`,
                value: fs.use,
                threshold: diskResult.severity === 'critical' ? diskRule.criticalThreshold : diskRule.warningThreshold,
                timestamp: now,
            };
            currentAlerts.push(alert);
            addAlert(alert);
        }
    }
    // Check battery (if present)
    if (battery.hasBattery) {
        // Battery level
        const levelRule = defaultRules.find((r) => r.type === 'battery_level');
        if (!battery.isCharging && !battery.acConnected) {
            const levelResult = checkThreshold(battery.percent, levelRule);
            if (levelResult.triggered && levelResult.severity) {
                const alert = {
                    type: 'battery_level',
                    severity: levelResult.severity,
                    message: `Battery level is ${levelResult.severity === 'critical' ? 'critically' : ''} low at ${battery.percent}%`,
                    value: battery.percent,
                    threshold: levelResult.severity === 'critical' ? levelRule.criticalThreshold : levelRule.warningThreshold,
                    timestamp: now,
                };
                currentAlerts.push(alert);
                addAlert(alert);
            }
        }
        // Battery health
        if (battery.designedCapacity > 0) {
            const health = (battery.maxCapacity / battery.designedCapacity) * 100;
            const healthRule = defaultRules.find((r) => r.type === 'battery_health');
            const healthResult = checkThreshold(health, healthRule);
            if (healthResult.triggered && healthResult.severity) {
                const alert = {
                    type: 'battery_health',
                    severity: healthResult.severity,
                    message: `Battery health is ${healthResult.severity === 'critical' ? 'poor' : 'degraded'} at ${health.toFixed(1)}%`,
                    value: health,
                    threshold: healthResult.severity === 'critical' ? healthRule.criticalThreshold : healthRule.warningThreshold,
                    timestamp: now,
                };
                currentAlerts.push(alert);
                addAlert(alert);
            }
        }
    }
    return currentAlerts;
}
export function getAlertHistory(limit) {
    const alerts = [...alertHistory].reverse(); // Most recent first
    return limit ? alerts.slice(0, limit) : alerts;
}
export function clearAlertHistory() {
    alertHistory.length = 0;
}
//# sourceMappingURL=detector.js.map