import { parseAICTEInternships } from "../lib/opportunities/sources/aicte-internships";

async function testFullParse() {
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

  console.log("HTML length:", html.length);

  const opportunities = parseAICTEInternships(html);

  console.log("Found count (parseAICTEInternships):", opportunities.length);
}

testFullParse();
