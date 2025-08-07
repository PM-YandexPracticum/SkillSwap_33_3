import { expect, test } from '@jest/globals';
import {
  usersSlice,
  fetchUsers,
  fetchPopularUsers,
  fetchRecentUsers,
  fetchNewUsers,
  type UsersState,
} from './usersSlice';
import * as testing from '@/shared/constants/testing';
import mockUsers from '../../../public/db/users.json';
import mockUnpopularUsers from '../../../public/db/usersUnpopular.json';
import mockOldUsers from '../../../public/db/usersOld.json';

describe('тестируем редьюсер списка пользователей', () => {
  const reducer = usersSlice.reducer;
  const mockStateUsers: UsersState = {
    list: [],
    loading: false,
    error: null,
  };

  test('запрос списка пользователей', () => {
    const state = reducer(mockStateUsers, fetchUsers.pending(''));
    expect(state.list).toBeTruthy();
    expect(state.list).toHaveLength(0);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос списка пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        loading: true,
      },
      fetchUsers.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.list).toBeTruthy();
    expect(state.list).toHaveLength(0);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос списка пользователей', () => {
    const state = reducer(mockStateUsers, fetchUsers.fulfilled(mockUsers, ''));
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('запрос дополнительных популярных пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
      },
      fetchPopularUsers.pending('')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос дополнительных популярных пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchPopularUsers.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос дополнительных популярных пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchPopularUsers.fulfilled(mockUnpopularUsers, '')
    );
    expect(state.list).toEqual(mockUsers.concat(mockUnpopularUsers));
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('запрос дополнительных недавних пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
      },
      fetchRecentUsers.pending('')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос дополнительных недавних пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchRecentUsers.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос дополнительных недавних пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchRecentUsers.fulfilled(mockUnpopularUsers, '')
    );
    expect(state.list).toEqual(mockUsers.concat(mockUnpopularUsers));
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('запрос дополнительных новых пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
      },
      fetchNewUsers.pending('')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос дополнительных новых пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchNewUsers.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.list).toEqual(mockUsers);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос дополнительных новых пользователей', () => {
    const state = reducer(
      {
        ...mockStateUsers,
        list: mockUsers,
        loading: true,
      },
      fetchNewUsers.fulfilled(mockOldUsers, '')
    );
    expect(state.list).toEqual(mockUsers.concat(mockOldUsers));
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
