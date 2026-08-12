import profileRepository from "@/repositories/profile/profile.repository";
import { CreateProfileDto } from "@/types/profile";

class ProfileService {
  async getProfile(userId: string) {
    return await profileRepository.getProfile(userId);
  }

  async completeProfile(userId: string, data: CreateProfileDto) {
    return await profileRepository.upsertProfile(userId, data);
  }
  async setPrimaryResume(
  userId: string,
  documentId: string
) {
  return profileRepository.setPrimaryResume(
    userId,
    documentId
  );
}
}

export default new ProfileService();