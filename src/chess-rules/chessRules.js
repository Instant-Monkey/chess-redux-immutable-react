import {
  getDirectionLegalMoves,
  getPawnCaptureMoves,
  getVerticalLegalMoves,
  getHorizontalLegalMoves,
  getDiagonalLegalMoves,
  getKnightLegalMoves,
} from './chessRulesHelpers';
import {
  getPieceOnSquareById,
  getPieceIdOnSquareByPosition,
} from '../reducers/selectors';
import { List } from 'immutable';
import { ChessPiecesTypes, Players } from '../helpers/constants';
import chessReducer from '../reducers/chessReducer';
import { movePiece, capturePiece } from '../actions/actions';

export function getNextState(state, action) {
  let nextState = chessReducer(state, action);
  const capturedPiece = getPieceIdOnSquareByPosition(
    state,
    List([action.payload.i, action.payload.j])
  );
  if (capturedPiece) {
    nextState = chessReducer(nextState, capturePiece(capturedPiece));
  }

  return nextState;
}
// return the possible moves for a piece
export function getLegalMovesForAPiece(state, pieceId) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece) {
    return List([]);
  }
  return getStandardMovesForAPiece(state, pieceId).filterNot(standardMove => {
    const i = standardMove.get(0);
    const j = standardMove.get(1);
    const action = movePiece({
      id: pieceId,
      i,
      j,
    });
    const nextState = getNextState(state, action);
    return isKingChecked(nextState, piece.get('team'));
  });
}

// return the possible moves for a piece including the moves which would create a check or check mate situation
export function getStandardMovesForAPiece(state, pieceId) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece) {
    return List([]);
  }

  switch (piece.get('type')) {
    case ChessPiecesTypes.PAWN: {
      const limit = piece.get('firstMove') ? 2 : 1;
      let legalMoves = List([]);
      if (piece.get('team') === Players.WHITE) {
        legalMoves = legalMoves.concat(
          getDirectionLegalMoves(state, [1, 0], pieceId, limit, true)
        );
      }
      if (piece.get('team') === Players.BLACK) {
        legalMoves = legalMoves.concat(
          getDirectionLegalMoves(state, [-1, 0], pieceId, limit, true)
        );
      }
      return legalMoves.concat(getPawnCaptureMoves(state, pieceId));
    }

    case ChessPiecesTypes.ROOK: {
      return getHorizontalLegalMoves(state, pieceId).concat(
        getVerticalLegalMoves(state, pieceId)
      );
    }

    case ChessPiecesTypes.BISHOP: {
      return getDiagonalLegalMoves(state, pieceId);
    }

    case ChessPiecesTypes.KNIGHT: {
      return getKnightLegalMoves(state, pieceId);
    }

    case ChessPiecesTypes.QUEEN: {
      return getHorizontalLegalMoves(state, pieceId)
        .concat(getVerticalLegalMoves(state, pieceId))
        .concat(getDiagonalLegalMoves(state, pieceId));
    }

    case ChessPiecesTypes.KING: {
      return getHorizontalLegalMoves(state, pieceId, 1)
        .concat(getVerticalLegalMoves(state, pieceId, 1))
        .concat(getDiagonalLegalMoves(state, pieceId, 1));
    }

    default: {
      return List([]);
    }
  }
}

export function isKingChecked(state, team) {
  const king = state
    .get('pieces')
    .find(
      piece =>
        piece.get('type') === ChessPiecesTypes.KING &&
        piece.get('team') === team
    );
  if (!king) {
    return false;
  }
  const ennemyPieces = state
    .get('pieces')
    .filter(statePiece => statePiece.get('team') !== team);

  return !!ennemyPieces.find((v, id) =>
    getStandardMovesForAPiece(state, id).find(legalMove =>
      king.get('position').equals(legalMove)
    )
  );
}

export function isKingCheckedMate(state, team) {
  if (!isKingChecked(state, team)) {
    return false;
  }
  const friendlyPieces = state
    .get('pieces')
    .filter(statePiece => statePiece.get('team') === team);

  return !friendlyPieces.find((v, id) =>
    getStandardMovesForAPiece(state, id).find(legalMove => {
      const action = movePiece({
        id,
        i: legalMove.get(0),
        j: legalMove.get(1),
      });
      const nextState = getNextState(state, action);

      return !isKingChecked(nextState, team);
    })
  );
}

export function isAPromotion(state, pieceId) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece || piece.get('type') !== ChessPiecesTypes.PAWN) {
    return false;
  }
  if (
    piece.get('team') === Players.WHITE &&
    piece.getIn(['position', 0]) === 7
  ) {
    return true;
  }
  if (
    piece.get('team') === Players.BLACK &&
    piece.getIn(['position', 0]) === 0
  ) {
    return true;
  }
  return false;
}
