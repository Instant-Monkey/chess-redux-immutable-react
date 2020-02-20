import ActionTypes from './types';

export function movePiece({ id, i, j }) {
  return {
    type: ActionTypes.MOVE_PIECE,
    payload: {
      id,
      i,
      j,
    },
  };
}

export function capturePiece(id) {
  return {
    type: ActionTypes.CAPTURE_PIECE,
    payload: id,
  };
}

export function selectPiece(id) {
  return {
    type: ActionTypes.SELECT_PIECE,
    payload: id,
  };
}

export function unselectPiece() {
  return {
    type: ActionTypes.UNSELECT_PIECE,
    payload: {},
  };
}

export function switchTurn() {
  return {
    type: ActionTypes.SWITCH_TURN,
    payload: {},
  };
}

export function setWonGame() {
  return {
    type: ActionTypes.SET_WON_GAME,
    payload: {},
  };
}

export function newGame() {
  return {
    type: ActionTypes.NEW_GAME,
    payload: {},
  };
}

export function promotePiece(id) {
  return {
    type: ActionTypes.PROMOTE_PIECE,
    payload: id,
  };
}
