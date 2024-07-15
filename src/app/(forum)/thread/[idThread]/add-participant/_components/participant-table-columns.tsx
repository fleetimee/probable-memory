import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { type Users, type StrukturOrganisasi } from "@/models/schema";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { generateFromString } from "generate-avatar";
import { NEXT_PUBLIC_BASE_URL } from "@/config/env-mapper";

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
      id: "avatar",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="relative size-20 overflow-hidden rounded-full bg-white">
            <Image
              src={
                user.profilePicture
                  ? `${NEXT_PUBLIC_BASE_URL}${user.profilePicture}`
                  : `data:image/svg+xml;utf8,${generateFromString(
                      user.name || "novian"
                    )}`
              }
              alt="User name"
              width={200}
              height={200}
            />
          </div>
        );
      },
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
