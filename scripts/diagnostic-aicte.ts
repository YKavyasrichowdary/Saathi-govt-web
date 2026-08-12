import * as cheerio from "cheerio";
import { parseAICTEInternships } from "../lib/opportunities/sources/aicte-internships";

const AICTE_URL =
  "https://internship.aicte-india.org/internships.php?future=intern";

async function runDiagnostic() {
  console.log("Fetching live AICTE page for diagnostic...");

  const response = await fetch(AICTE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(`HTTP Error: ${response.status}`);
    return;
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  console.log(`HTML length: ${html.length}`);

  const paginationLinks: string[] = [];

  $("a").each((_, element) => {
    const href = $(element).attr("href");
    const text = $(element).text().trim();

    if (
      href &&
      (href.includes("page=") ||
        href.includes("offset=") ||
        href.includes("start=") ||
        href.includes("p=") ||
        href.includes("internships.php?") ||
        text.match(/^\d+$/) ||
        text.toLowerCase().includes("next") ||
        text.toLowerCase().includes("previous"))
    ) {
      paginationLinks.push(`${href} [text: "${text}"]`);
    }
  });

  const uniquePaginationLinks = [...new Set(paginationLinks)];

  console.log("\nPossible pagination links:");
  if (uniquePaginationLinks.length === 0) {
    console.log("None found via standard href patterns.");
  } else {
    uniquePaginationLinks.slice(0, 30).forEach((link) => console.log(`- ${link}`));
  }

  // Also check DataTables or JavaScript pagination scripts/classes
  const dataTableElements = $(".dataTables_paginate, .pagination, .page-item, ul.pagination").length;
  console.log(`Pagination DOM container elements count: ${dataTableElements}`);

  const opportunities = parseAICTEInternships(html);
  console.log(`Found count: ${opportunities.length}`);
}

runDiagnostic();
