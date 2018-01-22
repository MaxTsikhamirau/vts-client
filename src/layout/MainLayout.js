import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import jwtDecode from 'jwt-decode';

import { logout } from '../functions/loginFunctions';

import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

import './MainLayout.css';

@translate('translations')
@connect(store => ({
  nav_label: store.navigation.get('nav_label')
}))
class MainLayout extends Component {

  render() {
    const roles = localStorage.token ? jwtDecode(localStorage.token).roles : [];
    const stories = {
      ADMIN: ['can crud on users', 'can assign user roles'],
      OFFICE: ['can crud on employees', 'can view vacations', 'can grab reports'],
      MANAGER: ['can view employees', 'can view vacations', 'can approve/reject vacations', 'can grab reports'],
      EMPLOYEE: ['can crud on their vacations', 'can change their password']
    }
    return (
      <React.Fragment>
        <Toolbar>toolbar</Toolbar>
        <SideDrawer>sidedrawer</SideDrawer>
        <main className="MainLayot-main" >
          <Panel header={this.props.nav_label} bsStyle="primary" >
            {this.props.children}
          </Panel>
          <Button style={{ marginRight: '5px' }} onClick={logout}>logout</Button>
          <Button style={{ marginRight: '5px' }} onClick={() => this.props.i18n.changeLanguage('ru')}>ru</Button>
          <Button style={{ marginRight: '5px' }} onClick={() => this.props.i18n.changeLanguage('en')}>en</Button>
          Roles: { roles.map(r => <span key={r}>{r} </span>) }<br/><br/>
          Stories: { roles.map(r => {
            return stories[r].map((s, si) => <div key={r + si}>{s}</div>);
          })}
        </main>
        <Sidebar />
      </React.Fragment>
    );
  }
}

export default MainLayout;
