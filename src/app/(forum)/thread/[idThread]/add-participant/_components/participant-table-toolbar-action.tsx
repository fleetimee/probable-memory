"use client";

import { type Table } from "@tanstack/react-table";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { Button } from "@/components/ui/button";

type JoinedUsers = Users & StrukturOrganisasi;

interface ParticipantTableToolbarActionsProps {
  table: Table<JoinedUsers>;
}

export function ParticipantTableToolbarActions({
  table,
}: ParticipantTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <Button variant="outline" size="sm">
          Invite ({table.getFilteredSelectedRowModel().rows.length})
        </Button>
      ) : null}

      <Button variant="outline" size="sm">
        Button
      </Button>
    </div>
  );
}
