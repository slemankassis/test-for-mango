import React, { FC } from 'react';
import TestUtilRedux, { TestUtilReduxProps } from './TestUtilRedux';
import TestUtilRouter, { TestUtilRouterProps } from './TestUtilRouter';

export type TestUtilReduxAndORouterProps = TestUtilReduxProps & TestUtilRouterProps;

const TestUtilReduxAndRouter: FC<TestUtilReduxAndORouterProps> = ({
  children,
  customStore,
  route,
  history,
}) => {
  return (
    <TestUtilRedux customStore={customStore}>
      <TestUtilRouter route={route} history={history}>
        {children}
      </TestUtilRouter>
    </TestUtilRedux>
  );
};

export default TestUtilReduxAndRouter;
