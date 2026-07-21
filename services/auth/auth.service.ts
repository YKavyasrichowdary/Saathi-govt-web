import registerService from "./register.service";
import loginService from "./login.service";

class AuthService {
  register = registerService.register.bind(registerService);

  resendOTP =
    registerService.resendOTP.bind(registerService);

  verifyEmail =
    registerService.verifyEmail.bind(registerService);

  login = loginService.login.bind(loginService);
}

export default new AuthService();