import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/styles.scss'

// Components
import Header from './components/Header';
import Home from './components/Home'

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;