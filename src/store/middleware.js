import ActionTypes from '../actions/types';
import {
  unselectPiece,
  capturePiece,
  switchTurn,
  setWonGame,
  promotePiece,
} from '../actions/actions';
import { getPieceIdOnSquareByPosition, getTurn } from '../reducers/selectors';
import { List } from 'immutable';
import { isKingCheckedMate, isAPromotion } from '../chess-rules/chessRules';

const middleware = store => next => action => {
  if (action.type === ActionTypes.MOVE_PIECE) {
    const { i, j, id } = action.payload;
    const capturedPiece = getPieceIdOnSquareByPosition(
      store.getState(),
      List([i, j])
    );
    if (capturedPiece) {
      store.dispatch(capturePiece(capturedPiece));
    }
    next(action);
    store.dispatch(unselectPiece());
    store.dispatch(switchTurn());
    if (isAPromotion(store.getState(), id)) {
      store.dispatch(promotePiece(id));
    }
    const newState = store.getState();
    if (isKingCheckedMate(newState, getTurn(newState))) {
      store.dispatch(setWonGame());
    }

    return;
  }
  return next(action);
};

export default middleware;
