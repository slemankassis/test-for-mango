import { combineReducers } from '@reduxjs/toolkit';
import exercise1 from '../exercises/store/exercise1/slice';
import exercise2 from '../exercises/store/exercise2/slice';

const rootReducer = combineReducers({
  exercise1,
  exercise2,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
