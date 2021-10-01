import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';

function App() {
  return (
    // <Provider store={null}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect
            to={{
              pathname: '/exercise1',
            }}
          />
        </Route>
        <Route path="/exercise1" component={Exercise1} exact />
        <Route path="/exercise2" component={Exercise2} exact />
        <Route path="*" component={() => <span>404</span>} />
      </Switch>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
