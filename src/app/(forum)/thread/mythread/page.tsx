import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import db from "@/database/connect";
import { fTags, fThreads, fThreadTags, users } from "@/models/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import {
  DashboardContent,
  DashboardContentPopulated,
} from "@/components/reuseable/dashboard/DashboardContent";
import { Card, CardContent } from "@/components/ui/card";

async function fetchUserCreatedThreads(userId: string) {
  const createdThreads = await db
    .select({
      threadId: fThreads.threadId,
      title: fThreads.threadTitle,
      content: fThreads.threadContent,
      createdAt: fThreads.createdAt,
      updatedAt: fThreads.updatedAt,
      createdBy: users.name,
      createdByProfilePicture: users.profilePicture,
    })
    .from(fThreads)
    .where(eq(fThreads.createdBy, userId))
    .innerJoin(users, eq(users.uuid, fThreads.createdBy))
    .orderBy(desc(fThreads.createdAt));

  return createdThreads;
}

async function fetchThreadTags(threadId: string) {
  const threadTags = await db
    .select({
      tagName: fTags.tagName,
    })
    .from(fTags)
    .innerJoin(fThreadTags, eq(fTags.tagId, fThreadTags.tagId)) // Join fThreadTags with fTags
    .where(eq(fThreadTags.threadId, threadId)); // Apply the threadId condition

  return threadTags.map((tag) => tag.tagName);
}

export default async function MyThreadPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userCreatedThread = await fetchUserCreatedThreads(session?.user.uuid);

  const threadsWithTags = await Promise.all(
    userCreatedThread.map(async (thread) => {
      const tags = await fetchThreadTags(thread.threadId);
      return {
        ...thread,
        tags,
      };
    })
  );

  return (
    <ContentLayout title="My Threads">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Thread</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <BreadcrumbLink asChild>
                <Link href="/thread/create">My Thread</Link>
              </BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {userCreatedThread.length === 0 ? (
        <DashboardContent />
      ) : (
        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6 flex flex-col">
            {userCreatedThread.map((thread) => (
              <div className=" py-4" key={thread.threadId}>
                <DashboardContentPopulated
                  key={thread.threadId}
                  url={`/thread/${thread.threadId}`}
                  tags={
                    threadsWithTags.find((t) => t.threadId === thread.threadId)
                      ?.tags ?? []
                  }
                  {...thread}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </ContentLayout>
  );
}
