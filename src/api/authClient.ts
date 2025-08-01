import { getCookie, setCookie, deleteCookie } from '../shared/lib/cookie';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const ACCESS_TOKEN_COOKIE = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface UserAuthResponse {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  notifications: NotificationItem[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: UserAuthResponse;
  tokens: AuthTokens;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

class AuthApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAccessToken(): string | null {
    return getCookie(ACCESS_TOKEN_COOKIE);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  private saveTokens(accessToken: string, refreshToken?: string): void {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
      expires: 7,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
    });

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  private clearTokens(): void {
    deleteCookie(ACCESS_TOKEN_COOKIE);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  private async refreshAccessToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data: RefreshTokenResponse = await response.json();
      this.saveTokens(data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearTokens();
      return null;
    }
  }

  /**
   * Выполняет аутентифицированный запрос с автоматическим обновлением токена
   */
  async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = this.getAccessToken();

    // Функция для выполнения запроса
    const makeRequest = async (token: string): Promise<Response> => {
      return fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });
    };

    // Первая попытка с текущим токеном
    if (accessToken) {
      try {
        const response = await makeRequest(accessToken);

        // Если запрос успешен, возвращаем результат
        if (response.ok) {
          return response.json();
        }

        // Если 401 - пытаемся обновить токен
        if (response.status === 401) {
          const newAccessToken = await this.refreshAccessToken();

          if (newAccessToken) {
            // Повторяем запрос с новым токеном
            const retryResponse = await makeRequest(newAccessToken);

            if (retryResponse.ok) {
              return retryResponse.json();
            }
          }
        }

        // Если обновление не помогло или другая ошибка
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      } catch (error) {
        console.error('Authenticated request failed:', error);
        throw error;
      }
    }

    // Если нет accessToken, пытаемся обновить
    const newAccessToken = await this.refreshAccessToken();

    if (newAccessToken) {
      const response = await makeRequest(newAccessToken);

      if (response.ok) {
        return response.json();
      }

      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    // Если не удалось получить токен
    throw new Error('No valid access token available');
  }

  /**
   * Проверяет аутентификацию пользователя
   * Отправляет запрос на /api/auth с accessToken из куки
   * @returns объект UserAuthResponse в случае успеха
   */
  async checkAuth(): Promise<UserAuthResponse> {
    return this.authenticatedRequest<UserAuthResponse>('/api/auth');
  }

  /**
   * Выход из системы
   */
  async logout(): Promise<void> {
    try {
      await this.authenticatedRequest('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Сохраняет токены после успешной аутентификации
   */
  saveAuthTokens(accessToken: string, refreshToken: string): void {
    this.saveTokens(accessToken, refreshToken);
  }

  /**
   * Проверяет, аутентифицирован ли пользователь
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

// Экспортируем единственный экземпляр
export const authApiClient = new AuthApiClient();

// Экспортируем методы для удобства
export const {
  authenticatedRequest,
  checkAuth,
  logout,
  saveAuthTokens,
  isAuthenticated,
} = authApiClient;
