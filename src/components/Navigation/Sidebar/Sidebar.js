import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Sidebar as PrimeSidebar } from 'primereact/components/sidebar/Sidebar';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';

import { logout } from '../../../functions/loginFunctions';
import { hideSidebar } from '../../../reducers/navigation/navigationActions';
import SidebarItem from './SidebarItem/SidebarItem';

import './Sidebar.css';

@translate('translations')
@connect(store => ({
  sidebarVisible: store.navigation.get('sidebarVisible')
}),
dispatch => ({
  hideSidebar: () => dispatch(hideSidebar())
}))
class Sidebar extends React.Component {
  render() {
    const { t, i18n } = this.props;
    const roles = localStorage.token ? jwtDecode(localStorage.token).roles : [];
    const roleLinks = {
      ADMIN: [
        { id: 'users', label: t('navigation.sidebar.users'), icon: 'fa fa-address-book', path: '/users' }
      ],
      OFFICE: [
        { id: 'employees', label: t('navigation.sidebar.employees'), icon: 'fa fa-group', path: '/employees' },
        { id: 'vacations', label: t('navigation.sidebar.vacations'), icon: 'fa fa-calendar', path: '/vacations' }
      ],
      MANAGER: [
        { id: 'employees', label: t('navigation.sidebar.employees'), icon: 'fa fa-group', path: '/employees' },
        { id: 'vacations', label: t('navigation.sidebar.vacations'), icon: 'fa fa-calendar', path: '/vacations' }
      ],
      EMPLOYEE: [
        { id: 'profile', label: t('navigation.sidebar.profile'), icon: 'fa fa-address-card', path: '/profile' }
      ]
    };
    const commonLinks = [
      { id: 'logout', label: t('navigation.sidebar.logout'), icon: 'fa fa-sign-out', command: logout}
    ];
    const linksOrder = ['profile', 'users', 'employees', 'vacations', 'logout'];
    const links = _.uniqBy(roles.reduce((res, role) => res.concat(roleLinks[role]), []).concat(commonLinks), 'id');
    const sortedLinks = _.sortBy(links, link => linksOrder.findIndex(ord => ord === link.id));
    const linksToRender = sortedLinks.map(link => <SidebarItem { ...link } />);
    return (
      <PrimeSidebar className="Sidebar" visible={this.props.sidebarVisible} onHide={ this.props.hideSidebar }>
        { linksToRender }
        <div>
          <a onClick={() => i18n.changeLanguage('ru')}>RU</a>
          <a onClick={() => i18n.changeLanguage('en')}>EN</a>
        </div>
      </PrimeSidebar>
    );
  }
}

export default Sidebar;
