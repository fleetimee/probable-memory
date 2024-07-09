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
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import React from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ParticipantTables } from "./_components/participant-table";
import { SearchParams } from "@/types";
import { searchParamsSchema } from "@/lib/schema";
import { getUsers } from "@/lib/queries";
import { Card } from "@/components/ui/card";

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

      <Card className="p-4 my-4 flex flex-col gap-2">
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
          />
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <ParticipantTables participantPromise={participantPromise} />
        </React.Suspense>
      </Card>
    </ContentLayout>
  );
}
