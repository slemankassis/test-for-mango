import { RootState } from '../../../store/root-reducer';

export const getExercise1State = (state: RootState) => ({
  options: state.exercise1.options,
  isLoading: state.exercise1.isLoading,
  error: state.exercise1.error,
});
