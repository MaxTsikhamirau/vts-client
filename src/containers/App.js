import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

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
      </div>
    );
  }
}

export default connect()(App);
