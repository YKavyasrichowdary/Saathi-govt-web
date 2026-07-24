import dashboardRepository from "@/repositories/dashboard/dashboard.repository";

class DashboardService {
  async getStats(userId: string) {
    return dashboardRepository.getStats(userId);
  }
}

export default new DashboardService();