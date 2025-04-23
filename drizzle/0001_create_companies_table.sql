CREATE TABLE IF NOT EXISTS "companies" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "industry" TEXT,
  "website" TEXT,
  "logo_url" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "user_id" UUID NOT NULL
);