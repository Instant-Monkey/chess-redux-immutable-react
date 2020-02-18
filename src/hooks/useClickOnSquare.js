import { useSelector, useDispatch } from 'react-redux';
import {
  getSelectedPiece,
  isPositionOnLegalMoves,
  getTurn,
} from '../reducers/selectors';
import { movePiece, selectPiece, unselectPiece } from '../actions/actions';
import { useCallback, useMemo } from 'react';

export function useClickOnSquare(position, pieceId = '', piece = null) {
  const selectedPiece = useSelector(getSelectedPiece);
  const isUnderALegalMove = useSelector(state =>
    isPositionOnLegalMoves(state, position)
  );
  const isCurrentlySelected = useMemo(() => selectedPiece === pieceId, [
    selectedPiece,
    pieceId,
  ]);
  const currentTurn = useSelector(getTurn);
  const isASelectionablePiece = piece && piece.get('team') === currentTurn;

  const isUnderAttack = useSelector(state =>
    isPositionOnLegalMoves(state, position)
  );

  const dispatch = useDispatch();
  const callback = useCallback(() => {
    if (!pieceId && selectedPiece && isUnderALegalMove) {
      dispatch(
        movePiece({
          id: selectedPiece,
          i: position.get(0),
          j: position.get(1),
        })
      );
    } else if (pieceId) {
      if (!isCurrentlySelected && isASelectionablePiece) {
        dispatch(selectPiece(pieceId));
      } else if (isCurrentlySelected) {
        dispatch(unselectPiece());
      } else if (isUnderAttack) {
        dispatch(
          movePiece({
            id: selectedPiece,
            i: position.get(0),
            j: position.get(1),
          })
        );
      }
    }
  }, [
    pieceId,
    selectedPiece,
    isUnderALegalMove,
    dispatch,
    position,
    isASelectionablePiece,
    isCurrentlySelected,
    isUnderAttack,
  ]);

  return callback;
}
