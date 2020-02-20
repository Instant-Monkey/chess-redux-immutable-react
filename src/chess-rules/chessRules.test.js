import { Players, ChessPiecesTypes } from '../helpers/constants';
import { List, Map } from 'immutable';
import {
  getStandardMovesForAPiece,
  getLegalMovesForAPiece,
  isKingChecked,
  isKingCheckedMate,
  isAPromotion,
} from './chessRules';
import { sortListByPosition } from '../helpers/helpers';

describe('getLegalMovesForAPiece', () => {
  it('should return an empty list when passed the wrong id', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KNIGHT,
          position: List([3, 3]),
        }),
      }),
    });
    const actual = getLegalMovesForAPiece(pseudoInitialState, 'KNIGHTT');
    expect(actual.toJS()).toEqual([]);
  });
  it('should remove mate position from a king standard moves', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([2, 0]),
          firstMove: false,
        }),
        ROOK2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([4, 0]),
          firstMove: false,
        }),
      }),
    });

    const actual = getLegalMovesForAPiece(pseudoInitialState, 'KING');
    const expected = List([List([3, 2]), List([3, 4])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });

  it('should not prevent a piece to move and be under attack', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([0, 0]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([1, 4]),
          firstMove: false,
        }),
      }),
    });

    const actual = getLegalMovesForAPiece(pseudoInitialState, 'PAWN');
    const expected = List([List([1, 0])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });

  it('should prevent a piece to move if the move exposes the king to an attack', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        BISHOP: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 4]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([3, 7]),
          firstMove: false,
        }),
      }),
    });

    const actual = getLegalMovesForAPiece(pseudoInitialState, 'BISHOP');
    const expected = List([]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });

  it('should not prevent a piece to move if the king is not exposed', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([3, 4]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([2, 7]),
          firstMove: false,
        }),
      }),
    });

    const actual = getLegalMovesForAPiece(pseudoInitialState, 'PAWN');
    const expected = List([List([4, 4])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should prevent the king to capture if it will exposes him', () => {
    const pseudoInitialState = Map({
      turn: 'BLACK',
      won: false,
      selectedPiece: '',
      currentLegalMoves: [],
      capturedPieces: Map({
        BLACK_PAWN6: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 5]),
          firstMove: true,
        }),
      }),
      pieces: Map({
        WHITE_ROOK1: Map({
          team: 'WHITE',
          type: 'ROOK',
          position: List([0, 0]),
        }),
        WHITE_ROOK2: Map({
          team: 'WHITE',
          type: 'ROOK',
          position: List([0, 7]),
        }),
        BLACK_KNIGHT1: Map({
          team: 'BLACK',
          type: 'KNIGHT',
          position: List([5, 0]),
        }),
        BLACK_KNIGHT2: Map({
          team: 'BLACK',
          type: 'KNIGHT',
          position: List([5, 7]),
        }),
        BLACK_PAWN1: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 0]),
          firstMove: true,
        }),
        BLACK_PAWN2: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 1]),
          firstMove: true,
        }),
        BLACK_QUEEN: Map({
          team: 'BLACK',
          type: 'QUEEN',
          position: List([7, 3]),
        }),
        BLACK_PAWN3: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 2]),
          firstMove: true,
        }),
        BLACK_PAWN4: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 3]),
          firstMove: true,
        }),
        BLACK_PAWN5: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([4, 4]),
          firstMove: false,
        }),
        WHITE_KING: Map({
          team: 'WHITE',
          type: 'KING',
          position: List([0, 4]),
        }),
        WHITE_KNIGHT1: Map({
          team: 'WHITE',
          type: 'KNIGHT',
          position: List([0, 1]),
        }),
        BLACK_PAWN7: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 6]),
          firstMove: true,
        }),
        WHITE_KNIGHT2: Map({
          team: 'WHITE',
          type: 'KNIGHT',
          position: List([0, 6]),
        }),
        BLACK_PAWN8: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 7]),
          firstMove: true,
        }),
        WHITE_PAWN1: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 0]),
          firstMove: true,
        }),
        WHITE_PAWN2: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 1]),
          firstMove: true,
        }),
        WHITE_QUEEN: Map({
          team: 'WHITE',
          type: 'QUEEN',
          position: List([6, 5]),
        }),
        BLACK_BISHOP1: Map({
          team: 'BLACK',
          type: 'BISHOP',
          position: List([7, 2]),
        }),
        WHITE_PAWN3: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 2]),
          firstMove: true,
        }),
        BLACK_BISHOP2: Map({
          team: 'BLACK',
          type: 'BISHOP',
          position: List([7, 5]),
        }),
        WHITE_PAWN4: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 3]),
          firstMove: true,
        }),
        WHITE_PAWN5: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([3, 4]),
          firstMove: false,
        }),
        BLACK_KING: Map({
          team: 'BLACK',
          type: 'KING',
          position: List([7, 4]),
        }),
        WHITE_PAWN6: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 5]),
          firstMove: true,
        }),
        BLACK_ROOK1: Map({
          team: 'BLACK',
          type: 'ROOK',
          position: List([7, 0]),
        }),
        WHITE_PAWN7: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 6]),
          firstMove: true,
        }),
        BLACK_ROOK2: Map({
          team: 'BLACK',
          type: 'ROOK',
          position: List([7, 7]),
        }),
        WHITE_PAWN8: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 7]),
          firstMove: true,
        }),
        WHITE_BISHOP1: Map({
          team: 'WHITE',
          type: 'BISHOP',
          position: List([0, 2]),
        }),
        WHITE_BISHOP2: Map({
          team: 'WHITE',
          type: 'BISHOP',
          position: List([3, 2]),
        }),
      }),
    });

    const actual = getLegalMovesForAPiece(pseudoInitialState, 'BLACK_KING');
    const expected = List([]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
});

describe('getStandardMovesForAPiece', () => {
  it('should return an empty list when passed the wrong id', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KNIGHT,
          position: List([3, 3]),
        }),
      }),
    });
    const actual = getStandardMovesForAPiece(pseudoInitialState, 'KNIGHTT');
    expect(actual.toJS()).toEqual([]);
  });
  it('should return an empty list when passed the a piece with an invalid type', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: 'INVALID',
          position: List([3, 3]),
        }),
      }),
    });
    const actual = getStandardMovesForAPiece(pseudoInitialState, 'KNIGHT');
    expect(actual.toJS()).toEqual([]);
  });
  describe('PAWN', () => {
    it('should authorize a white pawn to move one square ahead', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([4, 3])]);
      expect(actual.toJS()).toEqual(expected.toJS());
    });
    it('should authorize a white pawn on first move to move two squares ahead', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: true,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([4, 3]), List([5, 3])]);
      expect(actual.toJS()).toEqual(expected.toJS());
    });
    it('should authorize a black pawn to move one square ahead', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([2, 3])]);
      expect(actual.toJS()).toEqual(expected.toJS());
    });
    it('should authorize a black pawn to move two squares ahead', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: true,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([1, 3]), List([2, 3])]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
    it('should not authorize a pawn to move if an enemy piece is on the way ', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: true,
          }),
          PAWN1: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([2, 3]),
            firstMove: true,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([]);
      expect(actual.toJS()).toEqual(expected.toJS());
    });
    it('should authorize black pawn capturing of a white Pawn', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: false,
          }),
          PAWN1: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([2, 2]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([2, 2]), List([2, 3])]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
    it('should authorize white pawn capturing of a two black Pawn', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          PAWN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.PAWN,
            position: List([3, 3]),
            firstMove: false,
          }),
          PAWN1: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([4, 2]),
            firstMove: false,
          }),
          PAWN2: Map({
            team: Players.BLACK,
            type: ChessPiecesTypes.PAWN,
            position: List([4, 4]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'PAWN');
      const expected = List([List([4, 2]), List([4, 3]), List([4, 4])]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
  describe('ROOK', () => {
    it('should be authorized to move in all horizontal and vertical positions', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          ROOK: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.ROOK,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'ROOK');
      const expected = List([
        List([0, 3]),
        List([1, 3]),
        List([2, 3]),
        List([3, 0]),
        List([3, 1]),
        List([3, 2]),
        List([3, 4]),
        List([3, 5]),
        List([3, 6]),
        List([3, 7]),
        List([4, 3]),
        List([5, 3]),
        List([6, 3]),
        List([7, 3]),
      ]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
  describe('BISHOP', () => {
    it('should be authorized to move in all diagnoal positions', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          BISHOP: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.BISHOP,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'BISHOP');
      const expected = List([
        List([0, 0]),
        List([0, 6]),
        List([1, 1]),
        List([1, 5]),
        List([2, 2]),
        List([2, 4]),
        List([4, 2]),
        List([4, 4]),
        List([5, 1]),
        List([5, 5]),
        List([6, 0]),
        List([6, 6]),
        List([7, 7]),
      ]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
  describe('KNIGHT', () => {
    it('should be authorized to move in all knight positions', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          KNIGHT: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.KNIGHT,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'KNIGHT');
      const expected = List([
        List([1, 2]),
        List([1, 4]),
        List([2, 1]),
        List([2, 5]),
        List([4, 1]),
        List([4, 5]),
        List([5, 2]),
        List([5, 4]),
      ]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
  describe('QUEEN', () => {
    it('should be authorized to move in all vertical horizontal and diagonal positions', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          QUEEN: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.QUEEN,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'QUEEN');
      const expected = List([
        List([0, 0]),
        List([0, 3]),
        List([0, 6]),
        List([1, 1]),
        List([1, 3]),
        List([1, 5]),
        List([2, 2]),
        List([2, 3]),
        List([2, 4]),
        List([3, 0]),
        List([3, 1]),
        List([3, 2]),
        List([3, 4]),
        List([3, 5]),
        List([3, 6]),
        List([3, 7]),
        List([4, 2]),
        List([4, 3]),
        List([4, 4]),
        List([5, 1]),
        List([5, 3]),
        List([5, 5]),
        List([6, 0]),
        List([6, 3]),
        List([6, 6]),
        List([7, 3]),
        List([7, 7]),
      ]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
  describe('KING', () => {
    it('should be authorized to move in all vertical horizontal and diagonal positions on one square', () => {
      const pseudoInitialState = Map({
        turn: Players.WHITE,
        won: false,
        pieces: Map({
          KING: Map({
            team: Players.WHITE,
            type: ChessPiecesTypes.KING,
            position: List([3, 3]),
            firstMove: false,
          }),
        }),
      });

      const actual = getStandardMovesForAPiece(pseudoInitialState, 'KING');
      const expected = List([
        List([2, 2]),
        List([2, 3]),
        List([2, 4]),
        List([3, 2]),
        List([3, 4]),
        List([4, 2]),
        List([4, 3]),
        List([4, 4]),
      ]);
      expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
    });
  });
});

describe('isKingChecked', () => {
  it('should be mate in a simple configuration with a rook', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([5, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingChecked(pseudoInitialState, Players.WHITE);
    expect(actual).toBeTruthy();
  });
  it('should not be mate with an allied rook', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        ROOK: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.ROOK,
          position: List([5, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingChecked(pseudoInitialState, Players.WHITE);
    expect(actual).toBeFalsy();
  });

  it('should not be mate with an enemy rook not in place', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([3, 3]),
          firstMove: false,
        }),
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([4, 4]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingChecked(pseudoInitialState, Players.BLACK);
    expect(actual).toBeFalsy();
  });
});

describe('isKingCheckedMate', () => {
  it('should not be checkedMate if the king is not even checked', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([7, 7]),
          firstMove: false,
        }),
        ROOK2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([4, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingCheckedMate(pseudoInitialState, Players.WHITE);
    expect(actual).toBeFalsy();
  });
  it('should be checkedMate if the king is in a corner', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([1, 7]),
          firstMove: false,
        }),
        ROOK2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 7]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingCheckedMate(pseudoInitialState, Players.WHITE);
    expect(actual).toBeTruthy();
  });
  it('should not be checked mate If the king can capture one of the rook', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([1, 0]),
          firstMove: false,
        }),
        ROOK2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 7]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingCheckedMate(pseudoInitialState, Players.WHITE);
    expect(actual).toBeFalsy();
  });

  it('should not be checked mate if an ally can capture one of the rook', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
          firstMove: false,
        }),
        BISHOP: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([2, 6]),
          firstMove: false,
        }),
        ROOK1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([1, 7]),
          firstMove: false,
        }),
        ROOK2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 7]),
          firstMove: false,
        }),
      }),
    });

    const actual = isKingCheckedMate(pseudoInitialState, Players.WHITE);
    expect(actual).toBeFalsy();
  });
  it('should be checkedMate in a scholars mate situation', () => {
    const pseudoInitialState = Map({
      turn: 'BLACK',
      won: false,
      selectedPiece: '',
      currentLegalMoves: [],
      capturedPieces: Map({
        BLACK_PAWN6: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 5]),
          firstMove: true,
        }),
      }),
      pieces: Map({
        WHITE_ROOK1: Map({
          team: 'WHITE',
          type: 'ROOK',
          position: List([0, 0]),
        }),
        WHITE_ROOK2: Map({
          team: 'WHITE',
          type: 'ROOK',
          position: List([0, 7]),
        }),
        BLACK_KNIGHT1: Map({
          team: 'BLACK',
          type: 'KNIGHT',
          position: List([5, 0]),
        }),
        BLACK_KNIGHT2: Map({
          team: 'BLACK',
          type: 'KNIGHT',
          position: List([7, 6]),
        }),
        BLACK_PAWN1: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 0]),
          firstMove: true,
        }),
        BLACK_PAWN2: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 1]),
          firstMove: true,
        }),
        BLACK_QUEEN: Map({
          team: 'BLACK',
          type: 'QUEEN',
          position: List([7, 3]),
        }),
        BLACK_PAWN3: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 2]),
          firstMove: true,
        }),
        BLACK_PAWN4: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 3]),
          firstMove: true,
        }),
        BLACK_PAWN5: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([4, 4]),
          firstMove: false,
        }),
        WHITE_KING: Map({
          team: 'WHITE',
          type: 'KING',
          position: List([0, 4]),
        }),
        WHITE_KNIGHT1: Map({
          team: 'WHITE',
          type: 'KNIGHT',
          position: List([0, 1]),
        }),
        BLACK_PAWN7: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 6]),
          firstMove: true,
        }),
        WHITE_KNIGHT2: Map({
          team: 'WHITE',
          type: 'KNIGHT',
          position: List([0, 6]),
        }),
        BLACK_PAWN8: Map({
          team: 'BLACK',
          type: 'PAWN',
          position: List([6, 7]),
          firstMove: true,
        }),
        WHITE_PAWN1: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 0]),
          firstMove: true,
        }),
        WHITE_PAWN2: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 1]),
          firstMove: true,
        }),
        WHITE_QUEEN: Map({
          team: 'WHITE',
          type: 'QUEEN',
          position: List([6, 5]),
        }),
        BLACK_BISHOP1: Map({
          team: 'BLACK',
          type: 'BISHOP',
          position: List([7, 2]),
        }),
        WHITE_PAWN3: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 2]),
          firstMove: true,
        }),
        BLACK_BISHOP2: Map({
          team: 'BLACK',
          type: 'BISHOP',
          position: List([7, 5]),
        }),
        WHITE_PAWN4: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 3]),
          firstMove: true,
        }),
        WHITE_PAWN5: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([3, 4]),
          firstMove: false,
        }),
        BLACK_KING: Map({
          team: 'BLACK',
          type: 'KING',
          position: List([7, 4]),
        }),
        WHITE_PAWN6: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 5]),
          firstMove: true,
        }),
        BLACK_ROOK1: Map({
          team: 'BLACK',
          type: 'ROOK',
          position: List([7, 0]),
        }),
        WHITE_PAWN7: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 6]),
          firstMove: true,
        }),
        BLACK_ROOK2: Map({
          team: 'BLACK',
          type: 'ROOK',
          position: List([7, 7]),
        }),
        WHITE_PAWN8: Map({
          team: 'WHITE',
          type: 'PAWN',
          position: List([1, 7]),
          firstMove: true,
        }),
        WHITE_BISHOP1: Map({
          team: 'WHITE',
          type: 'BISHOP',
          position: List([0, 2]),
        }),
        WHITE_BISHOP2: Map({
          team: 'WHITE',
          type: 'BISHOP',
          position: List([3, 2]),
        }),
      }),
    });

    const actual = isKingCheckedMate(pseudoInitialState, Players.BLACK);
    expect(actual).toBeTruthy();
  });
});

describe('isAPromotion', () => {
  it('should be a promotion for a bad id', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([7, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'BAD_ID');
    expect(actual).toBeFalsy();
  });
  it('should be a promotion for a white pawn on row 7', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([7, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeTruthy();
  });
  it('should be a promotion for a black pawn on row 0', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([0, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeTruthy();
  });
  it('should not be a promotion for a black pawn on row 4', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([4, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeFalsy();
  });
  it('should not be a promotion for a black pawn on row 7', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([7, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeFalsy();
  });
  it('should not be a promotion for a white pawn on row 0', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([0, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeFalsy();
  });
  it('should not be a promotion for a non pawn on whatever row', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([7, 3]),
          firstMove: false,
        }),
      }),
    });

    const actual = isAPromotion(pseudoInitialState, 'PAWN');
    expect(actual).toBeFalsy();
  });
});
