import React, { useState } from 'react';
import { FilterSection } from '../../shared/ui/FilterSection';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RadioButton } from '../../shared/ui/RadioButton';
import styles from './FilterSidebar.module.css';
import type { Filters } from '../../shared/lib/types';
import chevronDownIcon from '../../assets/svg/icons/chevron-down.svg';
import clsx from 'clsx';

const defaultFilters: Filters = {
  mode: 'all',
  subcategories: [],
  gender: 'unknown',
  cities: [],
};

export const FilterSidebar: React.FC = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isBusinessExpanded, setIsBusinessExpanded] = useState(false);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const toggleBusinessExpand = () => {
    setIsBusinessExpanded(!isBusinessExpanded);
  };

  const handleModeChange = (value: string) => {
    setFilters({ ...filters, mode: value as 'all' | 'learn' | 'teach' });
  };

  const handleSubcategoryChange = (value: string) => {
    const newSubcategories = filters.subcategories.includes(value)
      ? filters.subcategories.filter((sub) => sub !== value)
      : [...filters.subcategories, value];
    setFilters({ ...filters, subcategories: newSubcategories });
  };

  const handleGenderChange = (value: string) => {
    setFilters({ ...filters, gender: value as 'unknown' | 'male' | 'female' });
  };

  const handleCityChange = (value: string) => {
    const newCities = filters.cities.includes(value)
      ? filters.cities.filter((city) => city !== value)
      : [...filters.cities, value];
    setFilters({ ...filters, cities: newCities });
  };

  const hasFiltersChanged =
    JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Фильтры</h2>
        {hasFiltersChanged && (
          <button className={styles.resetButton} onClick={handleReset}>
            Сбросить
          </button>
        )}
      </div>
      <div className={styles.wrapper}>
        <FilterSection>
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="filter-mode"
              value="all"
              checked={filters.mode === 'all'}
              onChange={() => handleModeChange('all')}
            >
              Всё
            </RadioButton>
          </div>
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="filter-mode"
              value="learn"
              checked={filters.mode === 'learn'}
              onChange={() => handleModeChange('learn')}
            >
              Хочу научиться
            </RadioButton>
          </div>
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="filter-mode"
              value="teach"
              checked={filters.mode === 'teach'}
              onChange={() => handleModeChange('teach')}
            >
              Могу научить
            </RadioButton>
          </div>
        </FilterSection>

        <FilterSection
          title="Навыки"
          buttonTitle="Все категории"
          maxVisible={6}
        >
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="business"
              checked={filters.subcategories.includes('business')}
              onChange={() => handleSubcategoryChange('business')}
            >
              Бизнес и карьера
            </Checkbox>
            <img
              src={chevronDownIcon}
              alt="Стрелка вниз"
              className={clsx(
                styles.chevronIcon,
                isBusinessExpanded && styles.rotated
              )}
              onClick={(e) => {
                e.stopPropagation();
                toggleBusinessExpand();
              }}
            />
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="creativity"
              checked={filters.subcategories.includes('creativity')}
              onChange={() => handleSubcategoryChange('creativity')}
            >
              Творчество и искусство
            </Checkbox>
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="languages"
              checked={filters.subcategories.includes('languages')}
              onChange={() => handleSubcategoryChange('languages')}
            >
              Иностранные языки
            </Checkbox>
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="education"
              checked={filters.subcategories.includes('education')}
              onChange={() => handleSubcategoryChange('education')}
            >
              Образование и развитие
            </Checkbox>
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="health"
              checked={filters.subcategories.includes('health')}
              onChange={() => handleSubcategoryChange('health')}
            >
              Здоровье и лайфстайл
            </Checkbox>
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="skills"
              value="home"
              checked={filters.subcategories.includes('home')}
              onChange={() => handleSubcategoryChange('home')}
            >
              Дом и уют
            </Checkbox>
          </div>
          <div className={styles.checkboxWrapper}>
            <Checkbox
              name="subcategories"
              value="programming"
              checked={filters.subcategories.includes('programming')}
              onChange={() => handleSubcategoryChange('programming')}
            >
              Программирование
            </Checkbox>
          </div>
        </FilterSection>

        <FilterSection title="Пол автора">
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="gender"
              value="unknown"
              checked={filters.gender === 'unknown'}
              onChange={() => handleGenderChange('unknown')}
            >
              Не имеет значения
            </RadioButton>
          </div>
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="gender"
              value="male"
              checked={filters.gender === 'male'}
              onChange={() => handleGenderChange('male')}
            >
              Мужской
            </RadioButton>
          </div>
          <div className={styles.checkboxWrapper}>
            <RadioButton
              name="gender"
              value="female"
              checked={filters.gender === 'female'}
              onChange={() => handleGenderChange('female')}
            >
              Женский
            </RadioButton>
          </div>
        </FilterSection>

        <FilterSection title="Город" buttonTitle="Все города" maxVisible={5}>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="moscow"
              checked={filters.cities.includes('moscow')}
              onChange={() => handleCityChange('moscow')}
            >
              Москва
            </Checkbox>
          </div>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="saint-petersburg"
              checked={filters.cities.includes('saint-petersburg')}
              onChange={() => handleCityChange('saint-petersburg')}
            >
              Санкт-Петербург
            </Checkbox>
          </div>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="novosibirsk"
              checked={filters.cities.includes('novosibirsk')}
              onChange={() => handleCityChange('novosibirsk')}
            >
              Новосибирск
            </Checkbox>
          </div>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="ekaterinburg"
              checked={filters.cities.includes('ekaterinburg')}
              onChange={() => handleCityChange('ekaterinburg')}
            >
              Екатеринбург
            </Checkbox>
          </div>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="kazan"
              checked={filters.cities.includes('kazan')}
              onChange={() => handleCityChange('kazan')}
            >
              Казань
            </Checkbox>
          </div>
          <div className={styles.cityCheckboxWrapper}>
            <Checkbox
              name="cities"
              value="sochi"
              checked={filters.cities.includes('sochi')}
              onChange={() => handleCityChange('sochi')}
            >
              Сочи
            </Checkbox>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};
