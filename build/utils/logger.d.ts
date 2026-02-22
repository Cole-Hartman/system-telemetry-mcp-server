/**
 * Logger utility that writes to stderr to avoid corrupting STDIO transport.
 * CRITICAL: Never use console.log in MCP servers - it interferes with JSON-RPC.
 */
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
declare class Logger {
    private minLevel;
    setLevel(level: LogLevel): void;
    private shouldLog;
    private formatMessage;
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map