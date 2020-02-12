import {
  getPieceOnSquareById,
  getDirectionLegalMoves,
  getPawnCaptureMoves,
  getVerticalLegalMoves,
  getHorizontalLegalMoves,
  getDiagonalLegalMoves,
  getKnightLegalMoves,
} from './chessRulesHelpers';
import { List } from 'immutable';
import { ChessPiecesTypes, Players } from '../helpers/constants';
import chessReducer from '../reducers/chessReducer';
import { movePiece } from '../actions/actions';

export function getLegalMovesForAPiece(state, pieceId) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece) {
    return List([]);
  }
  return getStandardMovesForAPiece(state, pieceId).filterNot(standardMove => {
    const action = movePiece({
      id: pieceId,
      x: standardMove.get(0),
      y: standardMove.get(1),
    });
    const nextState = chessReducer(state, action);

    return isKingChecked(nextState, piece.get('team'));
  });
}
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
        x: legalMove.get(0),
        y: legalMove.get(1),
      });
      const nextState = chessReducer(state, action);

      return !isKingChecked(nextState, team);
    })
  );
}
