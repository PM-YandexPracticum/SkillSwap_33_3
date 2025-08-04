import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

// TODO: Убрать мок api юзеров, заменить на реальный сервер в проде
// import { usersApi } from '../../api/client';
import mockUsers from '../../../public/db/users.json';

import type { RootState } from '../../app/store';
import type { UserResponse } from '../../api/client';
import type { Filters } from '../../shared/lib/types';
import { getLearningSkills, getTeachingSkills } from '../../shared/lib/utils';

interface UsersState {
  list: UserResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

const fetchUsersExecutor = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Задержка 0.3 секунды
  return mockUsers;
};

// TODO: Убрать мок api юзеров, заменить на реальный сервер в проде
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     return await usersApi.getAll();
// });
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  fetchUsersExecutor
);

// Реализуем алгоритм на идеях приоритетной очереди для выбора заданного количества записей
// (это будет эффективнее простой сортировки для больших массивов данных)
function FilterByPriority<T>(
  data: Array<T>,
  more: (one: T, too: T) => boolean,
  count?: number
) {
  const defaultCount = 3;
  const safecount = Math.max(count ?? defaultCount, 1);
  const priorityQueue: number[] = [];

  data.forEach((user, index) => {
    if (
      priorityQueue.length < safecount ||
      more(user, data[priorityQueue[priorityQueue.length - 1]])
    ) {
      let i = 0;
      while (i < priorityQueue.length && !more(user, data[priorityQueue[i]])) {
        ++i;
      }
      priorityQueue.splice(i, 0, index);
      if (priorityQueue.length > safecount) {
        priorityQueue.pop();
      }
    }
  });

  return priorityQueue.map((index) => data[index]);
}

export const fetchPopularUsers = createAsyncThunk(
  'users/fetchPopularUsers',
  async (count?: number) =>
    fetchUsersExecutor().then((data) => {
      return FilterByPriority(
        data,
        (one, too) => {
          return one.likes > too.likes;
        },
        count
      );
    })
);

export const fetchRecentUsers = createAsyncThunk(
  'users/fetchRecentUsers',
  async (count?: number) =>
    fetchUsersExecutor().then((data) => {
      return FilterByPriority(
        data,
        (one, too) => {
          return one.birthDate > too.birthDate;
        },
        count
      );
    })
);

export const fetchNewUsers = createAsyncThunk(
  'users/fetchNewUsers',
  async (count?: number) =>
    fetchUsersExecutor().then((data) => {
      return FilterByPriority(
        data,
        (one, too) => {
          return one.id > too.id;
        },
        count
      );
    })
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserResponse[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });

    builder
      .addCase(fetchPopularUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        console.log('list accepted: ', action.payload);
      })
      .addCase(fetchPopularUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch popular users';
      });

    builder
      .addCase(fetchRecentUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        console.log('list accepted: ', action.payload);
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recent users';
      });

    builder
      .addCase(fetchNewUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        console.log('list accepted: ', action.payload);
      })
      .addCase(fetchNewUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch new users';
      });
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.list;

export const selectUsersFiltered = createSelector(
  [selectUsers, (_: RootState, filters: Filters) => filters],
  (users, filters) => {
    return users.filter((user) => {
      const matchesGender =
        filters.gender === 'unknown' || user.gender === filters.gender;
      const matchesCity =
        filters.cities.length === 0 || filters.cities.includes(user.city);

      let matchesMode = true;

      if (filters.mode === 'learn') {
        matchesMode = getLearningSkills(user, filters.subcategories).length > 0;
      } else if (filters.mode === 'teach') {
        matchesMode = getTeachingSkills(user, filters.subcategories).length > 0;
      } else if (filters.mode === 'all') {
        matchesMode =
          getLearningSkills(user, filters.subcategories).length > 0 ||
          getTeachingSkills(user, filters.subcategories).length > 0;
      }

      return matchesGender && matchesCity && matchesMode;
    });
  }
);
