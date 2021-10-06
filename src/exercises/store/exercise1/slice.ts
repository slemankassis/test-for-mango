import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '../../../misc/constants';
import { MinAndMax } from '../../../misc/models/MinAndMax';
import { AppThunk } from '../../../store/store';
import MokableApi from '../../services/api';

export interface ReposState {
  options?: MinAndMax;
  isLoading: boolean;
  error?: string;
}

const initialState: ReposState = {
  isLoading: false,
};

const exercise1Slice = createSlice({
  name: 'exercise1',
  initialState,
  reducers: {
    loadExercise1OptionsStart(state) {
      state.isLoading = true;
    },
    loadExercise1OptionsSuccess(
      state,
      { payload }: PayloadAction<{ options: MinAndMax }>,
    ) {
      state.isLoading = false;
      state.options = payload.options;
      state.error = undefined;
    },
    loadExercise1OptionsFailure(
      state,
      { payload }: PayloadAction<{ error: string }>,
    ) {
      state.isLoading = false;
      state.error = payload.error;
    },
  },
});

export default exercise1Slice.reducer;

export const {
  loadExercise1OptionsStart,
  loadExercise1OptionsSuccess,
  loadExercise1OptionsFailure,
} = exercise1Slice.actions;

export const loadExercise1Options =
  (): AppThunk<Promise<AnyAction>> => (dispatch) => {
    dispatch(loadExercise1OptionsStart());

    return MokableApi.getExercise1Options()
      .then((response) => {
        return dispatch(
          loadExercise1OptionsSuccess({
            options: response.data,
          }),
        );
      })
      .catch((err) => {
        return dispatch(
          loadExercise1OptionsFailure({
            error: err.message || UNKNOWN_ERROR,
          }),
        );
      });
  };
