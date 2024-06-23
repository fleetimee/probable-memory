import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import db from "@/database/connect";
import { fPosts, fThreadParticipants, fThreads, users } from "@/models/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Megaphone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardContentPopulated } from "@/components/reuseable/dashboard/DashboardContent";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function fetchOneThread(idThread: string) {
  const [thread] = await db
    .select()
    .from(fThreads)
    .where(eq(fThreads.threadId, idThread));

  return thread;
}

async function fetchPosts(idThread: string) {
  const posts = await db
    .select()
    .from(fPosts)
    .where(eq(fPosts.threadId, idThread));
}

async function fetchOneUserName(userId: string) {
  const [user] = await db
    .select({
      name: users.name,
    })
    .from(users)
    .where(eq(users.uuid, userId));

  return user;
}

async function fetchThreadParticipants(threadId: string) {
  const participants = await db
    .select({
      name: users.name,
      profilePicture: users.profilePicture,
    })
    .from(fThreadParticipants)
    .where(eq(fThreadParticipants.threadId, threadId))
    .innerJoin(users, eq(users.uuid, fThreadParticipants.userId));

  return participants;
}

interface ForumGetOnePageProps {
  params: {
    idThread: string;
  };
}

export async function generateMetadata({
  params: { idThread },
}: ForumGetOnePageProps) {
  const thread = await fetchOneThread(idThread);

  return {
    title: thread.threadTitle,
    description: thread.threadContent,
  };
}

export default async function ForumGetOnePage({
  params: { idThread },
}: ForumGetOnePageProps) {
  const [thread, posts, participants] = await Promise.all([
    fetchOneThread(idThread),
    fetchPosts(idThread),
    fetchThreadParticipants(idThread),
  ]);

  const threadStarter = await fetchOneUserName(thread.createdBy);

  if (!thread) {
    return (
      <div>
        <h1>Thread not found</h1>
      </div>
    );
  }

  return (
    <ContentLayout title={thread.threadTitle}>
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
              <Link href="/dashboard">Forum</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/${idThread}`}>
                  {thread.threadTitle}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Sheet>
        <SheetTrigger asChild>
          <Alert className="my-4">
            <Megaphone className="h-4 w-4" />
            <AlertTitle>Thread Starter</AlertTitle>
            <AlertDescription>
              <span className="text-blue-500 font-bold">
                {threadStarter.name}
              </span>{" "}
              started this thread on
            </AlertDescription>
          </Alert>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detail</SheetTitle>
            <SheetDescription>Detail thread information</SheetDescription>
          </SheetHeader>

          <Separator className="my-2" />

          <div className="py-4 font-semibold flex flex-col space-y-4">
            <h1 className="text-lg font-semibold text-foreground">
              Participant
            </h1>

            <div className="flex flex-col space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.name}
                  className="flex flex-row items-center space-x-2"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://pbs.twimg.com/profile_images/1804384604897652736/eHQ7nueI_400x400.jpg"
                      alt="User Avatar"
                    />
                    <AvatarFallback />
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {participant.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6 flex flex-col">
          <DashboardContentPopulated
            content={thread.threadContent}
            title={thread.threadTitle}
            key={thread.threadId}
            url={`/dashboard/${thread.threadId}`}
            {...thread}
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
