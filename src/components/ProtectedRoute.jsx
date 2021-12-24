import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import AppContext from '../context/AppContext';

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const auth = useContext(AppContext);

  return auth.isAuthenticated ? (
    <Route
      {...restOfProps}
      render={(props) => {
        return <Component {...props} context={auth} />;
      }}
    />
  ) : (
    <Redirect to='/login' />
  );
};

export default ProtectedRoute;
