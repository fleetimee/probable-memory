import { z } from "zod";

export const createThreadSchema = z.object({
  threadTitle: z
    .string()
    .min(5, {
      message: "Thread title must be at least 5 characters",
    })
    .max(255),
  threadContent: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string(),
});
