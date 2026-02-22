/**
 * Network monitoring tools
 */
import { z } from 'zod';
export declare const networkTools: {
    network_get_interfaces: {
        description: string;
        inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
        handler: () => Promise<{
            content: {
                type: "text";
                text: string;
            }[];
        }>;
    };
    network_get_stats: {
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
//# sourceMappingURL=network.tools.d.ts.map