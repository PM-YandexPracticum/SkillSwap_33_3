import { expect, test } from '@jest/globals';
import * as testing from '@/shared/constants/testing';
import { usersSlice } from '@/features/slices/usersSlice';
import { skillsSlice } from '@/features/slices/skillsSlice';
import { authSlice } from '@/features/slices/authSlice';
import { store, rootReducer } from './store';

describe('тестируем корневой редьюсер', () => {
  const initialState = {
    [usersSlice.name]: usersSlice.getInitialState(),
    [skillsSlice.name]: skillsSlice.getInitialState(),
    [authSlice.name]: authSlice.getInitialState(),
  };

  test('тестируем начальное состояние', async () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('тестируем корневой редюсер после неизвестной акции', () => {
    const state = rootReducer(initialState, testing.unknownAction());
    expect(state).toEqual(initialState);
  });

  test('тестируем корневой редюсер c неопределенным начальным состоянием', () => {
    const state = rootReducer(undefined, testing.unknownAction());
    expect(state).toEqual(initialState);
  });
});
