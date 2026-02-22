/**
 * Battery monitoring tools
 */
import { z } from 'zod';
export declare const batteryTools: {
    battery_get_status: {
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
//# sourceMappingURL=battery.tools.d.ts.map