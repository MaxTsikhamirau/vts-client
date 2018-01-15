import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import ManageEmployee from '../components/ManageEmployee/ManageEmployee';
import ViewEmployee from '../components/ViewEmployee/ViewEmployee';
import EmployeeTable from '../components/EmployeeTable/EmployeeTable';
import Login from '../components/Login/Login';

import { fetchEmployees } from '../functions/employeeFunctions';
import { fetchEmployeesAction } from '../reducers/employeeActions';

@connect(
  null,
  dispatch => ({
    fetchEmployees: () => dispatch(fetchEmployees())
  })
)
class App extends Component {

  componentDidMount = () => {
    this.props.fetchEmployees();
  }

  render() {
    return (
      <div className="App">
        <Panel>
          <Header />
        </Panel>
        <Panel header="Employees" bsStyle="primary" >
          <Switch>
            <Route exact path="/" component={EmployeeTable} />
            <Route exact path="/manage" component={ManageEmployee} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/manage/:id" component={ManageEmployee} />
            <Route exact path="/view/:id" component={ViewEmployee} />
          </Switch>
        </Panel>
      </div>
    );
  }
}

export default connect()(App);
