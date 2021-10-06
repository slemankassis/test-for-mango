import { RootState } from '../../../store/root-reducer';

export const getExercise2State = (state: RootState) => ({
  options: state.exercise2.options,
  isLoading: state.exercise2.isLoading,
  error: state.exercise2.error,
});
