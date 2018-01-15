import { combineReducers, applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import employees from './employeesReducer';
import alert from './alertReducer';

const reducers = combineReducers({
    employees,
    alert
});

const middleware = applyMiddleware(createLogger(), thunk, promise());
const store = createStore(reducers, middleware);

export default store;
