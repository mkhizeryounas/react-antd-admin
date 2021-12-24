import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/global.scss';
import { Row, Result, Button } from 'antd';

import AppContext from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';

import './index.scss';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';

import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import 'bootstrap-grid-only-css/dist/css/bootstrap-grid.min.css';

const NoMatchPage = () => {
  return (
    <Row style={{ marginTop: '8%' }}>
      <center>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={
              <Link to='/'>
                <Button type='primary'>Back to home</Button>
              </Link>
            }
          />
        </div>
      </center>
    </Row>
  );
};

const USER_KEY = 'x-pg-user';

const Routing = (props) => {
  const storedUser = window.localStorage.getItem(USER_KEY);
  const initialState = {
    isAuthenticated: storedUser ? true : false,
    user: storedUser ? JSON.parse(storedUser) : null,
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
      className='bootstrap-wrapper'
    >
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <Redirect to={`/${isAuthenticated ? 'dashboard' : 'login'}`} />
            )}
          />
          {/* <Route exact path='/editor' component={Editor} /> */}

          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path='*' component={NoMatchPage} />
        </Switch>
      </Router>
    </AppContext.Provider>
  );
};

ReactDOM.render(
  <>
    <Routing />
  </>,
  document.getElementById('root')
);
