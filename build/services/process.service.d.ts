/**
 * Process monitoring service
 */
import { ProcessInfo, ProcessDetails } from '../types/system.types.js';
export interface ProcessListOptions {
    sortBy?: 'cpu' | 'memory';
    limit?: number;
}
export declare function getProcessList(options?: ProcessListOptions): Promise<ProcessInfo[]>;
export declare function getProcessDetails(pid: number): Promise<ProcessDetails | null>;
//# sourceMappingURL=process.service.d.ts.map