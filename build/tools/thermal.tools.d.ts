/**
 * Thermal monitoring tools
 */
import { z } from 'zod';
export declare const thermalTools: {
    thermal_get_temperatures: {
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
//# sourceMappingURL=thermal.tools.d.ts.map