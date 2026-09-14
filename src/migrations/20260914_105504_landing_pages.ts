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

  const paragraph = (text: string) => ({
    children: [
      { detail: 0, format: 0, mode: 'normal' as const, style: '', text, type: 'text', version: 1 },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'paragraph',
    version: 1,
  })
  const heading = (text: string) => ({ ...paragraph(text), tag: 'h2' as const, type: 'heading' })
  const content = (
    ...children: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>>
  ) => ({
    root: {
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'root',
      version: 1,
    },
  })

  const home = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: '/' } },
    req,
  })
  if (home.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        slug: '/',
        title: 'Turn momentum into meaningful growth.',
        content: content(
          heading('One clear place to move ambitious work forward.'),
          paragraph(
            'Northstar brings strategy, signals, and execution into focus—so your team spends less time chasing updates and more time building what matters.',
          ),
          heading('Clarity at every altitude.'),
          paragraph(
            'See the story behind the numbers, align every decision to an outcome, and give each team the context to act with confidence.',
          ),
          heading('Designed for momentum.'),
          paragraph(
            'A calm workspace, fast feedback loops, and a shared view of progress help great ideas travel from first signal to measurable impact.',
          ),
        ),
      },
      req,
    })
  }

  const features = await payload.find({
    collection: 'pages',
    limit: 1,
    where: { slug: { equals: 'features' } },
    req,
  })
  if (features.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        slug: 'features',
        title: 'Everything your best work needs.',
        content: content(
          heading('From signal to decision, without the noise.'),
          paragraph(
            'Bring plans, customer insight, and live progress together in a system that stays useful as your company grows.',
          ),
          heading('A shared operating rhythm.'),
          paragraph(
            'Shape priorities, make ownership visible, and keep decisions connected to the customer outcomes that inspired them.',
          ),
          heading('Built to feel effortless.'),
          paragraph(
            'Thoughtful defaults keep the surface simple while flexible workflows give every team room to work in its own way.',
          ),
        ),
      },
      req,
    })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_slug_idx";
  ALTER TABLE "pages" DROP COLUMN "slug";`)
}
