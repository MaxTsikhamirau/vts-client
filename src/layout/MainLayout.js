import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer';
import Sidebar from '../components/Navigation/Sidebar/Sidebar';

import './MainLayout.css';

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
