import { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default {
  schema: "./lib/db/schema/*",
  driver: "pg",
  out: "./lib/db/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
