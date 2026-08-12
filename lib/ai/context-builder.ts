import profileService from "@/services/profile/profile.service";
import recommendationService from "@/services/recommendation/recommendation.service";
import applicationService from "@/services/application/application.service";
import savedOpportunityService from "@/services/saved-opportunity/saved-opportunity.service";
import documentService from "@/services/document/document.service";
import notificationService from "@/services/notification/notification.service";
import resumeAnalysisStorageService from "@/services/resume/resume-analysis-storage.service";


export async function buildAIContext(
  userId: string
) {

const [
  profile,
  recommendations,
  applications,
  saved,
  documents,
  primaryResumeAnalysis,
  notifications,
] = await Promise.all([
  profileService.getProfile(userId),
  recommendationService.getRecommendations(userId),
  applicationService.getApplications(userId),
  savedOpportunityService.getSavedByUser(userId),
  documentService.getDocuments(userId),
  resumeAnalysisStorageService.getPrimaryResumeAnalysis(userId),
  notificationService.getNotifications(userId),
]);

return {
  profile,
  recommendations,
  applications,
  saved,
  documents,
  primaryResumeAnalysis,
  notifications,
};
}