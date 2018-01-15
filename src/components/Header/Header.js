import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import './Header.css';
import Alert from '../Alert/Alert';
import bg from '../../hoc/BG';

const header = (props, context) => {
    return (
        <header className="Header">
            <Link to="/">
                <img src={logo} className="Header-logo" alt="logo" />
                <h2 className="Header-title">Vacation Tracking System</h2>
                <div>{
                  sessionStorage.token
                }</div>
                <Alert />
            </Link>
        </header>
    );
}

header.contextTypes = {
    store: PropTypes.object
};

export default (header);
