import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  description: text("description"),
  userId: text("user_id"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  subCategoryId: text("sub_category_id"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  userId: text("user_id"),
});

export const subCategories = pgTable("sub_categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  categoryId: text("category_id"),
  userId: text("user_id"),
});

export const recordCategories = pgTable("record_categories", {
  id: serial("id").primaryKey(),
  recordId: integer("record_id"),
  categoryId: text("category_id"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  userId: text("user_id"),
});

export const recordRelations = relations(records, ({ many, one }) => ({
  categories: many(categories),
  subCategories: one(subCategories),
}));

export const categoryRelations = relations(categories, ({ many, one }) => ({
  records: many(records),
  subCategories: many(subCategories),
}));

export const subCategoryRelations = relations(subCategories, ({ one }) => ({
  categories: one(categories),
  records: one(records),
}));
