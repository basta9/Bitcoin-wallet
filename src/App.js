import React, { Component } from 'react';
import HomePage from './pages/HomePage'
import StatisticPage from './pages/StatisticPage'
import ContactEditPage from './pages/ContactEditPage/ContactEditPage'
import ContactDetails from './pages/ContactDetails'
import ContactPage from './pages/ContactPage'
import SignUp from './pages/SignUpPage/SingUpPage'
import NavBar from './components/NavBar/NavBar'
import { inject } from 'mobx-react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css'
import 'animate.css'

const PrivateRoute = props => {
  return !!localStorage.loggedUser
    ? <Route {...props} />
    : <Redirect to="/signup" />;
}

@inject('store')
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar></NavBar>
          <div className="main-view">
            <Switch>
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/" exact component={HomePage} />
              <PrivateRoute path="/contact/:id" exact component={ContactDetails} />
              <PrivateRoute path="/statistics" exact component={StatisticPage} />
              <PrivateRoute path="/contactDetails" exact component={ContactPage} />
              <PrivateRoute path="/contactEdit/:id?" exact component={ContactEditPage} />
              <PrivateRoute path="/Bitcoin-wallet/" exact />
            </Switch>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
