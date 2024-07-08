import "server only";
import { GetUsersSchema } from "./schema";
import { users, type Users } from "@/models/schema";
import { and, asc, count, desc, or, SQL } from "drizzle-orm";
import { filterColumn } from "./filter-column";
import { DrizzleWhere } from "@/types";
import db from "@/database/connect";

export async function getUsers(input: GetUsersSchema) {
  const { page, per_page, sort, title, status, from, to } = input;

  try {
    const offset = (page - 1) * per_page;

    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof Users | undefined, "asc" | "desc" | undefined];

    const expression: (SQL<unknown> | undefined)[] = [
      title ? filterColumn({ column: users.name, value: title }) : undefined,
      !!status
        ? filterColumn({
            column: users.lastLogin,
            value: status,
            isSelectable: true,
          })
        : undefined,
    ];

    const where: DrizzleWhere<Users> =
      !status || status === "and" ? and(...expression) : or(...expression);

    const { data, total } = await db.transaction(async (trx) => {
      const data = await trx
        .select()
        .from(users)
        .limit(per_page)
        .offset(offset)
        .where(where)
        .orderBy(
          column && column in users
            ? order === "asc"
              ? asc(users[column])
              : desc(users[column])
            : desc(users.uuid)
        );

      const total = await trx
        .select({
          count: count(),
        })
        .from(users)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return { data, total };
    });

    const pageCount = Math.ceil(total / per_page);
    return { data, pageCount };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}
