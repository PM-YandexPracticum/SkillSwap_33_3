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

// TODO: Убрать мок api юзеров, заменить на реальный сервер в проде
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     return await usersApi.getAll();
// });
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Задержка 0.3 секунды
  return mockUsers;
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
