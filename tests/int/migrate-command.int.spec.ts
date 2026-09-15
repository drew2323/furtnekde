import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('production migration runner', () => {
  it('passes migrate as the Payload command instead of after an option separator', async () => {
    const source = await readFile(path.join(process.cwd(), 'scripts/migrate.mjs'), 'utf8')

    expect(source).toContain("spawn('corepack', ['pnpm', 'run', 'payload', 'migrate']")
    expect(source).not.toContain("['pnpm', 'run', 'payload', '--', 'migrate']")
  })
})
