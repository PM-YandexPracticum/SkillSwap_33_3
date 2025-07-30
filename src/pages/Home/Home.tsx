import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/app/store';
import { fetchUsers, selectUsers } from '@/features/slices/usersSlice';
import { Card } from '@/shared/ui/Card';
import { FilterSidebar } from '@/widgets/FilterSidebar';
import type { UserResponse } from '@/api/client';
import styles from './Home.module.css';
import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';
import ChevronRightIcon from '@/assets/svg/icons/chevron-right.svg?react';

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const popular = [...users].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const newest = [...users]
    .filter((u) => !popular.includes(u))
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3);
  const recommended = users.filter(
    (u) => !popular.includes(u) && !newest.includes(u)
  );

  const renderSection = (
    title: string,
    data: UserResponse[],
    showMore: () => void
  ) => (
    <Section
      title={title}
      button={
        <Button variant="tertiary" onClick={showMore}>
          Смотреть все <ChevronRightIcon />
        </Button>
      }
    >
      {data.map((user) => (
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
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterSidebar />
        </aside>
        <div className={styles.content}>
          {renderSection('Популярное', popular, () => {})}
          {renderSection('Новое', newest, () => {})}
          {renderSection('Рекомендуем', recommended, () => {})}
        </div>
      </div>
    </main>
  );
}
