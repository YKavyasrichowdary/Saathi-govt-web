import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  try {
    delete require.cache[require.resolve("@prisma/client")];
    delete require.cache[require.resolve("@prisma/client/index.js")];
  } catch {}

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

type ExtendedGlobal = typeof globalThis & {
  prismaGlobal?: any;
};

const getPrismaClient = () => {
  const g = globalThis as ExtendedGlobal;
  if (!g.prismaGlobal || !("userActivityDay" in g.prismaGlobal)) {
    g.prismaGlobal = prismaClientSingleton();
  }
  return g.prismaGlobal;
};

// Force reset cached client during development when schema changes
if (process.env.NODE_ENV !== "production") {
  const g = globalThis as ExtendedGlobal;
  if (!g.prismaGlobal || !("userActivityDay" in g.prismaGlobal)) {
    g.prismaGlobal = prismaClientSingleton();
  }
}

const prisma = getPrismaClient();

export default prisma;
