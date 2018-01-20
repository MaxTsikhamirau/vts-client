import { combineReducers, applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import employees from './employee/employeesReducer';
import alert from './alert/alertReducer';
import navigation from './navigation/navigationReducer';

const reducers = combineReducers({
    employees,
    alert,
    navigation
});

const middleware = applyMiddleware(createLogger(), thunk, promise());
const store = createStore(reducers, middleware);

export default store;
