import { z } from "zod";

export const creatIssueSchema = z.object({
    title: z.string().min(2,'Title is required').max(255),
    description: z.string().min(1,"Description is required")
});
