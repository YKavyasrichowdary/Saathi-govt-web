export function normalizeText(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[.,/()_-]+/g, " ")
    .replace(/\s+/g, " ");
}

export function compareStrings(
  a: unknown,
  b: unknown
): boolean {
  const first = normalizeText(a);
  const second = normalizeText(b);

  if (!first || !second) {
    return false;
  }

  if (first === second) {
    return true;
  }

  return (
    first.includes(second) ||
    second.includes(first)
  );
}

const EDUCATION_ALIASES: Record<string, string[]> = {
  undergraduate: [
    "undergraduate",
    "ug",
    "bachelor",
    "bachelors",
    "b tech",
    "btech",
    "b e",
    "be",
    "graduation",
  ],

  postgraduate: [
    "postgraduate",
    "pg",
    "master",
    "masters",
    "m tech",
    "mtech",
    "m e",
    "me",
    "mba",
    "mca",
  ],

  diploma: [
    "diploma",
    "polytechnic",
  ],

  school: [
    "school",
    "class 10",
    "class 12",
    "10th",
    "12th",
    "higher secondary",
  ],
};

export function compareEducation(
  profileValue: unknown,
  opportunityValue: unknown
): boolean {
  const profile = normalizeText(profileValue);
  const opportunity = normalizeText(opportunityValue);

  if (!profile || !opportunity) {
    return false;
  }

  if (profile === opportunity) {
    return true;
  }

  for (const aliases of Object.values(
    EDUCATION_ALIASES
  )) {
    const profileMatches = aliases.some(
      (alias) =>
        profile.includes(alias) ||
        alias.includes(profile)
    );

    const opportunityMatches = aliases.some(
      (alias) =>
        opportunity.includes(alias) ||
        alias.includes(opportunity)
    );

    if (profileMatches && opportunityMatches) {
      return true;
    }
  }

  return false;
}