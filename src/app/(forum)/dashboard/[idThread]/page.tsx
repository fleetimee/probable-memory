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
import { fPosts, fThreads } from "@/models/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Link from "next/link";

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
  const [thread, posts] = await Promise.all([
    fetchOneThread(idThread),
    fetchPosts(idThread),
  ]);

  if (!thread) {
    return (
      <div>
        <h1>Thread not found</h1>
      </div>
    );
  }

  console.log(thread);

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
        </BreadcrumbList>
      </Breadcrumb>
    </ContentLayout>
  );
}
