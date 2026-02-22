/**
 * Anomaly detection tools
 */
import { z } from 'zod';
export declare const anomalyTools: {
    anomaly_check_system: {
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
    anomaly_get_alerts: {
        description: string;
        inputSchema: z.ZodObject<{
            limit: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            limit?: number | undefined;
        }, {
            limit?: number | undefined;
        }>;
        handler: (args: {
            limit?: number;
        }) => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
};
//# sourceMappingURL=anomaly.tools.d.ts.map