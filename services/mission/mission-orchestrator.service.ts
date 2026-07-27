import repository from "@/repositories/mission/mission.repository";
import generator from "./mission-generator.service";

class MissionOrchestratorService {

  async getOrCreateMission(userId: string) {

    const existing =
      await repository.getTodayMission(userId);

    if (existing) {
      return existing;
    }

    const generated =
      await generator.generate(userId);

    return repository.create({
      userId,
      ...generated,
    });

  }

}

export default new MissionOrchestratorService();