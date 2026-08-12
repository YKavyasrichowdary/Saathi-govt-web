import {
  fetchAICTEInternships,
  parseAICTEInternships,
} from "../lib/opportunities/sources/aicte-internships";

async function runTest() {
  console.log("Fetching live AICTE internships page...");

  try {
    const response = await fetch(
      "https://internship.aicte-india.org/internships.php?future=intern",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`);
      return;
    }

    const html = await response.text();
    console.log(`HTML received. Length: ${html.length} chars.`);

    const opportunities = parseAICTEInternships(html);

    console.log(`\nFound: ${opportunities.length} internships\n`);

    const sample = opportunities.slice(0, 3);

    sample.forEach((item, index) => {
      console.log(`--- Opportunity #${index + 1} ---`);
      console.log(`Title: ${item.title}`);
      console.log(`Organization: ${item.organization}`);
      console.log(`Type: ${item.type}`);
      console.log(`Source: ${item.source}`);
      console.log(`SourceName: ${item.sourceName}`);
      console.log(`OfficialId: ${item.officialId}`);
      console.log(`RegistrationLink: ${item.registrationLink}`);
      console.log(`Mode: ${item.mode}`);
      console.log(`Location: ${item.location}`);
      console.log(`Deadline: ${item.deadline ? item.deadline.toISOString().split("T")[0] : "None"}`);
      console.log(`Description: ${item.description}\n`);
    });
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

runTest();
