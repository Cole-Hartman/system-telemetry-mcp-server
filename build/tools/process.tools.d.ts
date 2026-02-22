/**
 * Process monitoring tools
 */
import { z } from 'zod';
export declare const processTools: {
    process_list: {
        description: string;
        inputSchema: z.ZodObject<{
            sortBy: z.ZodOptional<z.ZodEnum<["cpu", "memory"]>>;
            limit: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            sortBy?: "memory" | "cpu" | undefined;
            limit?: number | undefined;
        }, {
            sortBy?: "memory" | "cpu" | undefined;
            limit?: number | undefined;
        }>;
        handler: (args: {
            sortBy?: "cpu" | "memory";
            limit?: number;
        }) => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
    process_get_details: {
        description: string;
        inputSchema: z.ZodObject<{
            pid: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            pid: number;
        }, {
            pid: number;
        }>;
        handler: (args: {
            pid: number;
        }) => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
};
//# sourceMappingURL=process.tools.d.ts.map