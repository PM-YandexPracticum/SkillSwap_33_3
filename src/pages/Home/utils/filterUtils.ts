import type { UserResponse } from '@/api/client';
import type { Filters, SortMode } from '@/shared/lib/types';

/**
 * Фильтрует пользователей по заданным критериям
 */
export const filterUsers = (
  users: UserResponse[],
  filters: Filters
): UserResponse[] => {
  return users.filter(() => {
    // Фильтр по режиму (все/обучение/преподавание)
    // TODO: Реализовать когда будут данные о навыках пользователей
    // if (filters.mode !== 'all') {
    //   // Логика фильтрации по режиму
    // }

    // Фильтр по полу
    if (filters.gender !== 'unknown') {
      // Предполагаем что поле gender есть в UserResponse
      // Пока оставляем как есть, так как в типе UserResponse нет поля gender
    }

    // Фильтр по городам
    if (filters.cities.length > 0) {
      // Предполагаем что поле city есть в UserResponse
      // Пока оставляем как есть, так как в типе UserResponse нет поля city
    }

    // Фильтр по подкатегориям навыков
    if (filters.subcategories.length > 0) {
      // TODO: Реализовать когда будут данные о навыках пользователей
    }

    return true; // Пока возвращаем всех пользователей
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
