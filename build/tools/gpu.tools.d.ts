/**
 * GPU monitoring tools
 */
import { z } from 'zod';
export declare const gpuTools: {
    gpu_get_info: {
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
//# sourceMappingURL=gpu.tools.d.ts.map