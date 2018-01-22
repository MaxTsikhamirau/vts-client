import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import jwtDecode from 'jwt-decode';

import Header from '../components/Header/Header';
import ManageEmployee from '../components/ManageEmployee/ManageEmployee';
import ViewEmployee from '../components/ViewEmployee/ViewEmployee';
import EmployeeTable from '../components/EmployeeTable/EmployeeTable';
import Login from '../components/Login/Login';
import { logout } from '../functions/loginFunctions';

@translate('translations')
@connect(store => ({
  nav_label: store.navigation.get('nav_label')
}))
class App extends Component {
  render() {
    const roles = localStorage.token ? jwtDecode(localStorage.token).roles : [];
    const stories = {
      ADMIN: ['can crud on users', 'can assign user roles'],
      OFFICE: ['can crud on employees', 'can view vacations', 'can grab reports'],
      MANAGER: ['can view employees', 'can view vacations', 'can approve/reject vacations', 'can grab reports'],
      EMPLOYEE: ['can crud on their vacations', 'can change their password']
    }
    return (
      <div className="App">
        <Panel>
          <Header />
        </Panel>
        <Panel header={this.props.nav_label} bsStyle="primary" >
          {
            window.localStorage.token ?
            <Switch>
              <Route exact path="/" component={EmployeeTable} />
              <Route exact path="/manage" component={ManageEmployee} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/manage/:id" component={ManageEmployee} />
              <Route exact path="/view/:id" component={ViewEmployee} />
            </Switch> :
            <Switch>
              <Route exact path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          }
        </Panel>
        <Button style={{ marginRight: '5px' }} onClick={logout}>logout</Button>
        <Button style={{ marginRight: '5px' }} onClick={() => this.props.i18n.changeLanguage('ru')}>ru</Button>
        <Button style={{ marginRight: '5px' }} onClick={() => this.props.i18n.changeLanguage('en')}>en</Button>
        Roles: { roles.map(r => <span key={r}>{r} </span>) }<br/><br/>
        Stories: { roles.map(r => {
          return stories[r].map((s, si) => <div key={r + si}>{s}</div>);
        })}
      </div>
    );
  }
}

export default connect()(App);
