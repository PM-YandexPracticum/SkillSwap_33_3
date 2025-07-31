import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers, selectUsers } from '@/features/slices/usersSlice';
import { Card } from '@/shared/ui/Card';
import { FilterSidebar } from '@/widgets/FilterSidebar';
import styles from './Home.module.css';
import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';
import SortIcon from '@/assets/svg/icons/sort.svg?react';
import ChevronRightIcon from '@/assets/svg/icons/chevron-right.svg?react';
import { useUrlFilters } from './hooks/useUrlFilters';
import { ActiveFilters } from './components/ActiveFilters';
import {
  filterUsers,
  sortUsers,
  hasActiveFiltersOrSort,
  getSortButtonText,
  getNextSortMode,
} from './utils/filterUtils';

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  // Используем новый хук для управления фильтрами и сортировкой через URL
  const { filters, sortMode, updateFilters, updateSortMode } = useUrlFilters();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Применяем фильтрацию и сортировку
  const filteredUsers = useMemo(
    () => filterUsers(users, filters),
    [users, filters]
  );

  const sortedUsers = useMemo(
    () => sortUsers(filteredUsers, sortMode),
    [filteredUsers, sortMode]
  );

  // Проверяем есть ли активные фильтры или сортировка
  const hasActiveState = hasActiveFiltersOrSort(filters, sortMode);

  // Обработчик переключения сортировки
  const handleSortToggle = () => {
    const nextMode = getNextSortMode(sortMode);
    updateSortMode(nextMode);
  };

  // Обработчики для кнопок "Смотреть все" в дефолтных секциях
  const handleShowAllPopular = () => {
    updateSortMode('popular');
  };

  const handleShowAllNew = () => {
    updateSortMode('new');
  };

  // Если есть активные фильтры или сортировка - показываем результаты фильтрации
  if (hasActiveState) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <FilterSidebar filters={filters} onFiltersChange={updateFilters} />
          </aside>
          <div className={styles.content}>
            <ActiveFilters filters={filters} onFiltersChange={updateFilters} />
            <Section
              title={`Найдено ${sortedUsers.length} предложений`}
              button={
                <Button
                  variant="tertiary"
                  onClick={handleSortToggle}
                  style={{ marginLeft: '24px' }}
                >
                  <SortIcon />
                  {getSortButtonText(sortMode)}
                </Button>
              }
            >
              {sortedUsers.map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  liked={false}
                  onLikeClick={() => {}}
                  onMoreClick={() => {}}
                  isProposed={false}
                />
              ))}
            </Section>
          </div>
        </div>
      </main>
    );
  }

  // Дефолтный рендер с тремя секциями
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterSidebar filters={filters} onFiltersChange={updateFilters} />
        </aside>
        <div className={styles.content}>
          <Section
            title="Популярное"
            button={
              <Button variant="tertiary" onClick={handleShowAllPopular}>
                Смотреть все <ChevronRightIcon />
              </Button>
            }
          >
            {sortUsers(users, 'popular')
              .slice(0, 3)
              .map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  liked={false}
                  onLikeClick={() => {}}
                  onMoreClick={() => {}}
                  isProposed={false}
                />
              ))}
          </Section>
          <Section
            title="Новое"
            button={
              <Button variant="tertiary" onClick={handleShowAllNew}>
                Смотреть все <ChevronRightIcon />
              </Button>
            }
          >
            {sortUsers(users, 'new')
              .slice(0, 3)
              .map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  liked={false}
                  onLikeClick={() => {}}
                  onMoreClick={() => {}}
                  isProposed={false}
                />
              ))}
          </Section>
          <Section title="Рекомендуем">
            {sortUsers(users, 'recommended')
              .slice(0, 3)
              .map((user) => (
                <Card
                  key={user.id}
                  user={user}
                  liked={false}
                  onLikeClick={() => {}}
                  onMoreClick={() => {}}
                  isProposed={false}
                />
              ))}
          </Section>
        </div>
      </div>
    </main>
  );
}
