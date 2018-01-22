import React from 'react';
import { connect } from 'react-redux';
import { Sidebar as PrimeSidebar } from 'primereact/components/sidebar/Sidebar';
import { PanelMenu } from 'primereact/components/panelmenu/PanelMenu';

import { hideSidebar } from '../../../reducers/navigation/navigationActions';

import './Sidebar.css';

@connect(store => ({
  sidebarVisible: store.navigation.get('sidebarVisible')
}),
dispatch => ({
  hideSidebar: () => dispatch(hideSidebar())
}))
class Sidebar extends React.Component {
  render() {
    const items=[
      {
          label: 'File',
          items: [{label: 'New', icon: 'fa-plus', command:()=>{ }},
                  {label: 'Open', icon: 'fa-download', command:()=>{ }}]
      },
      {
          label: 'Edit',
          items: [{label: 'Undo', icon: 'fa-refresh', command:()=>{ }},
                  {label: 'Redo', icon: 'fa-repeat'} ]
      }
    ];
    return (
      <PrimeSidebar visible={this.props.sidebarVisible} onHide={ this.props.hideSidebar }>
          <PanelMenu model={items} />
      </PrimeSidebar>
    );
  }
}

export default Sidebar;
