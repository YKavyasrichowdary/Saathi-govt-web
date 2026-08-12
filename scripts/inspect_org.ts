import * as cheerio from "cheerio";

async function inspectMissingOrg() {
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
  const $ = cheerio.load(html);

  let inspectedCount = 0;

  $(".card.internship-item").each((_, element) => {
    const card = $(element);
    const companyName = card.find(".company-name").first().text().trim();

    if (!companyName && inspectedCount < 5) {
      inspectedCount++;
      console.log(`\n=== CARD WITH EMPTY .company-name #${inspectedCount} ===`);
      console.log(card.html()?.slice(0, 1000));
    }
  });
}

inspectMissingOrg();
