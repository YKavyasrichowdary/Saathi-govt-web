import fs from "fs";
import * as cheerio from "cheerio";

async function inspect() {
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

  console.log("=== DEEP PAGINATION / SEARCH DIAGNOSTIC ===");
  console.log(`HTML Length: ${html.length}`);

  // Forms
  const forms: string[] = [];
  $("form").each((i, el) => {
    forms.push(`Form #${i + 1}: action="${$(el).attr("action")}" method="${$(el).attr("method")}" id="${$(el).attr("id")}"`);
  });
  console.log("\nForms found:", forms);

  // Pagination or Next/Prev links
  const links: string[] = [];
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    const text = $(el).text().trim();
    if (href && (href.includes("page") || href.includes("php?") || href.includes("start") || href.includes("limit"))) {
      links.push(`href: "${href}" | text: "${text}"`);
    }
  });
  console.log("\nMatching <a> tags:", links.slice(0, 20));

  // Count card elements
  const cards = $(".card.internship-item").length;
  console.log(`\nFound count (.card.internship-item): ${cards}`);
}

inspect();
