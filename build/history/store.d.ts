/**
 * Ring buffer store for historical metrics
 */
import { HistoryPoint } from '../types/system.types.js';
export declare class RingBuffer<T> {
    private buffer;
    private head;
    private tail;
    private count;
    private readonly capacity;
    constructor(capacity: number);
    push(item: T): void;
    toArray(): T[];
    getCount(): number;
    clear(): void;
}
export interface MetricStoreOptions {
    maxPoints?: number;
    intervalMs?: number;
}
export declare class MetricStore {
    private cpuHistory;
    private memoryHistory;
    private readonly intervalMs;
    constructor(options?: MetricStoreOptions);
    recordCpu(value: number): void;
    recordMemory(value: number): void;
    getCpuHistory(durationMs?: number): HistoryPoint[];
    getMemoryHistory(durationMs?: number): HistoryPoint[];
    getIntervalMs(): number;
}
export declare const metricStore: MetricStore;
//# sourceMappingURL=store.d.ts.map