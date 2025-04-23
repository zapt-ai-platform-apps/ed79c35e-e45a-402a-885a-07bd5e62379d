import { pgTable, serial, text, timestamp, integer, uuid, boolean } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  industry: text('industry'),
  website: text('website'),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  userId: uuid('user_id').notNull(), // User who added the company
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id').notNull(),
  userId: uuid('user_id').notNull(),
  paymentTime: integer('payment_time').notNull(), // Days to pay
  rating: integer('rating').notNull(), // 1-5 stars
  comment: text('comment'),
  amount: integer('amount'), // Optional invoice amount
  anonymous: boolean('anonymous').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});