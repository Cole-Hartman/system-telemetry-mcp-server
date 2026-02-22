/**
 * Entry point - STDIO transport setup for MCP server
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';
import { startCollector, stopCollector } from './history/collector.js';
import { logger } from './utils/logger.js';

async function main(): Promise<void> {
  logger.info('Starting System Resource MCP Server');

  // Start background metrics collection
  startCollector();

  const server = createServer();
  const transport = new StdioServerTransport();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down...');
    stopCollector();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down...');
    stopCollector();
    process.exit(0);
  });

  await server.connect(transport);

  logger.info('Server connected and ready');
}

main().catch((error) => {
  logger.error('Fatal error starting server', error);
  stopCollector();
  process.exit(1);
});
