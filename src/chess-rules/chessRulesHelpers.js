import { List } from 'immutable';
import { Players } from '../helpers/constants';
import {
  getPieceOnSquareById,
  getPieceOnSquareByPosition,
} from '../reducers/selectors';
// general helpers

export function areTwoPiecesTheSameTeam(piece1, piece2) {
  return piece1.get('team') === piece2.get('team');
}

export function isCoordinatesOutOfBoard(coord) {
  return (
    coord.get(0) < 0 || coord.get(0) > 7 || coord.get(1) < 0 || coord.get(1) > 7
  );
}

// Combination of directionnal moves

export function getHorizontalLegalMoves(state, pieceId, limit = 0) {
  return getDirectionLegalMoves(state, [0, -1], pieceId, limit).concat(
    getDirectionLegalMoves(state, [0, 1], pieceId, limit)
  );
}

export function getVerticalLegalMoves(state, pieceId, limit = 0) {
  return getDirectionLegalMoves(state, [-1, 0], pieceId, limit).concat(
    getDirectionLegalMoves(state, [1, 0], pieceId, limit)
  );
}

export function getDiagonalLegalMoves(state, pieceId, limit = 0) {
  return getDirectionLegalMoves(state, [-1, -1], pieceId, limit)
    .concat(getDirectionLegalMoves(state, [1, -1], pieceId, limit))
    .concat(getDirectionLegalMoves(state, [1, 1], pieceId, limit))
    .concat(getDirectionLegalMoves(state, [-1, 1], pieceId, limit));
}

export function getKnightLegalMoves(state, pieceId) {
  return getDirectionLegalMoves(state, [-1, -2], pieceId, 1)
    .concat(getDirectionLegalMoves(state, [-1, 2], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [1, 2], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [1, -2], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [-2, -1], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [-2, 1], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [2, 1], pieceId, 1))
    .concat(getDirectionLegalMoves(state, [2, -1], pieceId, 1));
}

// return all possible moves in a direction
export function getDirectionLegalMoves(
  state,
  direction,
  pieceId,
  limit = 0,
  preventCapture = false // for the pawns
) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece) {
    return List([]);
  }
  let pointerPosition = piece
    .get('position')
    .map((value, i) => value + direction[i]);
  const intendedMoves = [];

  while (!isCoordinatesOutOfBoard(pointerPosition)) {
    intendedMoves.push(pointerPosition);
    pointerPosition = pointerPosition.map((value, i) => value + direction[i]);
  }
  if (!intendedMoves.length) {
    return List([]);
  }
  const legalMoves = [];
  const size = limit || intendedMoves.length;
  for (let i = 0; i < size; i += 1) {
    const currentPos = intendedMoves[i];
    const currentPosPiece = getPieceOnSquareByPosition(state, currentPos);
    if (currentPosPiece) {
      if (!areTwoPiecesTheSameTeam(piece, currentPosPiece) && !preventCapture) {
        legalMoves.push(currentPos);
      }
      break;
    } else {
      legalMoves.push(currentPos);
    }
  }
  return List(legalMoves);
}

// special cases move

export function getPawnCaptureMoves(state, pieceId) {
  const piece = getPieceOnSquareById(state, pieceId);
  if (!piece) {
    return List([]);
  }
  const direction = piece.get('team') === Players.WHITE ? 1 : -1;
  const intendedMoves = List([
    piece
      .get('position')
      .map((val, i) => (i === 0 ? val + direction : val - 1)),
    piece
      .get('position')
      .map((val, i) => (i === 0 ? val + direction : val + 1)),
  ]);
  return intendedMoves.filter(val => {
    const pieceOnPosition = getPieceOnSquareByPosition(state, val);
    return pieceOnPosition && !areTwoPiecesTheSameTeam(piece, pieceOnPosition);
  });
}
