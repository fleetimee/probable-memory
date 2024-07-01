"use server";

import db from "@/database/connect";
import { createThreadSchema } from "@/lib/validations/thread";
import { fThreads } from "@/models/schema";
import { revalidatePath } from "next/cache";

export async function createThread(
  prevState: any,
  formData: FormData
): Promise<ActionState | void> {
  const parse = createThreadSchema.safeParse({
    threadTitle: formData.get("threadTitle") as string,
    threadContent: formData.get("threadContent") as string,
    createdAt: new Date(formData.get("createdAt") as string),
    updatedAt: new Date(formData.get("updatedAt") as string),
    createdBy: formData.get("createdBy") as string,
    updatedBy: formData.get("updatedBy") as string,
  });

  if (!parse.success) {
    const { fieldErrors } = parse.error.flatten();

    return {
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  try {
    await db.insert(fThreads).values({
      threadTitle: parse.data.threadTitle,
      threadContent: parse.data.threadContent,
      createdAt: parse.data.createdAt,
      updatedAt: parse.data.updatedAt,
      createdBy: parse.data.createdBy,
      updatedBy: parse.data.updatedBy,
    });

    revalidatePath("/dashboard");
    revalidatePath("/thread/mythread");

    return {
      code: "SUCCESS",
      message: "Thread created successfully.",
    };
  } catch (error) {
    return {
      code: "INTERNAL_ERROR",
      err: error,
    };
  }
}
