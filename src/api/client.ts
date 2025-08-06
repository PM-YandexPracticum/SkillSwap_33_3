import type {
  LearningSkill,
  TeachingSkill,
  TSkillInfo,
} from '../shared/lib/types';

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

export interface SkillDetailResponse {
  user: UserResponse;
  skill: TSkillInfo;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async getSkillById(id: number): Promise<SkillDetailResponse> {
    return this.get<SkillDetailResponse>(`/api/skills/${id}`);
  }

  async getPopularUsers(): Promise<UserResponse[]> {
    return this.get<UserResponse[]>(`/api/users/popular`);
  }

  async getRecentUsers(): Promise<UserResponse[]> {
    return this.get<UserResponse[]>(`/api/users/recent`);
  }
}

export const apiClient = new ApiClient();

export const usersApi = {
  getAll: (): Promise<UserResponse[]> =>
    apiClient.get<UserResponse[]>('/api/users'),
  getById: (id: string): Promise<UserResponse> =>
    apiClient.get<UserResponse>(`/api/users/${id}`),
  create: (user: Partial<UserResponse>): Promise<UserResponse> =>
    apiClient.post<UserResponse>('/api/users', user),
  getPopular: (): Promise<UserResponse[]> => apiClient.getPopularUsers(),
  getRecent: (): Promise<UserResponse[]> => apiClient.getRecentUsers(),
  search: (query: string): Promise<UserResponse[]> =>
    apiClient.get<UserResponse[]>(
      `/api/users/search?q=${encodeURIComponent(query)}`
    ),
};

export const skillsApi = {
  getAll: (): Promise<SkillResponse[]> =>
    apiClient.get<SkillResponse[]>('/api/skills'),
  getById: (id: number): Promise<SkillDetailResponse> =>
    apiClient.getSkillById(id),
  create: (data: FormData): Promise<SkillDetailResponse> =>
    apiClient.post<SkillDetailResponse>('/api/skills', data),
};
