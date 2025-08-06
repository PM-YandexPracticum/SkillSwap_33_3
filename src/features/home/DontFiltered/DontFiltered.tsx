import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';
import type React from 'react';
import ChevronRightIcon from '@/assets/svg/icons/chevron-right.svg?react';
import { sortUsers } from '@/pages/Home/utils/filterUtils';
import { Card } from '@/shared/ui/Card';
import { useUrlFilters } from '@/pages/Home/hooks/useUrlFilters';
import { useSelector } from '@/app/store';
import { selectUsers } from '@/features/slices/usersSlice';

const DontFiltered: React.FC = () => {
  const { updateSortMode } = useUrlFilters();
  const users = useSelector(selectUsers);

  const handleShowAllPopular = () => {
    updateSortMode('popular');
  };

  const handleShowAllNew = () => {
    updateSortMode('new');
  };
  return (
    <>
      <Section
        title="Популярное"
        button={
          <Button variant="tertiary" onClick={handleShowAllPopular}>
            Смотреть все <ChevronRightIcon />
          </Button>
        }
      >
        {users[0] &&
          sortUsers(users, 'popular')
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
        {users[0] &&
          sortUsers(users, 'new')
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
        {users[0] &&
          sortUsers(users, 'recommended')
            .slice(0, 9)
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
    </>
  );
};

export default DontFiltered;
