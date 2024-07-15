"use client";

import React, { createContext } from "react";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ParticipantTables } from "./participant-table";
import { ParticipantStaging } from "./pariticipant-staging";
import { getUsers } from "@/lib/queries";
import { type Users, type StrukturOrganisasi } from "@/models/schema";

interface ParticipantContextType {
  participant: JoinedUsers[];
  setParticipant: React.Dispatch<React.SetStateAction<JoinedUsers[]>>;
}

// Create the context with the new type
export const ParticipantContext = createContext<
  ParticipantContextType | undefined
>(undefined);

type JoinedUsers = Users & StrukturOrganisasi;

interface ParticipantContentProps {
  participantPromise: ReturnType<typeof getUsers>;
}

export function ParticipantContent({
  participantPromise,
}: ParticipantContentProps) {
  const [participant, setParticipant] = React.useState<JoinedUsers[]>([]);

  console.log(participant);

  return (
    <ParticipantContext.Provider value={{ participant, setParticipant }}>
      <Card className="p-4 my-4 flex flex-col gap-2">
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

      <Card className="p-4 my-4 flex flex-col gap-2">
        <CardHeader>
          <CardTitle>Peserta Forum</CardTitle>
          <CardDescription>
            Menampilkan daftar peserta forum yang dipilih
          </CardDescription>
        </CardHeader>

        <ParticipantStaging />
      </Card>
    </ParticipantContext.Provider>
  );
}
