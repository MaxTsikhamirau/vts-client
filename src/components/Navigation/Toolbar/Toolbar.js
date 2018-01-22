import React from 'react';

import logo from '../../../assets/logo.svg';

import MenuToggle from '../MenuToggle/MenuToggle';

import './Toolbar.css';

const toolbar = ( props ) => (

  <header className="Toolbar">
    <MenuToggle />
    <span>Vacation Tracking System</span>
    <div className="Toolbar-Logo">
        <img src={logo} className="Toolbar-logo" alt="logo" />
    </div>
  </header>
);

export default toolbar;
