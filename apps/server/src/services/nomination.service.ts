import { and, asc, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "../db/index.js";
import {
  nominations,
  nominators,
  nominees,
  type Nomination,
  type Nominator,
  type Nominee,
} from "../db/schema.js";
import {
  NominationStatus,
  type NominationStatusValue,
} from "../lib/nominations.js";
import { createError, rethrowAsAppError } from "../utils/AppError.js";
import {
  NominationPayload,
  UpdateNominationPayload,
} from "../types/payloads.type.js";
import {
  AdminNominationFilters,
  NominationFilters,
} from "../types/filters.type.js";
import {
  assertNominationId,
  NominationWithRelations,
  nomineeFilters,
  selectWithRelations,
  toNominationWithRelations,
} from "../utils/nomination.js";

export const create = async (nominationData: NominationPayload) => {
  try {
    if (
      !nominationData.nominee_first_name ||
      !nominationData.nominee_last_name ||
      !nominationData.nominee_email
    ) {
      throw createError(
        "nominee_first_name, nominee_last_name and nominee_email are required.",
        400,
      );
    }

    if (
      !nominationData.is_self_submission &&
      (!nominationData.nominator_first_name ||
        !nominationData.nominator_last_name ||
        !nominationData.nominator_email)
    ) {
      throw createError(
        "nominator_first_name, nominator_last_name and nominator_email are required for nominations on behalf of someone else.",
        400,
      );
    }

    return await db.transaction(async (tx) => {
      let nominatorId: string | null = null;

      if (!nominationData.is_self_submission) {
        const [nominator] = await tx
          .insert(nominators)
          .values({
            first_name: nominationData.nominator_first_name!,
            last_name: nominationData.nominator_last_name!,
            email: nominationData.nominator_email!,
            relationship_to_nominee: nominationData.relationship_to_nominee,
          })
          .returning({ id: nominators.id });

        nominatorId = nominator.id;
      }

      const [nominee] = await tx
        .insert(nominees)
        .values({
          first_name: nominationData.nominee_first_name!,
          last_name: nominationData.nominee_last_name!,
          email: nominationData.nominee_email!,
          country: nominationData.nominee_country,
          field: nominationData.nominee_field,
          organization: nominationData.nominee_organization,
          profile_image_url: nominationData.nominee_profile_image_url,
        })
        .returning();

      const [nomination] = await tx
        .insert(nominations)
        .values({
          nominee_id: nominee.id,
          nominator_id: nominatorId,
          status: NominationStatus.PENDING,
          description: nominationData.description,
          evidence_urls: nominationData.evidence_urls,
          supporting_urls: nominationData.supporting_urls,
          is_self_submission: nominationData.is_self_submission ?? false,
        })
        .returning();

      return { ...nomination, nominee };
    });
  } catch (error) {
    return rethrowAsAppError(error, "createNomination");
  }
};

export const update = async (
  nominationData: UpdateNominationPayload,
  nominationId: string,
) => {
  try {
    assertNominationId(nominationId);

    const { nominee: nomineeUpdates, ...nominationUpdates } = nominationData;

    return await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({ nominee_id: nominations.nominee_id })
        .from(nominations)
        .where(eq(nominations.id, nominationId))
        .limit(1);

      if (!existing) {
        throw createError("Nomination not found", 404);
      }

      const nomineeSet: Partial<Nominee> = {};
      if (nomineeUpdates) {
        for (const key of [
          "first_name",
          "last_name",
          "email",
          "country",
          "field",
          "organization",
          "profile_image_url",
        ] as const) {
          if (nomineeUpdates[key] !== undefined) {
            (nomineeSet as Record<string, unknown>)[key] = nomineeUpdates[key];
          }
        }
      }

      if (Object.keys(nomineeSet).length > 0) {
        await tx
          .update(nominees)
          .set(nomineeSet)
          .where(eq(nominees.id, existing.nominee_id));
      }

      const nominationSet: Partial<Nomination> = {};
      if (nominationUpdates.status !== undefined) {
        nominationSet.status = nominationUpdates.status;
      }
      if (nominationUpdates.description !== undefined) {
        nominationSet.description = nominationUpdates.description;
      }
      if (nominationUpdates.evidence_urls !== undefined) {
        nominationSet.evidence_urls = nominationUpdates.evidence_urls;
      }
      if (nominationUpdates.supporting_urls !== undefined) {
        nominationSet.supporting_urls = nominationUpdates.supporting_urls;
      }
      if (nominationUpdates.is_self_submission !== undefined) {
        nominationSet.is_self_submission = nominationUpdates.is_self_submission;
      }

      if (Object.keys(nominationSet).length > 0) {
        await tx
          .update(nominations)
          .set(nominationSet)
          .where(eq(nominations.id, nominationId));
      }

      const [row] = await tx
        .select({ nomination: nominations, nominee: nominees })
        .from(nominations)
        .innerJoin(nominees, eq(nominations.nominee_id, nominees.id))
        .where(eq(nominations.id, nominationId))
        .limit(1);

      return { ...row.nomination, nominee: row.nominee };
    });
  } catch (error) {
    return rethrowAsAppError(error, "updateNomination");
  }
};

export const getById = async (id: string) => {
  try {
    assertNominationId(id);

    const nomination = await db.query.nominations.findFirst({
      where: eq(nominations.id, id),
      with: {
        nominee: true,
        nominator: true,
      },
    });

    if (!nomination) {
      throw createError("Nomination not found", 404);
    }

    const { nominator_id, nominee_id, ...nominationData } = nomination;

    return nominationData;
  } catch (error) {
    return rethrowAsAppError(error, "getNominationById");
  }
};

export const getAll = async (
  filters: NominationFilters = {},
): Promise<NominationWithRelations[]> => {
  try {
    const conditions: SQL[] = [
      eq(nominations.status, NominationStatus.APPROVED),
      ...nomineeFilters(filters),
    ];

    const rows = await selectWithRelations(and(...conditions));

    return rows.map(toNominationWithRelations);
  } catch (error) {
    return rethrowAsAppError(error, "getNominations");
  }
};

export const adminGetAll = async ({
  search,
  country,
  page = 1,
  limit = 20,
  sort_by = "created_at",
  sort_order = "desc",
}: AdminNominationFilters = {}) => {
  try {
    const conditions = nomineeFilters({ search, country });
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const direction = sort_order === "asc" ? asc : desc;
    const orderBy =
      sort_by === "nominee_name"
        ? direction(nominees.first_name)
        : direction(nominations.created_at);

    const [rows, [{ total }]] = await Promise.all([
      selectWithRelations(where)
        .orderBy(orderBy)
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ total: count() })
        .from(nominations)
        .innerJoin(nominees, eq(nominations.nominee_id, nominees.id))
        .where(where),
    ]);

    return { nominations: rows.map(toNominationWithRelations), total };
  } catch (error) {
    return rethrowAsAppError(error, "adminGetAll");
  }
};

const setStatus = async (
  nominationId: string,
  status: NominationStatusValue,
): Promise<Nomination> => {
  assertNominationId(nominationId);

  const [updated] = await db
    .update(nominations)
    .set({ status })
    .where(eq(nominations.id, nominationId))
    .returning();

  if (!updated) {
    throw createError("Nomination not found", 404);
  }

  return updated;
};

export const rejectNomination = async (nominationId: string) => {
  try {
    return await setStatus(nominationId, NominationStatus.REJECTED);
  } catch (error) {
    return rethrowAsAppError(error, "rejectNomination");
  }
};

export const suspendNomination = async (nominationId: string) => {
  try {
    return await setStatus(nominationId, NominationStatus.SUSPENDED);
  } catch (error) {
    return rethrowAsAppError(error, "suspendNomination");
  }
};

export const approveNomination = async (nominationId: string) => {
  try {
    await setStatus(nominationId, NominationStatus.APPROVED);

    return await getById(nominationId);
  } catch (error) {
    return rethrowAsAppError(error, "approveNomination");
  }
};
