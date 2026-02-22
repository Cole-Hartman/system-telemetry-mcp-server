/**
 * MCP Server configuration and tool registration
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { systemTools } from './tools/system.tools.js';
import { cpuTools } from './tools/cpu.tools.js';
import { memoryTools } from './tools/memory.tools.js';
import { gpuTools } from './tools/gpu.tools.js';
import { diskTools } from './tools/disk.tools.js';
import { logger } from './utils/logger.js';

// Combine all tool definitions
const allTools = {
  ...systemTools,
  ...cpuTools,
  ...memoryTools,
  ...gpuTools,
  ...diskTools,
};

export function createServer(): McpServer {
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
