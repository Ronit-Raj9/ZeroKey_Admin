import path from 'node:path'
import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'prisma/config'

loadEnvConfig(process.cwd())

function datasourceUrl(): string {
    // Prefer direct (5432) for migrations; fall back to DATABASE_URL for local Postgres
    return process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? ''
}

export default defineConfig({
    schema: path.join(__dirname, 'prisma', 'schema.prisma'),
    datasource: {
        url: datasourceUrl(),
    },
})
