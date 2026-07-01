import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env["DATABASE_URL"];
if(!databaseUrl) {
  throw new Error("Database URL nao esta definida. Por favor, defina a variavel de ambiente DATABASE_URL no arquivo .env");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
