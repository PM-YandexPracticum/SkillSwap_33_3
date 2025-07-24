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

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      mode: event.target.value as 'all' | 'learn' | 'teach',
    });
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

  return (
    <aside className={styles.filterSidebar}>
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
          <Checkbox
            name="skills"
            value="business"
            checked={filters.subcategories.includes('business')}
            onChange={handleSubcategoryChange}
          >
            Бизнес и карьера
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
          </Checkbox>
          <Checkbox
            name="skills"
            value="creativity"
            checked={filters.subcategories.includes('creativity')}
            onChange={handleSubcategoryChange}
          >
            Творчество и искусство
          </Checkbox>
          <Checkbox
            name="skills"
            value="languages"
            checked={filters.subcategories.includes('languages')}
            onChange={handleSubcategoryChange}
          >
            Иностранные языки
          </Checkbox>
          <Checkbox
            name="skills"
            value="education"
            checked={filters.subcategories.includes('education')}
            onChange={handleSubcategoryChange}
          >
            Образование и развитие
          </Checkbox>
          <Checkbox
            name="skills"
            value="health"
            checked={filters.subcategories.includes('health')}
            onChange={handleSubcategoryChange}
          >
            Здоровье и лайфстайл
          </Checkbox>
          <Checkbox
            name="skills"
            value="home"
            checked={filters.subcategories.includes('home')}
            onChange={handleSubcategoryChange}
          >
            Дом и уют
          </Checkbox>
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
          <Checkbox
            name="cities"
            value="moscow"
            checked={filters.cities.includes('moscow')}
            onChange={handleCityChange}
          >
            Москва
          </Checkbox>
          <Checkbox
            name="cities"
            value="saint-petersburg"
            checked={filters.cities.includes('saint-petersburg')}
            onChange={handleCityChange}
          >
            Санкт-Петербург
          </Checkbox>
          <Checkbox
            name="cities"
            value="novosibirsk"
            checked={filters.cities.includes('novosibirsk')}
            onChange={handleCityChange}
          >
            Новосибирск
          </Checkbox>
          <Checkbox
            name="cities"
            value="ekaterinburg"
            checked={filters.cities.includes('ekaterinburg')}
            onChange={handleCityChange}
          >
            Екатеринбург
          </Checkbox>
          <Checkbox
            name="cities"
            value="kazan"
            checked={filters.cities.includes('kazan')}
            onChange={handleCityChange}
          >
            Казань
          </Checkbox>
          <Checkbox
            name="cities"
            value="sochi"
            checked={filters.cities.includes('sochi')}
            onChange={handleCityChange}
          >
            Сочи
          </Checkbox>
        </FilterSection>
      </div>
    </aside>
  );
};
