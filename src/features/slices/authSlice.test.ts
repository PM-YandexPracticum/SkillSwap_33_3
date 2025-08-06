import { expect, test } from '@jest/globals';
import {
  authSlice,
  fetchUser,
  logout,
  markNotificationsAsRead,
  removeNotifications,
  type AuthState,
} from './authSlice';
import type { UserAuthResponse } from '@/api/authClient';
import * as testing from '@/shared/constants/testing';
import mockUser from '../../../public/db/user.json';

describe('тестируем редьюсер авторизации', () => {
  const reducer = authSlice.reducer;

  const mockStateAuth: AuthState = {
    user: null,
    isAuth: false,
    loading: false,
    error: null,
  };

  const mockUserAuthResponse: UserAuthResponse = {
    ...mockUser,
    isEmailVerified: true,
    createdAt: 'some time',
    updatedAt: 'some time',
  };

  test('запрос авторизации', () => {
    const state = reducer(mockStateAuth, fetchUser.pending(''));
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос авторизации', () => {
    const state = reducer(
      {
        ...mockStateAuth,
        loading: true,
      },
      fetchUser.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос авторизации', () => {
    const state = reducer(
      mockStateAuth,
      fetchUser.fulfilled(mockUserAuthResponse, '')
    );
    expect(state.user).toEqual(mockUserAuthResponse);
    expect(state.isAuth).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('запрос выхода', () => {
    const state = reducer(
      {
        ...mockStateAuth,
        user: mockUserAuthResponse,
        isAuth: true,
      },
      logout()
    );
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('отметка оповещения', () => {
    const notify_ids: string[] = mockUserAuthResponse.notifications
      .filter((notify) => !notify.viewed)
      .map((notify) => notify.id);
    expect(notify_ids).not.toHaveLength(0);

    const state = reducer(
      {
        ...mockStateAuth,
        user: mockUserAuthResponse,
        isAuth: true,
      },
      markNotificationsAsRead(notify_ids)
    );
    expect(state.user).not.toBeFalsy();
    expect(state.isAuth).toBe(true);
    expect(state.user!.notifications).toHaveLength(
      mockUserAuthResponse.notifications.length
    );
    expect(
      state.user!.notifications.filter((notify) => !notify.viewed)
    ).toHaveLength(0);
  });

  test('удаление оповещения', () => {
    const notify_ids: string[] = mockUserAuthResponse.notifications
      .filter((notify) => notify.viewed)
      .map((notify) => notify.id);
    expect(notify_ids).not.toHaveLength(0);

    const state = reducer(
      {
        ...mockStateAuth,
        user: mockUserAuthResponse,
        isAuth: true,
      },
      removeNotifications(notify_ids)
    );
    expect(state.user).not.toBeFalsy();
    expect(state.isAuth).toBe(true);
    expect(state.user!.notifications).toEqual(
      mockUserAuthResponse.notifications.filter((notify) => !notify.viewed)
    );
  });
});
