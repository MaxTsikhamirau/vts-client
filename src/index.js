import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import appStore from './reducers/appStore';
import i18n from './i18n/i18n';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={appStore} >
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
  </I18nextProvider>, document.getElementById('root'));
registerServiceWorker();
