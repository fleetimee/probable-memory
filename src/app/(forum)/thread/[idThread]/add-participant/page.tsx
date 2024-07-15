import { Metadata } from "next";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
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
import React from "react";
import { SearchParams } from "@/types";
import { searchParamsSchema } from "@/lib/schema";
import { getUsers } from "@/lib/queries";
import { ParticipantContent } from "./_components/participant-content";

export const metadata: Metadata = {
  title: "Add Participant",
  description: "Add Participant to Thread",
};

interface AddThreadParticipantPageProps {
  params: {
    idThread: string;
  };
  searchParams: SearchParams;
}

export default function AddThreadParticipantPage({
  params,
  searchParams,
}: AddThreadParticipantPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  const participantPromise = getUsers(search);

  const session = auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <ContentLayout title="Add Participant">
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
                <Link href={`/dashboard/${params.idThread}`}>
                  Tambah Partisipan
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <ParticipantContent participantPromise={participantPromise} />
    </ContentLayout>
  );
}
