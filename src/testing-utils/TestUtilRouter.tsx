import React, { FC } from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

export interface TestUtilRouterProps {
  route?: string;
  history?: ReturnType<typeof createMemoryHistory>;
}

function defaultRenderWithRouterOptions(
  options: TestUtilRouterProps,
): Required<TestUtilRouterProps> {
  const route = options.route || '/';
  const history =
    options.history || createMemoryHistory({ initialEntries: [route] });
  return { route, history };
}

const TestUtilRouter: FC<TestUtilRouterProps> = ({ children, route, history }) => {
  const { history: finalHistory } = defaultRenderWithRouterOptions({
    route,
    history,
  });
  return <Router history={finalHistory}>{children}</Router>;
};

export default TestUtilRouter;
