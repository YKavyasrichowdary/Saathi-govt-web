import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

const prisma = require("../lib/prisma").default;

async function testDb() {
  try {
    console.log("Testing DB connection...");
    const count = await prisma.user.count();
    console.log("User count in DB:", count);
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testDb();
