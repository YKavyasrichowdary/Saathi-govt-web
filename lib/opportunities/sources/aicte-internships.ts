import * as cheerio from "cheerio";

import {
  OpportunityMode,
  OpportunitySource,
  OpportunityType,
  EducationLevel,
} from "@prisma/client";

import type { NormalizedOpportunity } from "../opportunity-normalizer";

const AICTE_URL =
  "https://internship.aicte-india.org/internships.php?future=intern";

function cleanText(value?: string | null) {
  return (value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(value: string): Date | undefined {
  const cleaned = cleanText(value);

  if (!cleaned) return undefined;

  const match = cleaned.match(
    /^(\d{2})-(\d{2})-(\d{4})$/
  );

  if (!match) return undefined;

  const [, day, month, year] = match;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return Number.isNaN(date.getTime())
    ? undefined
    : date;
}

function extractAttribute(
  $: cheerio.CheerioAPI,
  root: cheerio.Cheerio<any>,
  selector: string
) {
  return cleanText(
    root.find(selector).first().text()
  );
}

function getMode(value: string): OpportunityMode {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("remote") ||
    normalized.includes("work from home") ||
    normalized.includes("online")
  ) {
    return OpportunityMode.ONLINE;
  }

  if (normalized.includes("hybrid")) {
    return OpportunityMode.HYBRID;
  }

  return OpportunityMode.OFFLINE;
}

function createSlug(
  title: string,
  officialId: string
) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}-${officialId}`;
}

export async function fetchAICTEInternships(): Promise<
  NormalizedOpportunity[]
> {
  const response = await fetch(AICTE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `AICTE returned HTTP ${response.status}`
    );
  }

  const html = await response.text();

  console.log(
    "AICTE HTML length:",
    html.length
  );

  // Diagnostic: inspect pagination links.
  const $ = cheerio.load(html);

  const paginationLinks: string[] = [];

  $("a").each((_, element) => {
    const href = $(element).attr("href");

    if (
      href &&
      (
        href.includes("page=") ||
        href.includes("offset=") ||
        href.includes("start=")
      )
    ) {
      paginationLinks.push(href);
    }
  });

  console.log(
    "Possible pagination links:",
    [...new Set(paginationLinks)].slice(0, 30)
  );

  return parseAICTEInternships(html);
}

export function parseAICTEInternships(
  html: string
): NormalizedOpportunity[] {
  const $ = cheerio.load(html);

  const opportunities: NormalizedOpportunity[] =
    [];

  $(".card.internship-item").each(
    (_, element) => {
      const card = $(element);

      const title = cleanText(
        card.find(".job-title").first().text()
      );

      const rawOrganization = cleanText(
        card
          .find(".company-name")
          .first()
          .text()
      );

      const organization =
        rawOrganization ||
        "AICTE National Internship Portal";

      const modeText = extractAttribute(
        $,
        card,
        ".job-attributes .wfh"
      );

      const location = extractAttribute(
        $,
        card,
        ".job-attributes .location"
      );

      const postedOn = extractAttribute(
        $,
        card,
        ".job-attributes .posted-on"
      );

      const startDate = extractAttribute(
        $,
        card,
        ".start-date span"
      );

      const duration = extractAttribute(
        $,
        card,
        ".duration span"
      );

      const stipend = extractAttribute(
        $,
        card,
        ".stipend span"
      );

      const openings = extractAttribute(
        $,
        card,
        ".job-supplement-attributes li:nth-child(4) span"
      );

      const applyBy = extractAttribute(
        $,
        card,
        ".apply-by span"
      );

      const detailsLink =
        card
          .find(".btn-wrap a")
          .first()
          .attr("href") ?? "";

      if (!title || !detailsLink) {
        return;
      }

      const absoluteDetailsUrl =
        new URL(
          detailsLink,
          AICTE_URL
        ).toString();

      const detailsUrl = new URL(
        absoluteDetailsUrl
      );

      const uid =
        detailsUrl.searchParams.get(
          "uid"
        );

      if (!uid) {
        return;
      }

      const officialId = `aicte-${uid}`;

      const descriptionParts = [
        `Internship at ${organization}.`,
        duration
          ? `Duration: ${duration}.`
          : "",
        stipend
          ? `Stipend: ${stipend}.`
          : "",
        openings
          ? `Openings: ${openings}.`
          : "",
        startDate
          ? `Start date: ${startDate}.`
          : "",
        postedOn
          ? `Posted on: ${postedOn}.`
          : "",
      ].filter(Boolean);

      opportunities.push({
        officialId,

        title,

        organization,

        slug: createSlug(
          title,
          officialId
        ),

        type: OpportunityType.INTERNSHIP,

        source: OpportunitySource.GOVERNMENT,

        sourceName: "AICTE National Internship Portal",

        sourceUrl: AICTE_URL,

        description:
          descriptionParts.join(" "),

        registrationLink:
          absoluteDetailsUrl,

        mode: getMode(modeText),

        location: location || undefined,

        eligibility:
          "See the official AICTE internship listing for eligibility requirements.",

        applicationProcess:
          `Apply through the official AICTE internship listing: ${absoluteDetailsUrl}`,

        deadline: parseDate(
          applyBy
        ),

        educationLevel:
          EducationLevel.UNDERGRADUATE,

        skills: [],

        interests: [],

        careerTags: [
          "internship",
          "student",
        ],
      });
    }
  );

  return opportunities;
}