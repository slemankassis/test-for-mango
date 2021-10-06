import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export interface TestUtilReduxProps {
  customStore?: typeof store;
}

const TestUtilRedux: FC<TestUtilReduxProps> = ({ children, customStore }) => {
  const finalStore = customStore || store;

  return <Provider store={finalStore}>{children}</Provider>;
};

export default TestUtilRedux;
