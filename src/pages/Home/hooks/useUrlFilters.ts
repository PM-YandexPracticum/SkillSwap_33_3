import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Filters, SortMode } from '@/shared/lib/types';

const DEFAULT_FILTERS: Filters = {
  mode: 'all',
  subcategories: [],
  gender: 'unknown',
  cities: [],
};

const DEFAULT_SORT_MODE: SortMode = 'recommended';

/**
 * Парсит фильтры из URL параметров
 */
const parseFiltersFromUrl = (params: URLSearchParams): Filters => {
  return {
    mode: (params.get('mode') as Filters['mode']) || DEFAULT_FILTERS.mode,
    subcategories:
      params.get('subcategories')?.split('|').filter(Boolean) ||
      DEFAULT_FILTERS.subcategories,
    gender:
      (params.get('gender') as Filters['gender']) || DEFAULT_FILTERS.gender,
    cities:
      params.get('cities')?.split('|').filter(Boolean) ||
      DEFAULT_FILTERS.cities,
  };
};

/**
 * Обновляет URL параметры с новыми фильтрами
 */
const updateUrlWithFilters = (
  params: URLSearchParams,
  filters: Filters
): void => {
  // Очищаем существующие параметры фильтров
  ['mode', 'subcategories', 'gender', 'cities'].forEach((key) =>
    params.delete(key)
  );

  // Устанавливаем новые значения только если они отличаются от дефолтных
  if (filters.mode !== DEFAULT_FILTERS.mode) {
    params.set('mode', filters.mode);
  }

  if (filters.subcategories.length > 0) {
    params.set('subcategories', filters.subcategories.join('|'));
  }

  if (filters.gender !== DEFAULT_FILTERS.gender) {
    params.set('gender', filters.gender);
  }

  if (filters.cities.length > 0) {
    params.set('cities', filters.cities.join('|'));
  }
};

/**
 * Обновляет URL параметры с новым режимом сортировки
 */
const updateUrlWithSortMode = (
  params: URLSearchParams,
  sortMode: SortMode
): void => {
  if (sortMode !== DEFAULT_SORT_MODE) {
    params.set('sort', sortMode);
  } else {
    params.delete('sort');
  }
};

/**
 * Кастомный хук для управления состоянием фильтров и сортировки через URL
 */
export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Парсим текущие фильтры из URL
  const filters = useMemo(() => {
    return parseFiltersFromUrl(searchParams);
  }, [searchParams]);

  // Парсим текущий режим сортировки из URL
  const sortMode = useMemo(() => {
    return (searchParams.get('sort') as SortMode) || DEFAULT_SORT_MODE;
  }, [searchParams]);

  // Функция для обновления фильтров
  const updateFilters = useCallback(
    (newFilters: Filters) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        updateUrlWithFilters(params, newFilters);
        return params;
      });
    },
    [setSearchParams]
  );

  // Функция для обновления режима сортировки
  const updateSortMode = useCallback(
    (newSortMode: SortMode) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        updateUrlWithSortMode(params, newSortMode);
        return params;
      });
    },
    [setSearchParams]
  );

  // Функция для сброса всех фильтров и сортировки
  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filters,
    sortMode,
    updateFilters,
    updateSortMode,
    resetFilters,
  };
};
