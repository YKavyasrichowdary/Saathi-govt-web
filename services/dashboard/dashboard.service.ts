import dashboardRepository from "@/repositories/dashboard/dashboard.repository";
import { calculateProfileCompletion } from "@/lib/profile/completion";
class DashboardService {
  async getStats(userId: string) {
    return dashboardRepository.getStats(userId);
  }
}

export default new DashboardService();