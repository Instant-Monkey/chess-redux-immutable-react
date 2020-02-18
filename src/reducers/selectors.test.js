import { Map, List } from 'immutable';
import {
  getPieceIdOnSquareByPosition,
  getPieceOnSquareById,
  getPieceOnSquareByPosition,
  getTurn,
  getSelectedPiece,
  getCurrentLegalMoves,
  isPositionOnLegalMoves,
} from './selectors';
import { Players, ChessPiecesTypes } from '../helpers/constants';

describe('getPieceIdOnSquareByPosition', () => {
  it('should return the piece from a position', () => {
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
    const actual = getPieceIdOnSquareByPosition(
      pseudoInitialState,
      List([7, 0])
    );
    expect(actual).toBe('QUEEN');
  });
  it('should return undefined if no piece is in position', () => {
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
    const actual = getPieceIdOnSquareByPosition(
      pseudoInitialState,
      List([6, 0])
    );
    expect(actual).toBe(undefined);
  });
});

describe('getPieceOnSquareById', () => {
  it('should return the piece from an id', () => {
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
    const actual = getPieceOnSquareById(pseudoInitialState, 'QUEEN');
    expect(actual.toJS()).toEqual({
      team: Players.BLACK,
      type: ChessPiecesTypes.QUEEN,
      position: [7, 0],
    });
  });
  it('should return undefined if no id is found', () => {
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
    const actual = getPieceOnSquareById(pseudoInitialState, 'QUEEN');
    expect(actual).toBe(undefined);
  });
  it('should return undefined if the passed is undefined', () => {
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
    const actual = getPieceOnSquareById(pseudoInitialState, undefined);
    expect(actual).toBe(undefined);
  });
});

describe('getPieceOnSquareByPosition', () => {
  it('should return the piece from a position', () => {
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
    const actual = getPieceOnSquareByPosition(pseudoInitialState, List([7, 0]));
    expect(actual.toJS()).toEqual({
      team: Players.BLACK,
      type: ChessPiecesTypes.QUEEN,
      position: [7, 0],
    });
  });
  it('should return undefined if no piece on position', () => {
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
    const actual = getPieceOnSquareByPosition(pseudoInitialState, List([7, 0]));
    expect(actual).toBe(undefined);
  });
  it('should return undefined if the passed is undefined', () => {
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
    const actual = getPieceOnSquareByPosition(pseudoInitialState, undefined);
    expect(actual).toBe(undefined);
  });
});

describe('getTurn', () => {
  it('should return the current turn of the state', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
    });
    const actual = getTurn(pseudoInitialState);
    const expected = Players.WHITE;
    expect(actual).toBe(expected);
  });
});

describe('getSelected', () => {
  it('should return the current selectedPiece of the state', () => {
    const pseudoInitialState = Map({
      selectedPiece: 'ME',
    });
    const actual = getSelectedPiece(pseudoInitialState);
    const expected = 'ME';
    expect(actual).toBe(expected);
  });
});

describe('getCurrentLegalMoves', () => {
  it('should return the current LegalMoves of the state', () => {
    const legalMoves = List([List([0, 0]), List([1, 1])]);
    const pseudoInitialState = Map({
      currentLegalMoves: legalMoves,
    });
    const actual = getCurrentLegalMoves(pseudoInitialState);
    expect(actual.toJS()).toEqual(legalMoves.toJS());
  });
});

describe('isPositionOnLegalMoves', () => {
  it('should return true if the position is on a legal Moves', () => {
    const legalMoves = List([List([0, 0]), List([1, 1])]);
    const pseudoInitialState = Map({
      currentLegalMoves: legalMoves,
    });
    const actual = isPositionOnLegalMoves(pseudoInitialState, List([1, 1]));
    expect(actual).toBeTruthy();
  });

  it('should return true if the position is not on a legal Moves', () => {
    const legalMoves = List([List([0, 0]), List([1, 1])]);
    const pseudoInitialState = Map({
      currentLegalMoves: legalMoves,
    });
    const actual = isPositionOnLegalMoves(pseudoInitialState, List([2, 1]));
    expect(actual).toBeFalsy();
  });
});
