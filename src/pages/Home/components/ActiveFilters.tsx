import React from 'react';
import { Button } from '@/shared/ui/Button';
import type { Filters } from '@/shared/lib/types';
import styles from './ActiveFilters.module.css';

export interface ActiveFilter {
  key: string;
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

/**
 * Генерирует список активных фильтров для отображения
 */
const generateActiveFilters = (
  filters: Filters,
  onFiltersChange: (filters: Filters) => void
): ActiveFilter[] => {
  const activeFilters: ActiveFilter[] = [];

  // Фильтр по режиму
  if (filters.mode !== 'all') {
    const modeLabels = {
      learn: 'Обучение',
      teach: 'Преподавание',
    };
    activeFilters.push({
      key: 'mode',
      label: modeLabels[filters.mode as keyof typeof modeLabels],
      onRemove: () =>
        onFiltersChange({
          ...filters,
          mode: 'all',
        }),
    });
  }

  // Фильтр по полу
  if (filters.gender !== 'unknown') {
    const genderLabels = {
      male: 'Мужчины',
      female: 'Женщины',
    };
    activeFilters.push({
      key: 'gender',
      label: genderLabels[filters.gender as keyof typeof genderLabels],
      onRemove: () =>
        onFiltersChange({
          ...filters,
          gender: 'unknown',
        }),
    });
  }

  // Фильтры по подкатегориям
  filters.subcategories.forEach((subcategory) => {
    activeFilters.push({
      key: `subcategory-${subcategory}`,
      label: subcategory,
      onRemove: () =>
        onFiltersChange({
          ...filters,
          subcategories: filters.subcategories.filter(
            (sub) => sub !== subcategory
          ),
        }),
    });
  });

  // Фильтры по городам
  filters.cities.forEach((city) => {
    activeFilters.push({
      key: `city-${city}`,
      label: city,
      onRemove: () =>
        onFiltersChange({
          ...filters,
          cities: filters.cities.filter((c) => c !== city),
        }),
    });
  });

  return activeFilters;
};

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const activeFilters = generateActiveFilters(filters, onFiltersChange);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles.activeFilters}>
      {activeFilters.map((filter) => (
        <Button
          key={filter.key}
          variant="tertiary"
          onClick={filter.onRemove}
          className={styles.filterButton}
        >
          {filter.label} ×
        </Button>
      ))}
    </div>
  );
};
