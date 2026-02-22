/**
 * TypeScript interfaces for system monitoring data
 */
export interface SystemInfo {
    hostname: string;
    platform: string;
    distro: string;
    release: string;
    arch: string;
    uptime: number;
    uptimeFormatted: string;
}
export interface CpuInfo {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    speed: number;
    speedMin: number;
    speedMax: number;
    cache: {
        l1d: number;
        l1i: number;
        l2: number;
        l3: number;
    };
}
export interface CpuUsage {
    overall: number;
    user: number;
    system: number;
    idle: number;
    cores: number[];
}
export interface MemoryUsage {
    total: number;
    used: number;
    free: number;
    active: number;
    available: number;
    usedPercent: number;
    swap: {
        total: number;
        used: number;
        free: number;
        usedPercent: number;
    };
}
export interface GpuInfo {
    vendor: string;
    model: string;
    vram: number;
    vramDynamic: boolean;
    displays: Array<{
        vendor: string;
        model: string;
        resolution: string;
        main: boolean;
        builtin: boolean;
    }>;
}
export interface DiskUsage {
    filesystem: string;
    mount: string;
    type: string;
    size: number;
    used: number;
    available: number;
    usedPercent: number;
}
export interface DiskIO {
    readBytes: number;
    writeBytes: number;
    readPerSecond: number;
    writePerSecond: number;
}
export interface NetworkInterface {
    name: string;
    ip4: string;
    ip6: string;
    mac: string;
    type: string;
    speed: number | null;
    dhcp: boolean;
    internal: boolean;
}
export interface NetworkStats {
    interface: string;
    rxBytes: number;
    txBytes: number;
    rxPerSecond: number;
    txPerSecond: number;
}
export interface BatteryStatus {
    hasBattery: boolean;
    isCharging: boolean;
    percent: number;
    timeRemaining: number | null;
    cycleCount: number;
    maxCapacity: number;
    designedCapacity: number;
    health: number;
    voltage: number;
    acConnected: boolean;
}
export interface ThermalInfo {
    main: number;
    cores: number[];
    max: number;
}
export interface ProcessInfo {
    pid: number;
    name: string;
    cpu: number;
    memory: number;
    memoryBytes: number;
    user: string;
    started: string;
    state: string;
    command: string;
}
export interface ProcessDetails extends ProcessInfo {
    path: string;
    parentPid: number;
    priority: number;
    threads: number;
}
export interface SystemOverview {
    system: SystemInfo;
    cpu: {
        info: CpuInfo;
        usage: CpuUsage;
    };
    memory: MemoryUsage;
    disk: DiskUsage[];
    battery: BatteryStatus | null;
}
export interface HistoryPoint {
    timestamp: number;
    value: number;
}
export interface CpuHistory {
    points: HistoryPoint[];
    duration: number;
    interval: number;
}
export interface MemoryHistory {
    points: HistoryPoint[];
    duration: number;
    interval: number;
}
export interface AnomalyAlert {
    type: string;
    severity: 'warning' | 'critical';
    message: string;
    value: number;
    threshold: number;
    timestamp: number;
}
//# sourceMappingURL=system.types.d.ts.map