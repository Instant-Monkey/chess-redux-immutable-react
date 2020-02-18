import { createStore, compose, applyMiddleware } from 'redux';
import chessReducer from '../reducers/chessReducer';
import initalState from './state';
import middleware from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  chessReducer,
  initalState,
  composeEnhancers(applyMiddleware(middleware))
);

export default store;
