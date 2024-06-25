"use server";

import { createThreadSchema } from "@/lib/validations/thread";

export async function createThread(prevState: any, formData: FormData) {
  try {
    const parse = createThreadSchema.parse({
      threadTitle: formData.get("threadTitle") as string,
      threadContent: formData.get("threadContent") as string,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: formData.get("createdBy") as string,
      updatedBy: formData.get("updatedBy") as string,
    });
  } catch (error) {}
}
