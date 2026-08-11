import prisma from "@/lib/prisma";
import opportunityRepository, {
  OpportunitySearchParams,
} from "@/repositories/opportunity/opportunity.repository";
import { OpportunityStatus } from "@prisma/client";

class OpportunityService {
  async getDashboardOpportunities(userId: string) {
    return opportunityRepository.getDashboardOpportunities(userId);
  }

  async getLatest() {
    return opportunityRepository.getLatest();
  }

  async getBySlug(slug: string) {
    return opportunityRepository.getBySlug(slug);
  }

  async getOpportunity(id: string) {
    return opportunityRepository.getByIdOrSlug(id);
  }

  async getAll(sort?: string) {
    return opportunityRepository.getAll(sort);
  }

  async search(params: OpportunitySearchParams | string) {
    if (typeof params === "string") {
      return opportunityRepository.search({ q: params });
    }
    return opportunityRepository.search(params);
  }
}

export default new OpportunityService();