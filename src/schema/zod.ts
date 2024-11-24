import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    type: z.enum(['line', 'bar']),
    data_source: z.object({
        id: z.string().min(1, "Data source is required"),
        name: z.string().optional(),
    }),
    y_axis_name: z.string().optional(),
    frequency: z.enum(['monthly', 'quarterly', 'yearly']),
    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid color code' }),
    line_style: z.enum(['solid', 'dashed', 'dotted']).optional(),
    bar_style: z.enum(['thin', 'medium', 'thick']).optional(),
});

type ChartFormInputs = z.infer<typeof formSchema>;

export interface ChartConfig extends ChartFormInputs {
    id: number;
}