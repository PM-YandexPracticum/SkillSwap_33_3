const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://skillswap.free.beeceptor.com';

export interface User {
  id: string;
  email: string;
  avatar: string;
  name: string;
  birthDate: string;
  gender: string;
  city: string;
  aboutMe: string;
  teachingSkills: unknown[];
  learningSkills: unknown[];
  likes: string;
}

export interface Skill {
  name: string;
  subcategories: {
    name: string;
    items?: string[];
  }[];
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export const apiClient = new ApiClient();

// Типизированные методы для удобства
export const usersApi = {
  getAll: (): Promise<User[]> => apiClient.get<User[]>('/api/users'),
  getById: (id: string): Promise<User> =>
    apiClient.get<User>(`/api/users/${id}`),
  create: (user: Partial<User>): Promise<User> =>
    apiClient.post<User>('/api/users', user),
};

export const skillsApi = {
  getAll: (): Promise<Skill[]> => apiClient.get<Skill[]>('/api/skills'),
};
