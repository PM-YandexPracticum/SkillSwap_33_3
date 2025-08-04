import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

// TODO: Убрать мок api юзеров, заменить на реальный сервер в проде
// import { usersApi } from '../../api/client';
import mockUsers from '../../../public/db/users.json';
import mockUsersUnpopular from '../../../public/db/usersUnpopular.json';
import mockUsersOld from '../../../public/db/usersOld.json';

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

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 300)); // Задержка 0.3 секунды
}

// TODO: Убрать мок api юзеров, заменить на реальный сервер в проде
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     return await usersApi.getAll();
// });
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await delay();
  return mockUsers;
});

// Для генерации идентификаторов пользователей используем линейный конгруентный
//  генератор случайных чисел в кольце по модулю простого числа 1000000009.
let seed: number = 1;
function randomId() {
  seed = (seed * 1103515245 + 12345) % 1000000009;
  return seed.toString();
}

function patchUsers(users: UserResponse[]) {
  return users.map((user) => ({ ...user, id: randomId() }));
}

export const fetchUnPopularUsers = createAsyncThunk(
  'users/fetchUnPopularUsers',
  () => {
    return delay().then(() => patchUsers(mockUsersUnpopular));
  }
);

export const fetchRecentUsers = createAsyncThunk(
  'users/fetchRecentUsers',
  () => {
    return delay().then(() => patchUsers(mockUsers));
  }
);

export const fetchOldUsers = createAsyncThunk('users/fetchOldUsers', () => {
  return delay().then(() => patchUsers(mockUsersOld));
});

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
      .addCase(fetchUnPopularUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnPopularUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.concat(action.payload);
      })
      .addCase(fetchUnPopularUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch unpopular users';
      });

    builder
      .addCase(fetchRecentUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.concat(action.payload);
      })
      .addCase(fetchRecentUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recent users';
      });

    builder
      .addCase(fetchOldUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOldUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.concat(action.payload);
      })
      .addCase(fetchOldUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch old users';
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
