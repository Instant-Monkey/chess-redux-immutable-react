import { initialState } from '../store/state';
import ActionTypes from '../actions/types';
import { Players } from '../helpers/constants';
import { List } from 'immutable';

function chessReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MOVE_PIECE: {
      const { id, x, y } = action.payload;
      if (state.getIn(['pieces', id])) {
        return state.updateIn(['pieces', id, 'position'], () => List([x, y]));
      }
      return state;
    }
    case ActionTypes.CAPTURE_PIECE: {
      const id = action.payload;
      if (state.getIn(['pieces', id])) {
        return state.deleteIn(['pieces', id]);
      }
      return state;
    }
    case ActionTypes.SWITCH_TURN: {
      if (state.get('turn') === Players.WHITE) {
        return state.set('turn', Players.BLACK);
      }
      if (state.get('turn') === Players.BLACK) {
        return state.set('turn', Players.WHITE);
      }
      return state;
    }
    case ActionTypes.SET_WON_GAME: {
      return state.set('won', true);
    }
    default: {
      return state;
    }
  }
}

export default chessReducer;
