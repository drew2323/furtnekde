import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  ALTER TABLE "pages_blocks_text" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_text" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "page_type" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_text" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_text" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug" DROP NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" DROP NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_title" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "_pages_v" ADD COLUMN "version__status" "enum__pages_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_pages_v" ADD COLUMN "latest" boolean;
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages__status_idx";
  DROP INDEX "_pages_v_version_version__status_idx";
  DROP INDEX "_pages_v_latest_idx";
  UPDATE "pages_blocks_text" SET "heading" = 'Sekce bez nadpisu' WHERE "heading" IS NULL;
  UPDATE "pages_blocks_text" SET "content" = '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb WHERE "content" IS NULL;
  UPDATE "pages_blocks_cta" SET "heading" = 'Výzva k akci' WHERE "heading" IS NULL;
  UPDATE "pages_blocks_cta" SET "text" = '' WHERE "text" IS NULL;
  UPDATE "pages_blocks_cta" SET "label" = 'Pokračovat' WHERE "label" IS NULL;
  UPDATE "pages_blocks_cta" SET "href" = '#' WHERE "href" IS NULL;
  UPDATE "pages_blocks_faq_items" SET "question" = 'Otázka bez názvu' WHERE "question" IS NULL;
  UPDATE "pages_blocks_faq_items" SET "answer" = '' WHERE "answer" IS NULL;
  WITH "missing_slugs" AS (
    SELECT "page"."id", "candidate"."slug"
    FROM "pages" AS "page"
    CROSS JOIN LATERAL (
      SELECT CASE WHEN "suffix" = 0 THEN 'rollback-page-' || "page"."id"::text ELSE 'rollback-page-' || "page"."id"::text || '-' || "suffix"::text END AS "slug"
      FROM generate_series(0, 1000000) AS "suffix"
      WHERE NOT EXISTS (
        SELECT 1 FROM "pages" AS "existing"
        WHERE "existing"."slug" = CASE WHEN "suffix" = 0 THEN 'rollback-page-' || "page"."id"::text ELSE 'rollback-page-' || "page"."id"::text || '-' || "suffix"::text END
      )
      ORDER BY "suffix"
      LIMIT 1
    ) AS "candidate"
    WHERE "page"."slug" IS NULL
  )
  UPDATE "pages" SET "slug" = "missing_slugs"."slug" FROM "missing_slugs" WHERE "pages"."id" = "missing_slugs"."id";
  UPDATE "pages" SET "page_type" = 'standard' WHERE "page_type" IS NULL;
  UPDATE "pages" SET "title" = 'Stránka bez názvu ' || "id"::text WHERE "title" IS NULL;
  UPDATE "_pages_v_blocks_text" SET "heading" = 'Sekce bez nadpisu' WHERE "heading" IS NULL;
  UPDATE "_pages_v_blocks_text" SET "content" = '{"root":{"children":[],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb WHERE "content" IS NULL;
  UPDATE "_pages_v_blocks_cta" SET "heading" = 'Výzva k akci' WHERE "heading" IS NULL;
  UPDATE "_pages_v_blocks_cta" SET "text" = '' WHERE "text" IS NULL;
  UPDATE "_pages_v_blocks_cta" SET "label" = 'Pokračovat' WHERE "label" IS NULL;
  UPDATE "_pages_v_blocks_cta" SET "href" = '#' WHERE "href" IS NULL;
  UPDATE "_pages_v_blocks_faq_items" SET "question" = 'Otázka bez názvu' WHERE "question" IS NULL;
  UPDATE "_pages_v_blocks_faq_items" SET "answer" = '' WHERE "answer" IS NULL;
  UPDATE "_pages_v" SET "version_slug" = 'rollback-version-' || "id"::text WHERE "version_slug" IS NULL;
  UPDATE "_pages_v" SET "version_page_type" = 'standard' WHERE "version_page_type" IS NULL;
  UPDATE "_pages_v" SET "version_title" = 'Verze bez názvu ' || "id"::text WHERE "version_title" IS NULL;
  ALTER TABLE "pages_blocks_text" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_text" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "page_type" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_text" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_text" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_slug" SET NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_page_type" SET NOT NULL;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_title" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "_status";
  ALTER TABLE "_pages_v" DROP COLUMN "version__status";
  ALTER TABLE "_pages_v" DROP COLUMN "latest";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
