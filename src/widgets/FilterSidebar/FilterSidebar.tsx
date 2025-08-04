import React from 'react';
import { FilterSection } from '../../shared/ui/FilterSection';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RadioButton } from '../../shared/ui/RadioButton';
import styles from './FilterSidebar.module.css';
import type { Filters } from '../../shared/lib/types';
import { useSelector } from '../../app/store';
import { selectAllSkills } from '../../features/slices/skillsSlice';
import { NestedCheckboxGroup } from '../../shared/ui/NestedCheckboxGroup/NestedCheckboxGroup';

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
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
  'Краснодар',
  'Кемерово',
  'Владивосток',
  'Красноярск',
  'Иркутск',
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
}) => {
  const skills = useSelector(selectAllSkills);

  const handleReset = () => {
    onFiltersChange(defaultFilters);
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
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
    const newSubcategories =
      mode === 'none'
        ? [...filters.subcategories, ...subcategories]
        : filters.subcategories.filter((sub) => !subcategories.includes(sub));

    onFiltersChange({
      ...filters,
      subcategories: newSubcategories,
    });
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const newSubcategories = checked
      ? [...filters.subcategories, value]
      : filters.subcategories.filter((sub) => sub !== value);

    onFiltersChange({
      ...filters,
      subcategories: newSubcategories,
    });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      gender: event.target.value as 'unknown' | 'male' | 'female',
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const newCities = checked
      ? [...filters.cities, value]
      : filters.cities.filter((city) => city !== value);

    onFiltersChange({
      ...filters,
      cities: newCities,
    });
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
