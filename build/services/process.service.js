/**
 * Process monitoring service
 */
import si from 'systeminformation';
import { logger } from '../utils/logger.js';
export async function getProcessList(options = {}) {
    logger.debug('Fetching process list');
    const { sortBy = 'cpu', limit = 10 } = options;
    const processes = await si.processes();
    // Sort by CPU or memory
    const sorted = processes.list.sort((a, b) => {
        if (sortBy === 'memory') {
            return b.mem - a.mem;
        }
        return b.cpu - a.cpu;
    });
    // Take top N processes
    const topProcesses = sorted.slice(0, limit);
    return topProcesses.map((proc) => ({
        pid: proc.pid,
        name: proc.name,
        cpu: proc.cpu,
        memory: proc.mem,
        memoryBytes: proc.memRss,
        user: proc.user,
        started: proc.started,
        state: proc.state,
        command: proc.command,
    }));
}
export async function getProcessDetails(pid) {
    logger.debug(`Fetching process details for PID ${pid}`);
    const processes = await si.processes();
    const proc = processes.list.find((p) => p.pid === pid);
    if (!proc) {
        return null;
    }
    return {
        pid: proc.pid,
        name: proc.name,
        cpu: proc.cpu,
        memory: proc.mem,
        memoryBytes: proc.memRss,
        user: proc.user,
        started: proc.started,
        state: proc.state,
        command: proc.command,
        path: proc.path,
        parentPid: proc.parentPid,
        priority: proc.priority,
        threads: proc.threads ?? 0,
    };
}
//# sourceMappingURL=process.service.js.map