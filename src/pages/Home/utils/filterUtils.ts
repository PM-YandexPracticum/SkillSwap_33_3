import type { UserResponse } from '@/api/client';
import type { Filters, SortMode } from '@/shared/lib/types';

/**
 * Фильтрует пользователей по заданным критериям
 */
export const filterUsers = (
  users: UserResponse[],
  filters: Filters
): UserResponse[] => {
  return users.filter((user) => {
    // Фильтр по режиму (обучение/преподавание)
    if (filters.mode !== 'all') {
      if (
        filters.mode === 'learn' &&
        (!user.learningSkills || user.learningSkills.length === 0)
      ) {
        return false;
      }
      if (
        filters.mode === 'teach' &&
        (!user.teachingSkills || user.teachingSkills.length === 0)
      ) {
        return false;
      }
    }

    // Фильтр по полу
    if (filters.gender !== 'unknown') {
      if (user.gender !== filters.gender) {
        return false;
      }
    }

    // Фильтр по городам
    if (filters.cities.length > 0) {
      const userCity = user.city?.toLowerCase().trim();
      const selectedCities = filters.cities.map((city) =>
        city.toLowerCase().trim()
      );

      if (!userCity || !selectedCities.includes(userCity)) {
        return false;
      }
    }

    // Фильтр по подкатегориям навыков
    if (filters.subcategories.length > 0) {
      const userSkills = [
        ...(user.learningSkills || []),
        ...(user.teachingSkills || []),
      ];

      const hasMatchingSkill = userSkills.some((skill) =>
        filters.subcategories.includes(skill.subcategory)
      );

      if (!hasMatchingSkill) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Сортирует пользователей по выбранному режиму
 */
export const sortUsers = (
  users: UserResponse[],
  sortMode: SortMode
): UserResponse[] => {
  const sortedUsers = [...users];

  switch (sortMode) {
    case 'new':
      // Сортировка по ID (сначала более высокие значения)
      return sortedUsers.sort((a, b) => Number(b.id) - Number(a.id));

    case 'popular':
      // Сортировка по количеству лайков
      return sortedUsers.sort((a, b) => b.likes - a.likes);

    case 'recommended':
    default:
      // Без сортировки (рекомендованные)
      return sortedUsers;
  }
};

/**
 * Проверяет есть ли активные фильтры или сортировка
 */
export const hasActiveFiltersOrSort = (
  filters: Filters,
  sortMode: SortMode
): boolean => {
  const defaultFilters: Filters = {
    mode: 'all',
    subcategories: [],
    gender: 'unknown',
    cities: [],
  };

  const hasFilters =
    filters.mode !== defaultFilters.mode ||
    filters.gender !== defaultFilters.gender ||
    filters.subcategories.length > 0 ||
    filters.cities.length > 0;

  const hasSorting = sortMode !== 'recommended';

  return hasFilters || hasSorting;
};

/**
 * Получает текст для кнопки сортировки
 */
export const getSortButtonText = (sortMode: SortMode): string => {
  switch (sortMode) {
    case 'new':
      return 'Сначала новые';
    case 'popular':
      return 'Сначала популярные';
    case 'recommended':
      return 'Сначала рекомендованные';
    default:
      return 'Сначала рекомендованные';
  }
};

/**
 * Переключает режим сортировки по кругу
 */
export const getNextSortMode = (currentMode: SortMode): SortMode => {
  const modes: SortMode[] = ['recommended', 'new', 'popular'];
  const currentIndex = modes.indexOf(currentMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  return modes[nextIndex];
};
