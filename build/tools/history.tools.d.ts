/**
 * Historical data tools
 */
import { z } from 'zod';
export declare const historyTools: {
    cpu_get_history: {
        description: string;
        inputSchema: z.ZodObject<{
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            durationSeconds?: number | undefined;
        }, {
            durationSeconds?: number | undefined;
        }>;
        handler: (args: {
            durationSeconds?: number;
        }) => Promise<{
            content: Array<{
                type: "text";
                text: string;
            }>;
        }>;
    };
    memory_get_history: {
        description: string;
        inputSchema: z.ZodObject<{
            durationSeconds: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            durationSeconds?: number | undefined;
        }, {
            durationSeconds?: number | undefined;
        }>;
        handler: (args: {
            durationSeconds?: number;
        }) => Promise<{
            content: Array<{
                type: "text";
                text: string;
            }>;
        }>;
    };
};
//# sourceMappingURL=history.tools.d.ts.map