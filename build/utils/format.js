/**
 * Data formatting helpers for consistent output
 */
export function formatBytes(bytes) {
    if (bytes === 0)
        return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${units[i]}`;
}
export function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const parts = [];
    if (days > 0)
        parts.push(`${days}d`);
    if (hours > 0)
        parts.push(`${hours}h`);
    if (minutes > 0)
        parts.push(`${minutes}m`);
    return parts.length > 0 ? parts.join(' ') : '< 1m';
}
export function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}
export function formatSpeed(hz) {
    if (hz >= 1e9) {
        return `${(hz / 1e9).toFixed(2)} GHz`;
    }
    return `${(hz / 1e6).toFixed(0)} MHz`;
}
export function formatTemperature(celsius) {
    return `${celsius.toFixed(1)}°C`;
}
//# sourceMappingURL=format.js.map