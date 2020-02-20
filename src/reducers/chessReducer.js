import initialState from '../store/state';
import ActionTypes from '../actions/types';
import { List } from 'immutable';
import { getOppositeTeam } from '../helpers/helpers';
import { getLegalMovesForAPiece } from '../chess-rules/chessRules';
import { ChessPiecesTypes } from '../helpers/constants';

function chessReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MOVE_PIECE: {
      const { id, i, j } = action.payload;
      const position = List([i, j]);
      if (state.getIn(['pieces', id])) {
        return state
          .setIn(['pieces', id, 'position'], position)
          .updateIn(['pieces', id, 'firstMove'], firstMove =>
            firstMove ? false : undefined
          );
      }
      return state;
    }
    case ActionTypes.CAPTURE_PIECE: {
      const id = action.payload;
      const piece = state.getIn(['pieces', id]);
      return state
        .deleteIn(['pieces', id])
        .setIn(['capturedPieces', id], piece);
    }
    case ActionTypes.SELECT_PIECE: {
      return state
        .set('selectedPiece', action.payload)
        .set(
          'currentLegalMoves',
          getLegalMovesForAPiece(state, action.payload)
        );
    }
    case ActionTypes.UNSELECT_PIECE: {
      return state.set('selectedPiece', '').set('currentLegalMoves', List([]));
    }
    case ActionTypes.SWITCH_TURN: {
      return state.update('turn', turn => getOppositeTeam(turn));
    }
    case ActionTypes.SET_WON_GAME: {
      return state.set('won', true);
    }
    case ActionTypes.NEW_GAME: {
      return initialState;
    }
    case ActionTypes.PROMOTE_PIECE: {
      const id = action.payload;
      const piece = state.getIn(['pieces', id]);
      if (!piece) {
        return state;
      }

      return state.setIn(['pieces', id, 'type'], ChessPiecesTypes.QUEEN);
    }
    default: {
      return state;
    }
  }
}

export default chessReducer;
