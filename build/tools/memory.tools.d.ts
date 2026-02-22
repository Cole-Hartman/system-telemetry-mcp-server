/**
 * Memory monitoring tools
 */
import { z } from 'zod';
export declare const memoryTools: {
    memory_get_usage: {
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
};
//# sourceMappingURL=memory.tools.d.ts.map