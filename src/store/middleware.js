import ActionTypes from '../actions/types';
import { unselectPiece, capturePiece, switchTurn } from '../actions/actions';
import { getPieceIdOnSquareByPosition } from '../reducers/selectors';
import { List } from 'immutable';

const middleware = store => next => action => {
  if (action.type === ActionTypes.MOVE_PIECE) {
    store.dispatch(unselectPiece());
    store.dispatch(switchTurn());
    const { i, j } = action.payload;
    const capturedPiece = getPieceIdOnSquareByPosition(
      store.getState(),
      List([i, j])
    );
    if (capturedPiece) {
      store.dispatch(capturePiece(capturedPiece));
    }
  }
  return next(action);
};

export default middleware;
