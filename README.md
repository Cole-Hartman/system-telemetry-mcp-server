# System Resource MCP Server

An MCP server that provides real-time macOS system monitoring capabilities. Allows AI assistants to monitor CPU, memory, disk, network, battery, thermal status, and more.

## Features

- **System Info** - OS version, hostname, uptime, architecture
- **CPU** - Specs, real-time usage, per-core metrics, usage history
- **Memory** - Usage stats, available/used/total, usage history
- **GPU** - Graphics card info and utilization
- **Disk** - Storage usage and I/O statistics
- **Network** - Interface info and traffic stats
- **Battery** - Charge level, health, power source
- **Thermal** - Temperature sensors
- **Processes** - List and inspect running processes
- **Anomaly Detection** - Automatic alerts for high CPU, low memory, disk space issues

## Installation

```bash
npm install
npm run build
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "system-resources": {
      "command": "node",
      "args": ["/path/to/system-resource-mcp/build/index.js"]
    }
  }
}
```

## Development

```bash
npm run dev    # Run with tsx (no build needed)
npm run build  # Compile TypeScript
npm run start  # Run compiled version
```

## Tools

| Tool | Description |
|------|-------------|
| `system_get_info` | Basic system information |
| `system_get_overview` | Combined health snapshot |
| `cpu_get_info` | CPU specifications |
| `cpu_get_usage` | Current CPU usage |
| `cpu_get_history` | CPU usage over time |
| `memory_get_usage` | Memory statistics |
| `memory_get_history` | Memory usage over time |
| `gpu_get_info` | GPU information |
| `disk_get_usage` | Disk space usage |
| `disk_get_io` | Disk I/O statistics |
| `network_get_interfaces` | Network interface info |
| `network_get_stats` | Network traffic stats |
| `battery_get_status` | Battery information |
| `thermal_get_temperatures` | Temperature readings |
| `process_list` | List running processes |
| `process_get_details` | Details for a specific process |
| `anomaly_check_system` | Check for system anomalies |
| `anomaly_get_alerts` | Recent anomaly alerts |

## License

MIT
