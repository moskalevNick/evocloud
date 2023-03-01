import $api from '../http';

const path = 'auth';

export default class AuthService {
  static async login(login: string, password: string) {
    return $api.post(`${path}/login`, { login, password });
  }

  static async registration(username: string, password: string, cameraToken: string) {
    return $api.post(`${path}/registration`, { username, password, cameraToken });
  }

  static async checkAuth(refreshToken: string) {
    return $api.post(`/refresh`, { refresh_token: refreshToken });
  }

  static async logout() {
    return $api.get('/logout');
  }
}
