// ./config/schema.js
import { pgTable, varchar, boolean, integer, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  subscriptionId: varchar("subscriptionId"),
});

export const coursesTable = pgTable("courses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar("cid", { length: 255 }).notNull().unique(),
  name: varchar("name"),
  description: varchar("description"),
  noOfChapters: integer("noOfChapters").notNull(),
  includeVideo: boolean("includeVideo").default(false),
  level: varchar("level").notNull(),
  category: varchar("category"),
  courseJson: json("courseJson"),
  userEmail: varchar("userEmail")
    .notNull()
    .references(() => usersTable.email),
  bannerImageURL: varchar("bannerImageURL").default(""),
  courseContent: varchar("courseContent"),
});

export const enrollmentsTable = pgTable("enrollments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  courseId: varchar("courseId", { length: 255 })
    .notNull()
    .references(() => coursesTable.cid),
  userEmail: varchar("userEmail")
    .notNull()
    .references(() => usersTable.email),
  completedChapters: json("completedChapters"),
});

export const quizTable = pgTable("quiz", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userEmail: varchar("userEmail")
    .notNull()
    .references(() => usersTable.email),
  completedTopic: json("completedTopic"),
});