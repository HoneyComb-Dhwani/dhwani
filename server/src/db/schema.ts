import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable({
  name: "users",
  columns: {
    id: integer({ primaryKey: true }),
    username: varchar({ unique: true }),
    password: varchar(),
  },
});