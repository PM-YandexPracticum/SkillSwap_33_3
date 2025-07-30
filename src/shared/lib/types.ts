import dayjs from 'dayjs';

export type Subcategory = {
  name: string;
};

export type Category = {
  name: string;
  subcategories: Subcategory[];
};

export interface LearningSkill {
  category: string;
  subcategory: string;
}

export interface TeachingSkill {
  category: string;
  subcategory: string;
  skillName: string;
  id: number;
}

export interface IUser {
  id: string;
  email: string;
  avatar: string;
  name: string;
  birthDate: dayjs.Dayjs;
  gender: string;
  city: string;
  aboutMe: string;
  teachingSkills: TeachingSkill[];
  learningSkills: LearningSkill[];
  likes: number;

  // Методы для модели User
  get age(): number;
  get ageString(): string;
  getLearningSkills(filters?: string[]): LearningSkill[];
  getTeachingSkills(filters?: string[]): TeachingSkill[];
}

export interface Filters {
  mode: 'all' | 'learn' | 'teach';
  subcategories: string[];
  gender: 'unknown' | 'male' | 'female';
  cities: string[];
}

export interface TSkillInfo extends TeachingSkill {
  description: string;
  images: string[];
}

// Типы для аутентификации
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: UserResponse;
  tokens: AuthTokens;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
