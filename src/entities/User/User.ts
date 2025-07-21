import dayjs from 'dayjs';
import type {
  IUser,
  LearningSkill,
  TeachingSkill,
} from '../../shared/lib/types';

export class User implements IUser {
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

  constructor(userData: {
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
  }) {
    this.id = userData.id;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.birthDate = userData.birthDate;
    this.gender = userData.gender;
    this.city = userData.city;
    this.aboutMe = userData.aboutMe;
    this.teachingSkills = userData.teachingSkills;
    this.learningSkills = userData.learningSkills;
    this.likes = userData.likes;
  }

  /**
   * Вычисляет возраст пользователя на основе даты рождения
   * Если сегодня день рождения, считается за следующий год
   */
  get age(): number {
    const today = dayjs();
    const birthDate = dayjs(this.birthDate);

    // Вычисляем разность в годах
    let age = today.year() - birthDate.year();

    // Проверяем, прошёл ли день рождения в этом году
    const hasHadBirthdayThisYear =
      today.month() > birthDate.month() ||
      (today.month() === birthDate.month() && today.date() > birthDate.date());

    // Если день рождения ещё не прошёл, уменьшаем возраст на 1
    if (!hasHadBirthdayThisYear) {
      age--;
    }

    // Если сегодня день рождения, считается за следующий год
    const isBirthdayToday =
      today.month() === birthDate.month() && today.date() === birthDate.date();

    if (isBirthdayToday) {
      age++;
    }

    return age;
  }

  /**
   * Возвращает строку с возрастом с правильным склонением
   */
  get ageString(): string {
    const age = this.age;

    // Функция для определения правильного окончания
    const getAgeWord = (age: number): string => {
      const lastDigit = age % 10;
      const lastTwoDigits = age % 100;

      // Исключения для 11-14
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет';
      }

      // Обычные правила
      if (lastDigit === 1) {
        return 'год';
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
      } else {
        return 'лет';
      }
    };

    return `${age} ${getAgeWord(age)}`;
  }

  /**
   * Возвращает навыки обучения с возможной фильтрацией по категориям
   */
  getLearningSkills(filters?: string[]): LearningSkill[] {
    if (!filters || filters.length === 0) {
      return this.learningSkills;
    }

    return this.learningSkills.filter((skill) =>
      filters.includes(skill.category)
    );
  }

  /**
   * Возвращает навыки преподавания с возможной фильтрацией по категориям
   */
  getTeachingSkills(filters?: string[]): TeachingSkill[] {
    if (!filters || filters.length === 0) {
      return this.teachingSkills;
    }

    return this.teachingSkills.filter((skill) =>
      filters.includes(skill.category)
    );
  }
}
