import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { NOMINATION_STATUSES } from "../lib/nominations.js";

export const nominationStatusEnum = pgEnum(
  "nomination_status",
  NOMINATION_STATUSES,
);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const nominators = pgTable("nominator", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  relationship_to_nominee: text("relationship_to_nominee"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const nominees = pgTable("nominee", {
  id: uuid("id").primaryKey().defaultRandom(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  field: text("field"),
  organization: text("organization"),
  profile_image_url: text("profile_image_url"),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const nominations = pgTable("nominations", {
  id: uuid("id").primaryKey().defaultRandom(),
  nominee_id: uuid("nominee_id")
    .notNull()
    .references(() => nominees.id, { onDelete: "cascade" }),
  nominator_id: uuid("nominator_id").references(() => nominators.id, {
    onDelete: "set null",
  }),
  status: nominationStatusEnum("status").default("pending").notNull(),
  description: text("description"),
  evidence_urls: text("evidence_urls").array(),
  supporting_urls: text("supporting_urls").array(),
  is_self_submission: boolean("is_self_submission").default(false).notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const nominationsRelations = relations(nominations, ({ one }) => ({
  nominee: one(nominees, {
    fields: [nominations.nominee_id],
    references: [nominees.id],
  }),
  nominator: one(nominators, {
    fields: [nominations.nominator_id],
    references: [nominators.id],
  }),
}));

export const nomineesRelations = relations(nominees, ({ many }) => ({
  nominations: many(nominations),
}));

export const nominatorsRelations = relations(nominators, ({ many }) => ({
  nominations: many(nominations),
}));

export type Category = typeof categories.$inferSelect;
export type Nominator = typeof nominators.$inferSelect;
export type Nominee = typeof nominees.$inferSelect;
export type Nomination = typeof nominations.$inferSelect;
export type Admin = typeof admins.$inferSelect;
