import 'dotenv/config'; // Loads .env vars automatically
import { defineConfig, env } from '@prisma/config'; // Note: '@prisma/config' (v7 package)
export default defineConfig({
    schema: './prisma/schema.prisma', // Path to your schema
    migrations: {
        path: './prisma/migrations', // Default migrations folder
        // seed: 'tsx ./prisma/seed.ts', // Uncomment if you have a seed script
    },
    datasource: {
        url: env('DATABASE_URL'), // Pulls from .env; required for CLI/migrate
        // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'), // Optional for migrations
    },
});
//# sourceMappingURL=prisma.config.js.map