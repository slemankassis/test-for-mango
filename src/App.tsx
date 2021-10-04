import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Exercise1 from './exercises/components/Exercise1';
import Exercise2 from './exercises/components/Exercise2';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: '/exercise1',
              }}
            />
          </Route>

          <Route exact path="/exercise1" component={Exercise1} />
          <Route exact path="/exercise2" component={Exercise2} />

          <Route path="*" component={() => <span>404</span>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
