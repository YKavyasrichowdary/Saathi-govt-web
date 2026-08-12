import * as cheerio from "cheerio";

async function diagnoseSkips() {
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

  const totalCards = $(".card.internship-item").length;
  console.log(`Total .card.internship-item elements: ${totalCards}`);

  const skipReasons: Record<string, number> = {
    missingTitle: 0,
    missingOrg: 0,
    missingDetailsLink: 0,
    missingUid: 0,
    valid: 0,
  };

  const AICTE_URL = "https://internship.aicte-india.org/internships.php?future=intern";

  $(".card.internship-item").each((_, element) => {
    const card = $(element);

    const title = card.find(".job-title").first().text().trim();
    const organization = card.find(".company-name").first().text().trim();
    const detailsLink = card.find(".btn-wrap a").first().attr("href") ?? "";

    if (!title) {
      skipReasons.missingTitle++;
      return;
    }
    if (!organization) {
      skipReasons.missingOrg++;
      return;
    }
    if (!detailsLink) {
      skipReasons.missingDetailsLink++;
      return;
    }

    try {
      const absoluteDetailsUrl = new URL(detailsLink, AICTE_URL).toString();
      const detailsUrl = new URL(absoluteDetailsUrl);
      const uid = detailsUrl.searchParams.get("uid");

      if (!uid) {
        skipReasons.missingUid++;
        return;
      }

      skipReasons.valid++;
    } catch {
      skipReasons.missingUid++;
    }
  });

  console.log("\nSkip Reasons Breakdown:");
  console.log(skipReasons);
}

diagnoseSkips();
