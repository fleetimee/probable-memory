import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { type ColumnDef } from "@tanstack/react-table";

type JoinedUsers = Users & StrukturOrganisasi;

export function getColumns(): ColumnDef<JoinedUsers>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "kdKantor",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Kode Kantor" />
      ),
    },
    {
      accessorKey: "jabatan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jabatan" />
      ),
    },
    {
      accessorKey: "unitkerja",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Unit" />
      ),
    },
  ];
}
