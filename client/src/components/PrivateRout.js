import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
     localStorage.getItem('access_token') ? <Component {...props} /> : <Redirect to="/login"/>   
    )}/>
)

export default PrivateRoute;