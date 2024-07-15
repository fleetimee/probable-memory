import { users } from "@/models/schema";
import * as z from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  jabatan: z.string().optional(),
  unitkerja: z.string().optional(),
});

export const getUsersSchema = searchParamsSchema;

export type GetUsersSchema = z.infer<typeof getUsersSchema>;
