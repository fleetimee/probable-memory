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
import { fThreadParticipants, fThreads, users } from "@/models/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { auth } from "../../../../auth";
import { DashboardContent } from "@/components/reuseable/dashboard/DashboardContent";

async function fetchUserThreads(userId: string) {
  const threads = await db
    .select({
      threadId: fThreads.threadId,
      title: fThreads.threadTitle,
      content: fThreads.threadContent,
      createdAt: fThreads.createdAt,
      updatedAt: fThreads.updatedAt,
      createdBy: users.name,
      createdByProfilePicture: users.profilePicture,
    })
    .from(fThreadParticipants)
    .where(eq(fThreadParticipants.userId, userId))
    .innerJoin(fThreads, eq(fThreads.threadId, fThreadParticipants.threadId))
    .innerJoin(users, eq(users.uuid, fThreads.createdBy));

  return threads;
}

export default async function DashboardPage() {
  const session = await auth();

  const userThread = await fetchUserThreads(session?.user.uuid!);

  console.log(userThread);

  console.log(session);

  return (
    <ContentLayout title="Dashboard">
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
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <DashboardContent />
    </ContentLayout>
  );
}
