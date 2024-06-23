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
import {
  DashboardContent,
  DashboardContentPopulated,
} from "@/components/reuseable/dashboard/DashboardContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookMarked } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forum",
  description: "Forum page",
};

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

export default async function ForumPage() {
  const session = await auth();

  const userThread = await fetchUserThreads(session?.user.uuid!);

  return (
    <ContentLayout title="Forum">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Forum</Link>
              </BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Alert className="my-4">
        <BookMarked className="h-4 w-4" />
        <AlertTitle>Assigned!</AlertTitle>
        <AlertDescription>
          Berikut adalah daftar thread yang telah di assign kepada Anda.
        </AlertDescription>
      </Alert>

      {userThread.length === 0 ? (
        <DashboardContent />
      ) : (
        <Card className="rounded-lg border-none mt-6">
          <CardContent className="p-6 flex flex-col">
            <Button className="self-end" asChild>
              <Link href="/dashboard/create">Create Thread</Link>
            </Button>

            {userThread.map((thread) => (
              <div className=" py-4" key={thread.threadId}>
                <DashboardContentPopulated
                  key={thread.threadId}
                  url={`/dashboard/${thread.threadId}`}
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
