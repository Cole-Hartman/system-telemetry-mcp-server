/**
 * MCP Server configuration and tool registration
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { systemTools } from './tools/system.tools.js';
import { cpuTools } from './tools/cpu.tools.js';
import { memoryTools } from './tools/memory.tools.js';
import { gpuTools } from './tools/gpu.tools.js';
import { diskTools } from './tools/disk.tools.js';
import { networkTools } from './tools/network.tools.js';
import { batteryTools } from './tools/battery.tools.js';
import { thermalTools } from './tools/thermal.tools.js';
import { processTools } from './tools/process.tools.js';
import { historyTools } from './tools/history.tools.js';
import { anomalyTools } from './tools/anomaly.tools.js';
import { logger } from './utils/logger.js';
// Combine all tool definitions
const allTools = {
    ...systemTools,
    ...cpuTools,
    ...memoryTools,
    ...gpuTools,
    ...diskTools,
    ...networkTools,
    ...batteryTools,
    ...thermalTools,
    ...processTools,
    ...historyTools,
    ...anomalyTools,
};
export function createServer() {
    logger.info('Creating MCP server');
    const server = new McpServer({
        name: 'system-resource-mcp',
        version: '1.0.0',
    });
    // Register all tools
    for (const [name, tool] of Object.entries(allTools)) {
        logger.debug(`Registering tool: ${name}`);
        server.tool(name, tool.description, tool.inputSchema.shape, tool.handler);
    }
    logger.info(`MCP server created with ${Object.keys(allTools).length} tools registered`);
    return server;
}
//# sourceMappingURL=server.js.map