import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { hideSidebar } from '../../../../reducers/navigation/navigationActions';

import './SidebarItem.css';

@connect(null,
dispatch => ({
  hideSidebar: () => dispatch(hideSidebar())
}))
class SidebarItem extends React.Component {
  render() {
    const { label, command, path, icon } = this.props;
    return (
      <Link to={path || '/'} className={`SidebarItem ${icon}`} onClick={ () => {
        command && command();
        this.props.hideSidebar();
      }}>
        <span>{ label }</span>
      </Link>
    );
  }
}

export default SidebarItem;
