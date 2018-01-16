import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import history from '../history';

import rootReducer from './reducers/root';

const reducers = combineReducers({
  root: rootReducer,
});

let devTools = f => f;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk, routerMiddleware(history)), devTools),
);

export default store;