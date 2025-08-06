import type { LearningSkill, TeachingSkill } from '../shared/lib/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserResponse {
  id: string;
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
  createdAt?: string; // Добавлено для сортировки по дате создания
  updatedAt?: string;
}

export interface SkillResponse {
  name: string;
  subcategories: {
    name: string;
    items?: string[];
  }[];
}

export interface SkillDetailResponse {
  id: number;
  skillName: string;
  category: string;
  subcategory: string;
  description: string;
  images: string[];
  userId: string;
  user: {
    name: string;
    avatar: string;
    city: string;
    aboutMe: string;
  };
}

interface PaginationParams {
  limit?: number;
  offset?: number;
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

  async getPopularUsers(params?: PaginationParams): Promise<UserResponse[]> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    return this.get<UserResponse[]>(`/api/users/popular?${query.toString()}`);
  }

  async getRecentUsers(params?: PaginationParams): Promise<UserResponse[]> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    return this.get<UserResponse[]>(`/api/users/recent?${query.toString()}`);
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
  getPopular: (params?: PaginationParams): Promise<UserResponse[]> =>
    apiClient.getPopularUsers(params),
  getRecent: (params?: PaginationParams): Promise<UserResponse[]> =>
    apiClient.getRecentUsers(params),
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

// Вспомогательные типы
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
