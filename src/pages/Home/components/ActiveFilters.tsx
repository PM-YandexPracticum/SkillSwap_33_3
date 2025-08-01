import React, { useMemo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import type { Filters } from '@/shared/lib/types';
import CrossIcon from '@/assets/svg/icons/cross.svg?react';
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

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  // Мемоизированные обработчики для предотвращения пересоздания
  const handleModeRemove = useCallback(() => {
    onFiltersChange({
      ...filters,
      mode: 'all',
    });
  }, [filters, onFiltersChange]);

  const handleGenderRemove = useCallback(() => {
    onFiltersChange({
      ...filters,
      gender: 'unknown',
    });
  }, [filters, onFiltersChange]);

  const activeFilters = useMemo(() => {
    const result: ActiveFilter[] = [];

    // Фильтр по режиму
    if (filters.mode !== 'all') {
      const modeLabels = {
        learn: 'Хочу научиться',
        teach: 'Могу научить',
      };
      result.push({
        key: 'mode',
        label: modeLabels[filters.mode as keyof typeof modeLabels],
        onRemove: handleModeRemove,
      });
    }

    // Фильтр по полу
    if (filters.gender !== 'unknown') {
      const genderLabels = {
        male: 'Мужчины',
        female: 'Женщины',
      };
      result.push({
        key: 'gender',
        label: genderLabels[filters.gender as keyof typeof genderLabels],
        onRemove: handleGenderRemove,
      });
    }

    // Фильтры по подкатегориям
    filters.subcategories.forEach((subcategory) => {
      result.push({
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
      result.push({
        key: `city-${city}`,
        label: city,
        onRemove: () =>
          onFiltersChange({
            ...filters,
            cities: filters.cities.filter((c) => c !== city),
          }),
      });
    });

    return result;
  }, [filters, handleModeRemove, handleGenderRemove, onFiltersChange]);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className={styles.activeFilters}>
      {activeFilters.map((filter) => (
        <div key={filter.key} style={{ display: 'inline-block' }}>
          <Button
            variant="tertiary"
            onClick={filter.onRemove}
            style={{
              paddingLeft: '24px',
              paddingRight: '24px',
              whiteSpace: 'nowrap',
            }}
          >
            {filter.label} <CrossIcon />
          </Button>
        </div>
      ))}
    </div>
  );
};
