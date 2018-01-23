import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Profile from './components/Profile/Profile';
import ManageEmployee from './components/ManageEmployee/ManageEmployee';
import ViewEmployee from './components/ViewEmployee/ViewEmployee';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Login from './components/Login/Login';

const routes = () => (
  <React.Fragment>
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/employees" component={EmployeeTable} />
      <Route exact path="/manage" component={ManageEmployee} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/manage/:id" component={ManageEmployee} />
      <Route exact path="/view/:id" component={ViewEmployee} />
    </Switch>
    {
      window.localStorage.token ? <Redirect to="/profile" /> : <Redirect to="/login" />
    }
  </React.Fragment>
);

export default routes;
