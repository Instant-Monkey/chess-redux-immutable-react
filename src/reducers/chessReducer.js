import { initialState } from '../store/state';
import ActionTypes from '../actions/types';
import { Players } from '../helpers/constants';
import { List } from 'immutable';
import { getOppositeTeam } from '../helpers/helpers';
import { getPieceIdOnSquareByPosition } from '../chess-rules/chessRulesHelpers';

function chessReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MOVE_PIECE: {
      const { id, x, y } = action.payload;
      const position = List([x, y]);
      if (state.getIn(['pieces', id])) {
        const nextState = state
          .setIn(['pieces', id, 'position'], position)
          .updateIn(['pieces', id, 'firstMove'], firstMove =>
            firstMove ? false : undefined
          );
        const capturedPieceId = getPieceIdOnSquareByPosition(state, position);
        if (capturedPieceId) {
          return nextState.deleteIn(['pieces', capturedPieceId]);
        }
        return nextState;
      }
      return state;
    }
    case ActionTypes.SWITCH_TURN: {
      return state.update('turn', turn => getOppositeTeam(turn));
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
