import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';

function App() {
  // TODO: Github pages always shows 404. Fix it.
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact basename={`/${process.env.PUBLIC_URL}`} path="/">
            <Redirect
              to={{
                pathname: '/exercise1',
              }}
            />
          </Route>

          <Route exact path="/exercise1" component={Exercise1} />
          <Route exact path="/exercise2" component={Exercise2} />

          <Route path="*">
            <Redirect
              to={{
                pathname: '/exercise1',
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(module)(App) : App;
