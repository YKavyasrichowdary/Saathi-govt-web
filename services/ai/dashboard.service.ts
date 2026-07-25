import profileService from "@/services/profile/profile.service";
import recommendationService from "@/services/recommendation/recommendation.service";
import applicationService from "@/services/application/application.service";
import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";
import documentService from "@/services/document/document.service";
import notificationService from "@/services/notification/notification.service";
import { calculateProfileCompletion } from "@/lib/profile/completion";
import { buildPriorities } from "@/lib/ai/priority-engine";

class AIDashboardService {
  async getDashboard(userId: string) {
    const [
      profile,
      recommendations,
      applications,
      saved,
      documents,
      notifications,
    ] = await Promise.all([
      profileService.getProfile(userId),
      recommendationService.getRecommendations(userId),
      applicationService.getApplications(userId),
      savedOpportunityService.getSavedByUser(userId),
      documentService.getDocuments(userId),
      notificationService.getNotifications(userId),
    ]);

    const profileCompletion = calculateProfileCompletion(profile);
    const priorities = buildPriorities({
      profileCompletion,
      recommendations,
      documents,
      notifications,
    });

    return {
      profile,
      profileCompletion,
      priorities,
      recommendations,
      applications,
      saved,
      documents,
      notifications,
    };
  }
}

export default new AIDashboardService();