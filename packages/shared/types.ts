import { z } from "zod";

export enum Dificultity {
    TRIVIAL = "trivial",
    EASY = "easy",
    MODERATE = "moderate",
    HARD = "hard",
    HEROIC = "heroic"
}
const DificultityEnum = z.nativeEnum(Dificultity);
type DificultityEnum = z.infer<typeof DificultityEnum>;

export enum FrequencyType {
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year",
}
const FrequencyTypeEnum = z.nativeEnum(FrequencyType);
type FrequencyTypeEnum = z.infer<typeof FrequencyTypeEnum>;

export const FrequencySchema = z.object({
    frequency: z.number().optional(),
    every: z.number().optional(),
    frequency_type: FrequencyTypeEnum,
    on: z.array(z.any()).optional(),
    on_type: FrequencyTypeEnum,
    special: z.boolean().optional().default(false),
});
export type Frequency = z.infer<typeof FrequencySchema>;

export const CreateActionSchema = z.object({
    category: z.string(),
    sub_category: z.string(),
    name: z.string(),
    suggested_frequency: FrequencySchema.optional(),
    estimated_starting_cost: z.number().optional(),
    estimated_ending_cost: z.number().optional(),
    dificultity: DificultityEnum.optional(),
});
export type CreateAction = z.infer<typeof CreateActionSchema>;

export const ActionSchema = CreateActionSchema.extend({
    id: z.number(),
});
export type Action = z.infer<typeof ActionSchema>;

export const CreateUserActionSchema = z.object({
    action_id: z.number(),
    start_at: z.date(),
    end_at: z.date(),
    all_day: z.boolean(),
});
export type CreateUserAction = z.infer<typeof CreateUserActionSchema>;

export const UserActionSchema = CreateUserActionSchema.extend({
    id: z.number(),
    user_id: z.string(),
    group_id: z.string(),
});
export type UserAction = z.infer<typeof UserActionSchema>;

export const BasicActionDisplay = z.object({
    name: z.string(),
    category: z.string(),
})
export const UserActionDisplaySchema = z.object({
    actions: BasicActionDisplay,
    ...UserActionSchema.shape
});
export type UserActionDisplay = z.infer<typeof UserActionDisplaySchema>;