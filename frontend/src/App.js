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
import UserForm from './components/UserForm';
import Footer from './components/Footer';

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/new">
          <UserForm />
        </Route>
        <Route exact path="/update/:id">
          <UserForm />
        </Route>
      </Switch>
    </Router>
    <Footer />
  </Provider>
);

export default App;