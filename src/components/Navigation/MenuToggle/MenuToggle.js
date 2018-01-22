import React from 'react';
import { connect } from 'react-redux';

import { showSidebar } from '../../../reducers/navigation/navigationActions';

import './MenuToggle.css';

@connect(null,
dispatch => ({
  showSidebar: () => dispatch(showSidebar())
}))
class MenuToggle extends React.Component {

  state = {
    sidebarVisible: false
  }

  render() {
    return (
      <React.Fragment>
        <div className="MenuToggle" >
          <i className="fa fa-bars" onClick={ this.props.showSidebar } />
        </div>
      </React.Fragment>

    );
  }
}

export default MenuToggle;
