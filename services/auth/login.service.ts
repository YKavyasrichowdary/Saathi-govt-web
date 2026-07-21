import authRepository from "@/repositories/auth/auth.repository";
import passwordService from "./password.service";

class LoginService {
  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await authRepository.findUserByEmail(
      normalizedEmail
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (!user.password) {
      throw new Error(
        "This account uses Google or GitHub Sign-In."
      );
    }

    const isPasswordValid =
      await passwordService.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    if (!user.emailVerified) {
      throw new Error(
        "Please verify your email before signing in."
      );
    }

    if (!user.isActive) {
      throw new Error(
        "Your account has been deactivated."
      );
    }

    await authRepository.updateLastLogin(user.id);

    return user;
  }
}

export default new LoginService();