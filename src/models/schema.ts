import {
  integer,
  pgTable,
  varchar,
  timestamp,
  uuid,
  boolean,
  primaryKey,
  text,
  foreignKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  uuid: uuid("uuid").default(`gen_random_uuid()`).notNull().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  username: text("username").unique(),
  email: text("email").unique(),
  password: text("password"),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  group: integer("group"),
  name: text("name"),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  phoneNumber: varchar("phone_number"),
});

export const fThreads = pgTable("f_threads", {
  threadId: varchar("thread_id", { length: 255 })
    .default(`('threads_' || uuid_generate_v4())`)
    .primaryKey(),
  threadContent: text("thread_content").notNull(),
  threadTitle: varchar("thread_title", { length: 255 }).notNull(),
  threadStatus: varchar("thread_status", { length: 255 }).default("active"),
  threadsViews: integer("threads_views").default(0),
  lastPostedAt: timestamp("last_posted_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.uuid),
  updatedBy: uuid("updated_by")
    .notNull()
    .references(() => users.uuid),
  isApproved: boolean("is_approved").default(false),
  approvedAt: timestamp("approved_at"),
  approvedBy: uuid("approved_by").references(() => users.uuid),
  categoryId: varchar("category_id", { length: 255 }).references(
    () => fThreadCategories.categoryId
  ),
});

export const fThreadParticipants = pgTable(
  "f_thread_participants",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.uuid),
    threadId: varchar("thread_id", { length: 255 })
      .notNull()
      .references(() => fThreads.threadId),
  },
  (table) => ({
    primaryKey: primaryKey({
      columns: [table.userId, table.threadId],
    }),
  })
);

export const fPosts = pgTable("f_posts", {
  postId: varchar("post_id", { length: 255 })
    .default(`('posts_' || uuid_generate_v4())`)
    .primaryKey(),
  postContent: text("post_content").notNull(),
  postStatus: varchar("post_status", { length: 255 }).default("active"),
  threadId: varchar("thread_id", { length: 255 })
    .notNull()
    .references(() => fThreads.threadId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.uuid),
  updatedBy: uuid("updated_by")
    .notNull()
    .references(() => users.uuid),
  isEdited: boolean("is_edited").default(false),
  postEditedAt: timestamp("post_edited_at"),
});

export const fNotifications = pgTable("f_notifications", {
  notificationId: varchar("notification_id", { length: 255 })
    .default(`('notifications_' || uuid_generate_v4())`)
    .primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.uuid),
  postId: varchar("post_id", { length: 255 })
    .notNull()
    .references(() => fPosts.postId),
  threadId: varchar("thread_id", { length: 255 })
    .notNull()
    .references(() => fThreads.threadId),
  notificationContent: text("notification_content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fThreadCategories = pgTable("f_thread_categories", {
  categoryId: varchar("category_id", { length: 255 })
    .default(`('categories_' || uuid_generate_v4())`)
    .primaryKey(),
  categoryName: varchar("category_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fTags = pgTable("f_tags", {
  tagId: varchar("tag_id", { length: 255 })
    .default(`('tags_' || uuid_generate_v4())`)
    .primaryKey(),
  tagName: varchar("tag_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fThreadTags = pgTable(
  "f_thread_tags",
  {
    threadId: varchar("thread_id", { length: 255 })
      .notNull()
      .references(() => fThreads.threadId),
    tagId: varchar("tag_id", { length: 255 })
      .notNull()
      .references(() => fTags.tagId),
  },
  (table) => ({
    primaryKey: primaryKey(table.threadId, table.tagId),
  })
);
