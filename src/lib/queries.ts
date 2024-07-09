"server only";

import { GetUsersSchema } from "./schema";
import {
  strukturOrganisasi,
  users,
  type Users,
  type StrukturOrganisasi,
} from "@/models/schema";
import { and, asc, count, desc, eq, or, SQL } from "drizzle-orm";
import { filterColumn } from "./filter-column";
import { DrizzleWhere } from "@/types";
import db from "@/database/connect";

type JoinedUsers = Users & StrukturOrganisasi;

export async function getUsers(input: GetUsersSchema) {
  const { page, per_page, sort, name, status, from, to, jabatan } = input;

  try {
    const offset = (page - 1) * per_page;

    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof Users | undefined, "asc" | "desc" | undefined];

    const expression: (SQL<unknown> | undefined)[] = [
      name ? filterColumn({ column: users.name, value: name }) : undefined,
      !!status
        ? filterColumn({
            column: users.lastLogin,
            value: status,
            isSelectable: true,
          })
        : undefined,
      !!jabatan
        ? filterColumn({
            column: strukturOrganisasi.jabatan,
            value: jabatan,
            isSelectable: true,
          })
        : undefined,
    ];

    const where: DrizzleWhere<JoinedUsers> =
      !status || status === "and" ? and(...expression) : or(...expression);

    console.log(where);

    const { data, total } = await db.transaction(async (trx) => {
      const data = await trx
        .select()
        .from(users)
        .limit(per_page)
        .offset(offset)
        .where(where)
        .innerJoin(
          strukturOrganisasi,
          eq(users.email, strukturOrganisasi.email)
        )
        .orderBy(
          column && column in users
            ? order === "asc"
              ? asc(users[column])
              : desc(users[column])
            : desc(users.uuid)
        );

      // Combine users and struktur_organisasi into a single object
      const combinedData = data.map((item) => ({
        ...item.users,
        ...item.struktur_organisasi,
      }));

      // Log the query for debugging
      console.log(data);

      const total = await trx
        .select({
          count: count(),
        })
        .from(users)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return { data: combinedData, total };
    });

    const pageCount = Math.ceil(total / per_page);
    return { data, pageCount };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}
