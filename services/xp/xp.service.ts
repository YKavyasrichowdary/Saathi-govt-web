import repository from "@/repositories/xp/xp.repository";

class XPService {

async rewardXP(userId: string, amount: number) {

  return repository.addXP(userId, amount);
}

}

export default new XPService();