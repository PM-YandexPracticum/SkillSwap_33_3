import React, { useState, useEffect } from 'react';
import { FilterSection } from '../../shared/ui/FilterSection';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RadioButton } from '../../shared/ui/RadioButton';
import styles from './FilterSidebar.module.css';
import type { Filters } from '../../shared/lib/types';
import { useSelector, useDispatch } from '../../app/store';
import {
  fetchSkills,
  selectAllSkills,
} from '../../features/slices/skillsSlice';
import { NestedCheckboxGroup } from '../../shared/ui/NestedCheckboxGroup/NestedCheckboxGroup';

interface FilterSidebarProps {
  initialFilters?: Filters;
}

const defaultFilters: Filters = {
  mode: 'all',
  subcategories: [],
  gender: 'unknown',
  cities: [],
};

const getModeForCategory = (
  categorySubcategories: string[],
  selectedSubcategories: string[]
): 'none' | 'some' | 'all' => {
  const intersection = categorySubcategories.filter((sub) =>
    selectedSubcategories.includes(sub)
  );
  if (intersection.length === 0) return 'none';
  if (intersection.length === categorySubcategories.length) return 'all';
  return 'some';
};

const countActiveFilters = (filters: Filters): number => {
  let count = 0;

  if (filters.mode !== 'all') count++;
  if (filters.gender !== 'unknown') count++;
  count += filters.subcategories.length;
  count += filters.cities.length;

  return count;
};

const cities = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Сочи',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  initialFilters = defaultFilters,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const dispatch = useDispatch();
  const skills = useSelector(selectAllSkills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      mode: event.target.value as 'all' | 'learn' | 'teach',
    });
  };

  const handleCategoryChange = (
    title: string,
    mode: 'none' | 'some' | 'all'
  ) => {
    const category = skills.find((skill) => skill.name === title);
    if (!category) return;

    const subcategories = category.subcategories.map((sub) => sub.name);
    setFilters((prev) => ({
      ...prev,
      subcategories:
        mode === 'none'
          ? [...prev.subcategories, ...subcategories]
          : prev.subcategories.filter((sub) => !subcategories.includes(sub)),
    }));
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      subcategories: checked
        ? [...prev.subcategories, value]
        : prev.subcategories.filter((sub) => sub !== value),
    }));
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      gender: event.target.value as 'unknown' | 'male' | 'female',
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      cities: checked
        ? [...prev.cities, value]
        : prev.cities.filter((city) => city !== value),
    }));
  };

  const hasFiltersChanged = !Object.keys(filters).every(
    (key) =>
      JSON.stringify(filters[key as keyof Filters]) ===
      JSON.stringify(defaultFilters[key as keyof Filters])
  );

  const activeFiltersCount = countActiveFilters(filters);

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Фильтры{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}
        </h2>
        {hasFiltersChanged && (
          <button className={styles.resetButton} onClick={handleReset}>
            Сбросить
          </button>
        )}
      </div>
      <div className={styles.wrapper}>
        <FilterSection>
          <RadioButton
            name="filter-mode"
            value="all"
            checked={filters.mode === 'all'}
            onChange={handleModeChange}
          >
            Всё
          </RadioButton>
          <RadioButton
            name="filter-mode"
            value="learn"
            checked={filters.mode === 'learn'}
            onChange={handleModeChange}
          >
            Хочу научиться
          </RadioButton>
          <RadioButton
            name="filter-mode"
            value="teach"
            checked={filters.mode === 'teach'}
            onChange={handleModeChange}
          >
            Могу научить
          </RadioButton>
        </FilterSection>

        <FilterSection
          title="Навыки"
          buttonTitle="Все категории"
          maxVisible={6}
        >
          {skills.map((category) => (
            <NestedCheckboxGroup
              key={category.name}
              title={category.name}
              mode={getModeForCategory(
                category.subcategories.map((sub) => sub.name),
                filters.subcategories
              )}
              onChange={handleCategoryChange}
            >
              {category.subcategories.map((subcategory) => (
                <Checkbox
                  key={subcategory.name}
                  name="subcategories"
                  value={subcategory.name}
                  checked={filters.subcategories.includes(subcategory.name)}
                  onChange={handleSubcategoryChange}
                >
                  {subcategory.name}
                </Checkbox>
              ))}
            </NestedCheckboxGroup>
          ))}
          <Checkbox
            name="subcategories"
            value="programming"
            checked={filters.subcategories.includes('programming')}
            onChange={handleSubcategoryChange}
          >
            Программирование
          </Checkbox>
        </FilterSection>

        <FilterSection title="Пол автора">
          <RadioButton
            name="gender"
            value="unknown"
            checked={filters.gender === 'unknown'}
            onChange={handleGenderChange}
          >
            Не имеет значения
          </RadioButton>
          <RadioButton
            name="gender"
            value="male"
            checked={filters.gender === 'male'}
            onChange={handleGenderChange}
          >
            Мужской
          </RadioButton>
          <RadioButton
            name="gender"
            value="female"
            checked={filters.gender === 'female'}
            onChange={handleGenderChange}
          >
            Женский
          </RadioButton>
        </FilterSection>

        <FilterSection title="Город" buttonTitle="Все города" maxVisible={5}>
          {cities.map((city) => (
            <Checkbox
              key={city}
              name="cities"
              value={city}
              checked={filters.cities.includes(city)}
              onChange={handleCityChange}
            >
              {city}
            </Checkbox>
          ))}
        </FilterSection>
      </div>
    </div>
  );
};
