import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { auth } from "../../../../../auth";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { CreateThreadForm } from "@/components/forms/create-thread-form";
import db from "@/database/connect";
import { fTags, fThreadCategories } from "@/models/schema";
import { redirect } from "next/navigation";

async function fetchCategory() {
  const categories = await db
    .select({
      categoryId: fThreadCategories.categoryId,
      categoryName: fThreadCategories.categoryName,
    })
    .from(fThreadCategories);

  return categories;
}

async function fetchTags() {
  const tags = await db
    .select({
      tagId: fTags.tagId,
      tagName: fTags.tagName,
    })
    .from(fTags);

  return tags;
}

export default async function CreateForumPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const [categories, tags] = await Promise.all([fetchCategory(), fetchTags()]);

  return (
    <ContentLayout title="Buat Thread">
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
                <Link href="/thread/create">Buat Thread</Link>
              </BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Alert className="my-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Pada saat menambahkan thread baru otomatis akan berstatus{" "}
          <span className="font-semibold text-yellow-500">PENDING</span>
        </AlertDescription>
      </Alert>

      <Card className="rounded-lg border-none mt-6">
        <CardContent className="p-6 flex flex-col">
          <CreateThreadForm categories={categories} tags={tags} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
