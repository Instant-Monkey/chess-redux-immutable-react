// General Helpers
export function getPieceIdOnSquareByPosition(state, position) {
  return state
    .get('pieces')
    .findKey(piece => piece.get('position').equals(position));
}

export function getPieceOnSquareById(state, id) {
  return state.getIn(['pieces', id]);
}

export function getPieceOnSquareByPosition(state, position) {
  return getPieceOnSquareById(
    state,
    getPieceIdOnSquareByPosition(state, position)
  );
}

export function getTurn(state) {
  return state.get('turn');
}

export function getSelectedPiece(state) {
  return state.get('selectedPiece');
}

export function getCurrentLegalMoves(state) {
  return state.get('currentLegalMoves');
}

export function isPositionOnLegalMoves(state, position) {
  return getCurrentLegalMoves(state).includes(position);
}
