import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages" ADD COLUMN "slug" varchar;
  WITH ranked_pages AS (
    SELECT "id", row_number() OVER (ORDER BY "created_at", "id") AS position
    FROM "pages"
  )
  UPDATE "pages"
  SET "slug" = CASE WHEN ranked_pages.position = 1 THEN '/' ELSE 'page-' || "pages"."id" END
  FROM ranked_pages
  WHERE "pages"."id" = ranked_pages."id";
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_slug_idx";
  ALTER TABLE "pages" DROP COLUMN "slug";`)
}
