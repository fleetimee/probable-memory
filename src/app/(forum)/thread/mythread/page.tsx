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
import { fThreads, users } from "@/models/schema";
import { eq } from "drizzle-orm";
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
    .innerJoin(users, eq(users.uuid, fThreads.createdBy));

  return createdThreads;
}

export default async function MyThreadPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userCreatedThread = await fetchUserCreatedThreads(session?.user.uuid);

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
