import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from '@/app/store';
import { fetchUsers } from '@/features/slices/usersSlice';

import { FilterSidebar } from '@/widgets/FilterSidebar';
import styles from './Home.module.css';
import { useUrlFilters } from './hooks/useUrlFilters';
import { hasActiveFiltersOrSort } from './utils/filterUtils';
import { Loader } from '@/shared/ui/Loader';

const DontFiltered = lazy(
  () => import('../../features/home/DontFiltered/DontFiltered')
);
const Filtered = lazy(() => import('@/features/home/Filtered/Filtered'));

function Home() {
  const dispatch = useDispatch();

  // Используем новый хук для управления фильтрами и сортировкой через URL
  const { filters, sortMode, updateFilters } = useUrlFilters();

  // Проверяем есть ли активные фильтры или сортировка
  const hasActiveState = hasActiveFiltersOrSort(filters, sortMode);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Дефолтный рендер с тремя секциями
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterSidebar filters={filters} onFiltersChange={updateFilters} />
        </aside>
        <div className={styles.content}>
          <Suspense fallback={<Loader />}>
            {hasActiveState ? <Filtered /> : <DontFiltered />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export const Component = Home;
