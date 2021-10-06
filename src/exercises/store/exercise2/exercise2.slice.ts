import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UNKNOWN_ERROR } from '../../../misc/constants';
import { AppThunk } from '../../../store/store';
import MokableApi from '../../services/mokable-api';

export interface ReposState {
  options?: number[];
  isLoading: boolean;
  error?: string;
}

const initialState: ReposState = {
  isLoading: false,
};

const exercise2Slice = createSlice({
  name: 'exercise2',
  initialState,
  reducers: {
    loadExercise2OptionsStart(state) {
      state.isLoading = true;
    },
    loadExercise2OptionsSuccess(
      state,
      { payload }: PayloadAction<{ options: number[] }>,
    ) {
      state.isLoading = false;
      state.options = payload.options;
      state.error = undefined;
    },
    loadExercise2OptionsFailure(
      state,
      { payload }: PayloadAction<{ error: string }>,
    ) {
      state.isLoading = false;
      state.error = payload.error;
    },
  },
});

export default exercise2Slice.reducer;

export const {
  loadExercise2OptionsStart,
  loadExercise2OptionsSuccess,
  loadExercise2OptionsFailure,
} = exercise2Slice.actions;

export const loadExercise2Options =
  (): AppThunk<Promise<AnyAction>> => (dispatch) => {
    dispatch(loadExercise2OptionsStart());

    return MokableApi.getExercise2Options()
      .then((response) => {
        return dispatch(
          loadExercise2OptionsSuccess({
            options: response.data.values,
          }),
        );
      })
      .catch((err) => {
        return dispatch(
          loadExercise2OptionsFailure({
            error: err.message || UNKNOWN_ERROR,
          }),
        );
      });
  };
