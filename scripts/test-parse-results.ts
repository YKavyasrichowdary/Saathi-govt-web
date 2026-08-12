import { parseAICTEInternships } from "../lib/opportunities/sources/aicte-internships";

async function runReport() {
  console.log("Fetching live AICTE page...");
  const response = await fetch(
    "https://internship.aicte-india.org/internships.php?future=intern",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    }
  );

  const html = await response.text();
  console.log(`HTML Length: ${html.length} chars.`);

  const opportunities = parseAICTEInternships(html);
  console.log(`\nParsed Total Opportunities: ${opportunities.length}`);

  const withExplicitOrg = opportunities.filter(
    (o) => o.organization !== "AICTE National Internship Portal"
  );
  const withFallbackOrg = opportunities.filter(
    (o) => o.organization === "AICTE National Internship Portal"
  );

  console.log(`- Opportunities with explicit company name: ${withExplicitOrg.length}`);
  console.log(`- Opportunities with fallback organization ("AICTE National Internship Portal"): ${withFallbackOrg.length}`);

  console.log("\n--- Sample Record with Explicit Company Name ---");
  if (withExplicitOrg[0]) {
    console.log(`Title:        ${withExplicitOrg[0].title}`);
    console.log(`Organization: ${withExplicitOrg[0].organization}`);
    console.log(`OfficialId:   ${withExplicitOrg[0].officialId}`);
    console.log(`Deadline:     ${withExplicitOrg[0].deadline ? withExplicitOrg[0].deadline.toISOString().split("T")[0] : "None"}`);
    console.log(`Mode:         ${withExplicitOrg[0].mode}`);
    console.log(`Location:     ${withExplicitOrg[0].location}`);
  }

  console.log("\n--- Sample Record with Fallback Organization ---");
  if (withFallbackOrg[0]) {
    console.log(`Title:        ${withFallbackOrg[0].title}`);
    console.log(`Organization: ${withFallbackOrg[0].organization}`);
    console.log(`OfficialId:   ${withFallbackOrg[0].officialId}`);
    console.log(`Deadline:     ${withFallbackOrg[0].deadline ? withFallbackOrg[0].deadline.toISOString().split("T")[0] : "None"}`);
    console.log(`Mode:         ${withFallbackOrg[0].mode}`);
    console.log(`Location:     ${withFallbackOrg[0].location}`);
  }
}

runReport();
