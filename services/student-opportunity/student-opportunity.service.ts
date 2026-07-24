import repository from "@/repositories/student-opportunity/student-opportunity.repository";

class StudentOpportunityService {
  async getRecommended(userId: string) {
    return repository.getRecommended(userId);
  }

  async getByType(type?: string) {
    return repository.getByType(type);
  }
}

export default new StudentOpportunityService();