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

  async getAll() {
    return opportunityRepository.getAll();
  }

async search(query: string) {
  return prisma.opportunity.findMany({
    where: {
      status: OpportunityStatus.OPEN,
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
}
}

export default new OpportunityService();