import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { skillsApi, type SkillResponse } from '../../api/client';

export interface SkillsState {
  list: SkillResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  return await skillsApi.getAll();
});

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSkills(state, action: PayloadAction<SkillResponse[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skills';
      });
  },
});

export const { setSkills } = skillsSlice.actions;

export const selectAllSkills = (state: RootState) => state.skills.list;
