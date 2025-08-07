import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

// TODO: Убрать мок api юзера, заменить на реальный сервер в проде
// import { userApi } from '../../api/client';
import mockUser from '../../../public/db/user.json';

import type { RootState } from '../../app/store';
import type { UserAuthResponse } from '../../api/authClient';

export interface AuthState {
  user: UserAuthResponse | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
};

// TODO: Убрать мок api юзера, заменить на реальный сервер в проде
// export const fetchUsers = createAsyncThunk('auth/fetchUser', async () => {
//     return await userApi.get();
// });
export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Задержка 0.3 секунды
  return mockUser as UserAuthResponse;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
    },
    markNotificationsAsRead(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.notifications = state.user.notifications.map(
          (notification) =>
            action.payload.includes(notification.id)
              ? { ...notification, viewed: true }
              : notification
        );
      }
    },
    removeNotifications(state, action: PayloadAction<string[]>) {
      if (state.user) {
        state.user.notifications = state.user.notifications.filter(
          (notification) => !action.payload.includes(notification.id)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserAuthResponse>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuth = true;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { logout, markNotificationsAsRead, removeNotifications } =
  authSlice.actions;
