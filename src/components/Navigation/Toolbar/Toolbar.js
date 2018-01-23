import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.svg';

import MenuToggle from '../MenuToggle/MenuToggle';

import './Toolbar.css';

const toolbar = ( props ) => (

  <header className="Toolbar">
    <MenuToggle />
    <Link to="/" >Vacation Tracking System</Link>
    <div className="Toolbar-Logo">
        <img src={logo} className="Toolbar-logo" alt="logo" />
    </div>
  </header>
);

export default toolbar;
