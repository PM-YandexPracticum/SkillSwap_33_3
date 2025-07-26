import dayjs from 'dayjs';
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
