/**
 * Ring buffer store for historical metrics
 */

import { HistoryPoint } from '../types/system.types.js';

export class RingBuffer<T> {
  private buffer: T[];
  private head: number = 0;
  private tail: number = 0;
  private count: number = 0;
  private readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  push(item: T): void {
    this.buffer[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;

    if (this.count < this.capacity) {
      this.count++;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      result.push(this.buffer[index]);
    }
    return result;
  }

  getCount(): number {
    return this.count;
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }
}

export interface MetricStoreOptions {
  maxPoints?: number;
  intervalMs?: number;
}

export class MetricStore {
  private cpuHistory: RingBuffer<HistoryPoint>;
  private memoryHistory: RingBuffer<HistoryPoint>;
  private readonly intervalMs: number;

  constructor(options: MetricStoreOptions = {}) {
    const { maxPoints = 300, intervalMs = 1000 } = options;
    this.intervalMs = intervalMs;
    this.cpuHistory = new RingBuffer(maxPoints);
    this.memoryHistory = new RingBuffer(maxPoints);
  }

  recordCpu(value: number): void {
    this.cpuHistory.push({
      timestamp: Date.now(),
      value,
    });
  }

  recordMemory(value: number): void {
    this.memoryHistory.push({
      timestamp: Date.now(),
      value,
    });
  }

  getCpuHistory(durationMs?: number): HistoryPoint[] {
    const points = this.cpuHistory.toArray();
    if (!durationMs) {
      return points;
    }

    const cutoff = Date.now() - durationMs;
    return points.filter((p) => p.timestamp >= cutoff);
  }

  getMemoryHistory(durationMs?: number): HistoryPoint[] {
    const points = this.memoryHistory.toArray();
    if (!durationMs) {
      return points;
    }

    const cutoff = Date.now() - durationMs;
    return points.filter((p) => p.timestamp >= cutoff);
  }

  getIntervalMs(): number {
    return this.intervalMs;
  }
}

// Singleton instance
export const metricStore = new MetricStore({
  maxPoints: 300, // 5 minutes at 1-second interval
  intervalMs: 1000,
});
