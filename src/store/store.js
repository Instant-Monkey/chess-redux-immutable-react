import { createStore } from 'redux';
import chessReducer from '../reducers/chessReducer';
import initalState from './state';

const store = createStore(
  chessReducer,
  initalState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
