import dayjs from 'dayjs';
import type { UserResponse } from '../../api/client';

export const getAge = (birthDate: string): number => {
  const today = dayjs();
  const birthDateDayjs = dayjs(birthDate);
  let age = today.diff(birthDate, 'year');

  const isBirthdayToday = today.isSame(
    birthDateDayjs.year(today.year()),
    'day'
  );

  if (isBirthdayToday) {
    age++;
  }

  return age;
};

export const ageString = (data: string): string => {
  const age = getAge(data);

  if (age === null) return '';

  const getAgeWord = (age: number): string => {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'лет';
    }

    if (lastDigit === 1) {
      return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return 'года';
    } else {
      return 'лет';
    }
  };

  return `${age} ${getAgeWord(age)}`;
};

export function reorderArrayByRows<T>(arr: T[], rows: number) {
  const columns = Math.ceil(arr.length / rows);
  const reordered = [];

  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      const index = columns * row + column;
      if (index < arr.length) {
        reordered.push(arr[index]);
      }
    }
  }
  console.log(reordered);
  return reordered;
}

export const getLearningSkills = (user: UserResponse, filters?: string[]) => {
  if (!filters || filters.length === 0) return user.learningSkills;
  return user.learningSkills.filter((skill) =>
    filters.includes(skill.subcategory)
  );
};

export const getTeachingSkills = (user: UserResponse, filters?: string[]) => {
  if (!filters || filters.length === 0) return user.teachingSkills;
  return user.teachingSkills.filter((skill) =>
    filters.includes(skill.subcategory)
  );
};
