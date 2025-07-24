import dayjs from 'dayjs';

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
