"use server";

import db from "@/database/connect";
import { createThreadSchema } from "@/lib/validations/thread";
import { fThreads, fThreadTags } from "@/models/schema";
import { revalidatePath } from "next/cache";

export async function createThread(
  prevState: any,
  formData: FormData
): Promise<ActionState | void> {
  console.log("Form data: ", formData);

  const parse = createThreadSchema.safeParse({
    threadTitle: formData.get("threadTitle") as string,
    threadContent: formData.get("threadContent") as string,
    createdAt: new Date(formData.get("createdAt") as string),
    updatedAt: new Date(formData.get("updatedAt") as string),
    createdBy: formData.get("createdBy") as string,
    updatedBy: formData.get("updatedBy") as string,
    categoryId: formData.get("categoryId") as string,
    tags: formData.getAll("tags"),
  });

  let arrayOfTags: string[] = [];

  // Transform tags into array of strings
  if (parse.data?.tags && parse.data.tags.length > 0) {
    arrayOfTags = parse.data.tags.flatMap((tag) => tag.split(",")); // Split each string by commas and flatten the array
  }

  if (!parse.success) {
    const { fieldErrors } = parse.error.flatten();

    return {
      code: "VALIDATION_ERROR",
      fieldErrors,
    };
  }

  try {
    const insertedThread = await db
      .insert(fThreads)
      .values({
        threadTitle: parse.data.threadTitle,
        threadContent: parse.data.threadContent,
        createdAt: parse.data.createdAt,
        updatedAt: parse.data.updatedAt,
        createdBy: parse.data.createdBy,
        updatedBy: parse.data.updatedBy,
        categoryId: parse.data.categoryId,
      })
      .returning({
        threadId: fThreads.threadId,
      });

    const newlyThreadId = insertedThread[0].threadId;

    await db.insert(fThreadTags).values(
      arrayOfTags.map((tag) => ({
        threadId: newlyThreadId,
        tagId: tag,
      }))
    );

    console.log("Newly created thread ID: ", newlyThreadId);

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
