import profileRepository from "@/repositories/profile/profile.repository";

import {
  CreateProfileDto,
  UpdateProfileDto,
} from "@/types/profile";

import { calculateProfileCompletion } from "@/utils/profile-completion";

class ProfileService {
  async createProfile(
    userId: string,
    data: CreateProfileDto
  ) {
    const existing =
      await profileRepository.findProfileByUserId(
        userId
      );

    if (existing) {
      throw new Error(
        "Profile already exists."
      );
    }

    const profile =
      await profileRepository.createProfile({
        userId,
        ...data,
      });

    return {
      ...profile,
      completion: 0,
    };
  }

  async getProfile(userId: string) {
    const profile =
      await profileRepository.findProfileByUserId(
        userId
      );

    if (!profile) {
      throw new Error(
        "Profile not found."
      );
    }

    const completion =
      calculateProfileCompletion({
        profile,
        skills: profile.skills,
        interests: profile.interests,
        careerGoals:
          profile.careerGoals,
      });

    return {
      ...profile,
      completion,
    };
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileDto
  ) {
    const existing =
      await profileRepository.findProfileByUserId(
        userId
      );

    if (!existing) {
      throw new Error(
        "Profile not found."
      );
    }

    const updated =
      await profileRepository.updateProfile(
        userId,
        data
      );

    const completion =
      calculateProfileCompletion({
        profile: updated,
        skills: existing.skills,
        interests:
          existing.interests,
        careerGoals:
          existing.careerGoals,
      });

    return {
      ...updated,
      completion,
    };
  }
}

export default new ProfileService();