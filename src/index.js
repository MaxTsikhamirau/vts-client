import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import App from './containers/App';
import appStore from './reducers/appStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={appStore} >
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
