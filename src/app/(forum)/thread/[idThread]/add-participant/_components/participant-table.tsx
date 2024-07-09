"use client";

import { getUsers } from "@/lib/queries";
import React from "react";
import { getColumns } from "./participant-table-columns";
import { DataTableFilterField } from "@/types";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { ParticipantTableToolbarActions } from "./participant-table-toolbar-action";

interface ParticipantTableProps {
  participantPromise: ReturnType<typeof getUsers>;
}

type JoinedUsers = Users & StrukturOrganisasi;

export function ParticipantTables({
  participantPromise,
}: ParticipantTableProps) {
  const { data, pageCount } = React.use(participantPromise);

  //   const users = data.map((item) => item.users);

  console.log(data);

  const columns = React.useMemo(() => getColumns(), []);

  const filterFields: DataTableFilterField<JoinedUsers>[] = [
    {
      label: "Nama",
      value: "name",
      placeholder: "Cari nama",
    },
    {
      label: "Jabatan",
      value: "jabatan",
      placeholder: "Cari jabatan",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    filterFields,
    defaultPerPage: 10,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields}>
        <ParticipantTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
