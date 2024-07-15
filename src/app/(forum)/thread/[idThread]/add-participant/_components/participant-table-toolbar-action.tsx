"use client";

import { type Table } from "@tanstack/react-table";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { ParticipantContext } from "./participant-content";

type JoinedUsers = Users & StrukturOrganisasi;

interface ParticipantTableToolbarActionsProps {
  table: Table<JoinedUsers>;
}

export function ParticipantTableToolbarActions({
  table,
}: ParticipantTableToolbarActionsProps) {
  const context = useContext(ParticipantContext);

  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.getFilteredSelectedRowModel().rows.forEach((row) => {
              context!.setParticipant((prev) => [...prev, row.original]);
            });
          }}
        >
          Invite ({table.getFilteredSelectedRowModel().rows.length})
        </Button>
      ) : null}

      <Button variant="outline" size="sm">
        Button
      </Button>
    </div>
  );
}
