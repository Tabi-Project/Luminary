import { ilike, SQL, or, eq } from "drizzle-orm";
import { NominationFilters } from "../types/filters.type.js";
import { createError } from "./AppError.js";
import {
  Nomination,
  nominations,
  Nominator,
  nominators,
  Nominee,
  nominees,
} from "../db/schema.js";
import { db } from "../db/index.js";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const assertNominationId = (id: string): void => {
  if (!UUID_REGEX.test(id)) {
    throw createError("Nomination not found", 404);
  }
};

export const nomineeFilters = ({
  search,
  country,
}: NominationFilters): SQL[] => {
  const conditions: SQL[] = [];

  if (search) {
    const condition = or(
      ilike(nominees.first_name, `%${search}%`),
      ilike(nominees.last_name, `%${search}%`),
    );
    if (condition) {
      conditions.push(condition);
    }
  }

  if (country) {
    conditions.push(ilike(nominees.country, `%${country}%`));
  }

  return conditions;
};

export const selectWithRelations = (where: SQL | undefined) =>
  db
    .select({
      nomination: nominations,
      nominee: nominees,
      nominator: nominators,
    })
    .from(nominations)
    .innerJoin(nominees, eq(nominations.nominee_id, nominees.id))
    .leftJoin(nominators, eq(nominations.nominator_id, nominators.id))
    .where(where);

export type NominationWithRelations = Nomination & {
  nominee: Nominee;
  nominator: Nominator | null;
};

export const toNominationWithRelations = (row: {
  nomination: Nomination;
  nominee: Nominee;
  nominator: Nominator | null;
}): NominationWithRelations => ({
  ...row.nomination,
  nominee: row.nominee,
  nominator: row.nominator,
});
