import {
  switchTurn,
  movePiece,
  capturePiece,
  setWonGame,
} from '../actions/actions';
import chessReducer from './chessReducer';
import { initialState } from '../store/state';
import { Map, List } from 'immutable';
import { Players, ChessPiecesTypes } from '../helpers/constants';

describe('chessReducer', () => {
  describe('switchTurn', () => {
    it('should switch from WHITE to Black when switch turn', () => {
      const action = switchTurn();

      const actual = chessReducer(initialState, action);

      const expected = 'BLACK';
      expect(actual.get('turn')).toBe(expected);
    });
  });
  describe('movePiece', () => {
    it('should change the position of the queen', () => {
      const action = movePiece({ id: 'QUEEN', x: 4, y: 2 });
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          QUEEN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: List([7, 0]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: false,
        pieces: {
          QUEEN: {
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: [4, 2],
          },
        },
      });
    });

    it('should change solely the position of the asked piece', () => {
      const action = movePiece({ id: 'QUEEN', x: 4, y: 2 });
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          QUEEN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: List([7, 0]),
          }),
          KING: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: List([1, 9]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: false,
        pieces: {
          QUEEN: {
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: [4, 2],
          },
          KING: {
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: [1, 9],
          },
        },
      });
    });
    it('should not change anything if the id is not found', () => {
      const action = movePiece({ id: 'QUEEN', x: 4, y: 2 });
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          KING: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: List([1, 9]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: false,
        pieces: {
          KING: {
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: [1, 9],
          },
        },
      });
    });
  });

  describe('capturePiece', () => {
    it('should delete the entry in the state', () => {
      const action = capturePiece('QUEEN');
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          QUEEN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: List([7, 0]),
          }),
          KING: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: List([1, 9]),
          }),
        }),
      });

      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: false,
        pieces: {
          KING: {
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: [1, 9],
          },
        },
      });
    });
    it('should not change the state if the id doesnt exist', () => {
      const action = capturePiece('QUEEN');
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          KING: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: List([1, 9]),
          }),
        }),
      });

      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: false,
        pieces: {
          KING: {
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: [1, 9],
          },
        },
      });
    });
  });
  describe('setWonGame', () => {
    it('should change the won property in the state', () => {
      const action = setWonGame();
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        turn: Players.WHITE,
        won: true,
      });
    });
  });
});
