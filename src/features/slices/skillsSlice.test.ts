import { expect, test } from '@jest/globals';
import { skillsSlice, fetchSkills, type SkillsState } from './skillsSlice';
import * as testing from '@/shared/constants/testing';
import mockSkills from '../../../public/db/skills.json';

describe('тестируем редьюсер списка навыков', () => {
  const reducer = skillsSlice.reducer;
  const mockStateSkills: SkillsState = {
    list: [],
    loading: false,
    error: null,
  };

  test('запрос списка навыков', () => {
    const state = reducer(mockStateSkills, fetchSkills.pending(''));
    expect(state.list).toBeTruthy();
    expect(state.list).toHaveLength(0);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('неудачный запрос списка навыков', () => {
    const state = reducer(
      {
        ...mockStateSkills,
        loading: true,
      },
      fetchSkills.rejected(new Error(testing.errorMessage), '')
    );
    expect(state.list).toBeTruthy();
    expect(state.list).toHaveLength(0);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(testing.errorMessage);
  });

  test('удачный запрос списка навыков', () => {
    const state = reducer(
      mockStateSkills,
      fetchSkills.fulfilled(mockSkills, '')
    );
    expect(state.list).toEqual(mockSkills);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
