import { Button } from '@/shared/ui/Button';
import { Section } from '@/shared/ui/Section';
import type React from 'react';
import { Card } from '@/shared/ui/Card';
import SortIcon from '@/assets/svg/icons/sort.svg?react';
import ChevronDownIcon from '@/assets/svg/icons/chevron-down.svg?react';
import { ActiveFilters } from './components/ActiveFilters';
import {
  getNextSortMode,
  getSortButtonText,
  sortUsers,
} from '@/pages/Home/utils/filterUtils';
import { useDispatch, useSelector } from '@/app/store';
import {
  fetchNewUsers,
  fetchPopularUsers,
  fetchRecentUsers,
  selectUsers,
  selectUsersFiltered,
} from '@/features/slices/usersSlice';
import { useUrlFilters } from '@/pages/Home/hooks/useUrlFilters';
import { useMemo } from 'react';

const Filtered: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, sortMode, updateFilters, updateSortMode } = useUrlFilters();

  // Используем селектор для получения отфильтрованных пользователей
  const filteredUsers = useSelector((state) =>
    selectUsersFiltered(state, filters)
  );
  const users = useSelector(selectUsers);

  const sortedUsers = useMemo(
    () => sortUsers(filteredUsers, sortMode),
    [filteredUsers, sortMode]
  );

  // Обработчик переключения сортировки
  const handleSortToggle = () => {
    const nextMode = getNextSortMode(sortMode);
    updateSortMode(nextMode);
  };

  // Обработчики для кнопок "Смотреть все" в дефолтных секциях

  const hadleAppendUsers = () => {
    switch (sortMode) {
      case 'new':
        dispatch(fetchNewUsers());
        break;
      case 'popular':
        dispatch(fetchPopularUsers());
        break;
      case 'recommended':
        dispatch(fetchRecentUsers());
        break;
    }
  };

  return (
    <>
      <ActiveFilters filters={filters} onFiltersChange={updateFilters} />
      <Section
        title={`Найдено ${sortedUsers.length} предложений`}
        button={
          <Button variant="tertiary" onClick={handleSortToggle}>
            <SortIcon />
            {getSortButtonText(sortMode)}
          </Button>
        }
      >
        {users[0] &&
          sortedUsers.map((user) => (
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
      <Section>
        <Button variant="tertiary" onClick={hadleAppendUsers}>
          Показать больше <ChevronDownIcon />
        </Button>
      </Section>
    </>
  );
};

export default Filtered;
