import ActionTypes from './types';

export function movePiece({ id, x, y }) {
  return {
    type: ActionTypes.MOVE_PIECE,
    payload: {
      id,
      x,
      y,
    },
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
