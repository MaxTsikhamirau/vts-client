import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ManageEmployee from './components/ManageEmployee/ManageEmployee';
import ViewEmployee from './components/ViewEmployee/ViewEmployee';
import EmployeeTable from './components/EmployeeTable/EmployeeTable';
import Login from './components/Login/Login';

const routes = () => (
  <Switch>
    <Route exact path="/" component={EmployeeTable} />
    <Route exact path="/manage" component={ManageEmployee} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/manage/:id" component={ManageEmployee} />
    <Route exact path="/view/:id" component={ViewEmployee} />
    { window.localStorage.token && <Redirect to="/login" /> }
  </Switch>
);

export default routes;
