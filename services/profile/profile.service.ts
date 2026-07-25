import profileRepository from "@/repositories/profile/profile.repository";
import { CreateProfileDto } from "@/types/profile";

class ProfileService {
  async getProfile(userId: string) {
    return await profileRepository.getProfile(userId);
  }

  async completeProfile(userId: string, data: CreateProfileDto) {
    return await profileRepository.upsertProfile(userId, data);
  }
}

export default new ProfileService();