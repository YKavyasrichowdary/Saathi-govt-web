import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function testRouteAuth() {
  const { POST } = await import("../app/api/internal/opportunities/sync/aicte/route");

  console.log("=== Testing Sync Route Authentication ===");

  // 1. Unauthenticated request
  const unauthRequest = new Request("http://localhost:3000/api/internal/opportunities/sync/aicte", {
    method: "POST",
    headers: {},
  });
  const unauthResponse = await POST(unauthRequest);
  console.log(`- Unauthenticated Request Status: ${unauthResponse.status} (Expected: 401)`);

  // 2. Authenticated with SYNC_SECRET
  const syncRequest = new Request("http://localhost:3000/api/internal/opportunities/sync/aicte", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.SYNC_SECRET}`,
    },
  });
  console.log("- Testing SYNC_SECRET authorization header...");
  const syncResponse = await POST(syncRequest);
  console.log(`- SYNC_SECRET Request Status: ${syncResponse.status} (Expected: 200)`);
  const syncBody = await syncResponse.json();
  console.log("SYNC_SECRET Response:", JSON.stringify(syncBody.success));

  // 3. Authenticated with CRON_SECRET
  const cronRequest = new Request("http://localhost:3000/api/internal/opportunities/sync/aicte", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  });
  console.log("- Testing CRON_SECRET authorization header...");
  const cronResponse = await POST(cronRequest);
  console.log(`- CRON_SECRET Request Status: ${cronResponse.status} (Expected: 200)`);
  const cronBody = await cronResponse.json();
  console.log("CRON_SECRET Response:", JSON.stringify(cronBody.success));
}

testRouteAuth().catch(console.error);
