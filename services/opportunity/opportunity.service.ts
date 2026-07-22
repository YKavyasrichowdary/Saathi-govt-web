import { OpportunityStatus } from "@prisma/client";
import opportunityRepository from "@/repositories/opportunity/opportunity.repository";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseDate(val: any): Date | null {
  if (!val || typeof val !== "string" || val.trim() === "") return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function cleanString(val: any): string | null {
  if (!val || typeof val !== "string" || val.trim() === "") return null;
  return val.trim();
}

function formatOpportunityPayload(data: any) {
  const {
    title,
    organization,
    source,
    type,
    mode,
    status,
    registrationLink,
    description,
    featured,
    verified,
    deadline,
    startDate,
    endDate,
    educationLevel,
    imageUrl,
    bannerUrl,
    amount,
    location,
    state,
    city,
    course,
    specialization,
    eligibility,
    benefits,
    applicationProcess,
    minCGPA,
  } = data;

  return {
    title,
    organization,
    source,
    type,
    mode,
    status: status || OpportunityStatus.DRAFT,
    registrationLink,
    description,
    featured: Boolean(featured),
    verified: Boolean(verified),
    slug: createSlug(title),
    deadline: parseDate(deadline),
    startDate: parseDate(startDate),
    endDate: parseDate(endDate),
    educationLevel: educationLevel && educationLevel !== "" ? educationLevel : null,
    imageUrl: cleanString(imageUrl),
    bannerUrl: cleanString(bannerUrl),
    amount: cleanString(amount),
    location: cleanString(location),
    state: cleanString(state),
    city: cleanString(city),
    course: cleanString(course),
    specialization: cleanString(specialization),
    eligibility: cleanString(eligibility),
    benefits: cleanString(benefits),
    applicationProcess: cleanString(applicationProcess),
    minCGPA: typeof minCGPA === "number" && !isNaN(minCGPA) ? minCGPA : null,
  };
}

class OpportunityService {
  async create(data: any) {
    const formattedData = formatOpportunityPayload(data);
    return opportunityRepository.create(formattedData as any);
  }

  async getAll() {
    return opportunityRepository.findAll();
  }

  async getStats() {
    return opportunityRepository.getStats();
  }

  async getById(id: string) {
    return opportunityRepository.findById(id);
  }

  async update(id: string, data: any) {
    const formattedData = formatOpportunityPayload(data);
    return opportunityRepository.update(id, formattedData as any);
  }

  async delete(id: string) {
    return opportunityRepository.delete(id);
  }
}

export default new OpportunityService();