import opportunityRepository from "@/repositories/opportunity/opportunity.repository";

class OpportunityService {
  async getDashboardOpportunities(
    userId: string
) {
    return opportunityRepository.getDashboardOpportunities(
        userId
    );
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
}

export default new OpportunityService();