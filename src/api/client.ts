import type { LearningSkill, TeachingSkill } from '../shared/lib/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserResponse {
  id: number;
  email: string;
  avatar: string;
  name: string;
  birthDate: string;
  gender: string;
  city: string;
  aboutMe: string;
  teachingSkills: TeachingSkill[];
  learningSkills: LearningSkill[];
  likes: number;
}

export interface SkillResponse {
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
  getAll: (): Promise<UserResponse[]> =>
    apiClient.get<UserResponse[]>('/api/users'),
  getById: (id: string): Promise<UserResponse> =>
    apiClient.get<UserResponse>(`/api/users/${id}`),
  create: (user: Partial<UserResponse>): Promise<UserResponse> =>
    apiClient.post<UserResponse>('/api/users', user),
};

export const skillsApi = {
  getAll: (): Promise<SkillResponse[]> =>
    apiClient.get<SkillResponse[]>('/api/skills'),
};
