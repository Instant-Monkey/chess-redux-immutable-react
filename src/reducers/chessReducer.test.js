import {
  switchTurn,
  movePiece,
  setWonGame,
  selectPiece,
  unselectPiece,
  newGame,
  capturePiece,
  promotePiece,
} from '../actions/actions';
import chessReducer from './chessReducer';
import initialState from '../store/state';
import { Map, List } from 'immutable';
import { Players, ChessPiecesTypes } from '../helpers/constants';

describe('chessReducer', () => {
  describe('Noop', () => {
    it('should return the initalState when a wrong action is passed', () => {
      const action = {
        type: 'Noop',
        payload: {},
      };
      const actual = chessReducer(undefined, action);
      expect(actual.toJS()).toEqual(initialState.toJS());
    });
  });
  describe('switchTurn', () => {
    it('should switch from WHITE to Black when switch turn', () => {
      const action = switchTurn();

      const actual = chessReducer(initialState, action);

      const expected = 'BLACK';
      expect(actual.get('turn')).toBe(expected);
    });
    it('should switch from BLACK to WHITE when switch turn', () => {
      const action = switchTurn();
      const pseudoInitialState = Map({
        turn: Players.BLACK,
        won: false,
      });
      const actual = chessReducer(pseudoInitialState, action);

      const expected = 'WHITE';
      expect(actual.get('turn')).toBe(expected);
    });
  });
  describe('movePiece', () => {
    it('should change the position of the queen', () => {
      const action = movePiece({ id: 'QUEEN', i: 4, j: 2 });
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
    it('should change the first move property to false', () => {
      const action = movePiece({ id: 'QUEEN', i: 4, j: 2 });
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          QUEEN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.QUEEN,
            position: List([7, 0]),
            firstMove: true,
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
            firstMove: false,
          },
          KING: {
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: [1, 9],
          },
        },
      });
    });

    it('should change solely the position of the asked piece', () => {
      const action = movePiece({ id: 'QUEEN', i: 4, j: 2 });
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
      const action = movePiece({ id: 'QUEEN', i: 4, j: 2 });
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
    it('should delete the piece from pieces and add it to capturedPiece', () => {
      const action = capturePiece('BLACK_ROOK1');
      const actual = chessReducer(initialState, action);
      const stateWithoutPiece = initialState.deleteIn([
        'pieces',
        'BLACK_ROOK1',
      ]);
      expect(actual.toJS()).toEqual({
        ...stateWithoutPiece.toJS(),
        capturedPieces: {
          BLACK_ROOK1: {
            team: Players.BLACK,
            type: ChessPiecesTypes.ROOK,
            position: [7, 0],
          },
        },
      });
    });
  });

  describe('selectPiece', () => {
    it('should select the id piece and update the currentLegalMoves accordingly', () => {
      const action = selectPiece('WHITE_KNIGHT1');
      const actual = chessReducer(initialState, action);
      expect(actual.toJS()).toEqual({
        ...initialState.toJS(),
        selectedPiece: 'WHITE_KNIGHT1',
        currentLegalMoves: [
          [2, 2],
          [2, 0],
        ],
      });
    });
  });
  describe('unSelectPiece', () => {
    it('should select the id piece and update the currentLegalMoves accordingly', () => {
      const action = unselectPiece();
      const pseudoInitialState = initialState
        .set('selectedPiece', 'WHITE_KNIGHT1')
        .set('currentLegalMoves', List(List([2, 2]), List([2, 0])));
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        ...pseudoInitialState.toJS(),
        selectedPiece: '',
        currentLegalMoves: [],
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
  describe('setWonGame', () => {
    it('should change the won property in the state', () => {
      const action = newGame();
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: true,
        pieces: Map({
          KING: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.KING,
            position: List([1, 9]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual(initialState.toJS());
    });
  });
  describe('promotePiece', () => {
    it('should change nothing is the id is unknown', () => {
      const action = promotePiece('BAD_ID');
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([6, 0]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual(pseudoInitialState.toJS());
    });

    it('should made a pawn a queen', () => {
      const action = promotePiece('PAWN');
      const pseudoInitialState = Map({
        pieces: Map({
          PAWN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([7, 0]),
          }),
        }),
      });
      const actual = chessReducer(pseudoInitialState, action);
      expect(actual.toJS()).toEqual({
        pieces: {
          PAWN: {
            team: Players.WHITE,
            type: ChessPiecesTypes.QUEEN,
            position: [7, 0],
          },
        },
      });
    });
  });
});
