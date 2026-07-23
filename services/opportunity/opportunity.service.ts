import opportunityRepository, {
  OpportunitySearchParams,
} from "@/repositories/opportunity/opportunity.repository";

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

  async search(params: OpportunitySearchParams) {
    return opportunityRepository.search(params);
  }
}

export default new OpportunityService();