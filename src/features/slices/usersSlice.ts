import {
  createSlice,
  createSelector,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { usersApi, type UserResponse } from '../../api/client';
import type { Filters } from '../../shared/lib/types';
import { getLearningSkills, getTeachingSkills } from '../../shared/lib/utils';
import mockUsersUnpopular from '../../../public/db/usersUnpopular.json';
import mockUsers from '../../../public/db/users.json';
import mockUsersOld from '../../../public/db/usersOld.json';

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

// Для генерации идентификаторов пользователей используем линейный конгруентный
//  генератор случайных чисел в кольце по модулю простого числа 1000000009.
let seed: number = 1;
function randomId() {
  seed = (seed * 1103515245 + 12345) % 1000000009;
  return seed;
}

function patchUsers(users: UserResponse[]) {
  return users.map((user) => ({ ...user, id: randomId() }));
}

export const fetchPopularUsers = createAsyncThunk(
  'users/fetchPopularUsers',
  () => {
    return patchUsers(mockUsersUnpopular);
  }
);

export const fetchRecentUsers = createAsyncThunk(
  'users/fetchRecentUsers',
  () => {
    return patchUsers(mockUsers);
  }
);

export const fetchNewUsers = createAsyncThunk('users/fetchNewUsers', () => {
  return patchUsers(mockUsersOld);
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
      .addCase(fetchPopularUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.concat(action.payload);
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
        state.list = state.list.concat(action.payload);
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
        state.list = state.list.concat(action.payload);
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
        matchesMode = getTeachingSkills(user, filters.subcategories).length > 0;
      } else if (filters.mode === 'teach') {
        matchesMode = getLearningSkills(user, filters.subcategories).length > 0;
      } else if (filters.mode === 'all') {
        matchesMode =
          getLearningSkills(user, filters.subcategories).length > 0 ||
          getTeachingSkills(user, filters.subcategories).length > 0;
      }

      return matchesGender && matchesCity && matchesMode;
    });
  }
);
