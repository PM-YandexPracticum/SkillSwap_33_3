import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { User } from '../../entities';
import { usersApi } from '../../api/client';

import type { RootState } from '../../app/store';
import type { UserResponse } from '../../api/client';
import type { Filters } from '../../shared/lib/types';

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

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await usersApi.getAll();
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

export const selectRawUsers = (state: RootState) => state.users.list;

export const selectUserModels = createSelector([selectRawUsers], (users) =>
  users.map((u) => new User(u))
);

export const selectUsersByFilters = createSelector(
  [selectUserModels, (_: RootState, filters: Filters) => filters],
  (users, filters) => {
    return users.filter((user) => {
      const matchesGender =
        filters.gender === 'unknown' || user.gender === filters.gender;
      const matchesCity =
        filters.cities.length === 0 || filters.cities.includes(user.city);

      let matchesMode = true;

      if (filters.mode === 'learn') {
        matchesMode = user.getLearningSkills(filters.subcategories).length > 0;
      } else if (filters.mode === 'teach') {
        matchesMode = user.getTeachingSkills(filters.subcategories).length > 0;
      } else if (filters.mode === 'all') {
        matchesMode =
          user.getLearningSkills(filters.subcategories).length > 0 ||
          user.getTeachingSkills(filters.subcategories).length > 0;
      }

      return matchesGender && matchesCity && matchesMode;
    });
  }
);
