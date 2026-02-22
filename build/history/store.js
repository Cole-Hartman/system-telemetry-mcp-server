/**
 * Ring buffer store for historical metrics
 */
export class RingBuffer {
    buffer;
    head = 0;
    tail = 0;
    count = 0;
    capacity;
    constructor(capacity) {
        this.capacity = capacity;
        this.buffer = new Array(capacity);
    }
    push(item) {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        if (this.count < this.capacity) {
            this.count++;
        }
        else {
            this.head = (this.head + 1) % this.capacity;
        }
    }
    toArray() {
        const result = [];
        for (let i = 0; i < this.count; i++) {
            const index = (this.head + i) % this.capacity;
            result.push(this.buffer[index]);
        }
        return result;
    }
    getCount() {
        return this.count;
    }
    clear() {
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }
}
export class MetricStore {
    cpuHistory;
    memoryHistory;
    intervalMs;
    constructor(options = {}) {
        const { maxPoints = 300, intervalMs = 1000 } = options;
        this.intervalMs = intervalMs;
        this.cpuHistory = new RingBuffer(maxPoints);
        this.memoryHistory = new RingBuffer(maxPoints);
    }
    recordCpu(value) {
        this.cpuHistory.push({
            timestamp: Date.now(),
            value,
        });
    }
    recordMemory(value) {
        this.memoryHistory.push({
            timestamp: Date.now(),
            value,
        });
    }
    getCpuHistory(durationMs) {
        const points = this.cpuHistory.toArray();
        if (!durationMs) {
            return points;
        }
        const cutoff = Date.now() - durationMs;
        return points.filter((p) => p.timestamp >= cutoff);
    }
    getMemoryHistory(durationMs) {
        const points = this.memoryHistory.toArray();
        if (!durationMs) {
            return points;
        }
        const cutoff = Date.now() - durationMs;
        return points.filter((p) => p.timestamp >= cutoff);
    }
    getIntervalMs() {
        return this.intervalMs;
    }
}
// Singleton instance
export const metricStore = new MetricStore({
    maxPoints: 300, // 5 minutes at 1-second interval
    intervalMs: 1000,
});
//# sourceMappingURL=store.js.map