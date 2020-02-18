import { Map, List } from 'immutable';
import {
  getHorizontalLegalMoves,
  areTwoPiecesTheSameTeam,
  getDirectionLegalMoves,
  isCoordinatesOutOfBoard,
  getVerticalLegalMoves,
  getDiagonalLegalMoves,
  getKnightLegalMoves,
  getPawnCaptureMoves,
} from './chessRulesHelpers';
import { Players, ChessPiecesTypes } from '../helpers/constants';
import { sortListByPosition } from '../helpers/helpers';

describe('areTwoPiecesTheSameTeam', () => {
  it('should return true if two pieces are in the same team', () => {
    const piece1 = Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.KING,
      position: List([0, 0]),
    });
    const piece2 = Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.QUEEN,
      position: List([0, 1]),
    });
    const actual = areTwoPiecesTheSameTeam(piece1, piece2);
    expect(actual).toBeTruthy();
  });
  it('should return false if two pieces are not in the same team', () => {
    const piece1 = Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.KING,
      position: List([0, 0]),
    });
    const piece2 = Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.QUEEN,
      position: List([0, 1]),
    });
    const actual = areTwoPiecesTheSameTeam(piece1, piece2);
    expect(actual).toBeFalsy();
  });
});

describe('getHorizontalLegalMoves', () => {
  it('should return all the horizontal positions for a board with one piece except origin', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
        }),
      }),
    });
    const actual = getHorizontalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([0, 1]),
      List([0, 2]),
      List([0, 3]),
      List([0, 4]),
      List([0, 5]),
      List([0, 6]),
      List([0, 7]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return no positions if the piece is surrended by friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 2]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 1]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([0, 3]),
        }),
      }),
    });
    const actual = getHorizontalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
  it('should return all positions until friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 2]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getHorizontalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([List([0, 1]), List([0, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return all positions included ennemy pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 2]),
        }),
        QUEEN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 0]),
        }),
        BISHOP: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getHorizontalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([0, 0]),
      List([0, 1]),
      List([0, 3]),
      List([0, 4]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return no positions if the pieceId is not on the game', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 2]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 1]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([0, 3]),
        }),
      }),
    });
    const actual = getHorizontalLegalMoves(
      pseudoInitialState,
      'KING_FOR_A_DAY'
    );
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
});
describe('getVerticalLegalMoves', () => {
  it('should return all the Vertical positions for a board with one piece except origin', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 0]),
        }),
      }),
    });
    const actual = getVerticalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([1, 0]),
      List([2, 0]),
      List([3, 0]),
      List([4, 0]),
      List([5, 0]),
      List([6, 0]),
      List([7, 0]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return no positions if the piece is surrended by friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 0]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([1, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 0]),
        }),
      }),
    });
    const actual = getVerticalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
  it('should return all positions until friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 0]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([4, 0]),
        }),
      }),
    });
    const actual = getVerticalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([List([1, 0]), List([3, 0])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return all positions included ennemy pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 0]),
        }),
        QUEEN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 0]),
        }),
        BISHOP: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([4, 0]),
        }),
      }),
    });
    const actual = getVerticalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([0, 0]),
      List([1, 0]),
      List([3, 0]),
      List([4, 0]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return no positions if the pieceId is not on the game', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 0]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([1, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 0]),
        }),
      }),
    });
    const actual = getVerticalLegalMoves(pseudoInitialState, 'KING_FOR_A_DAY');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
});

describe('getDiagonalLegalMoves', () => {
  it('should return all the Diagonal positions for a board with one piece except origin', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([3, 3]),
        }),
      }),
    });
    const actual = getDiagonalLegalMoves(pseudoInitialState, 'QUEEN');
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
  it('should return no positions if the piece is surrended by friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 2]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([1, 1]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 3]),
        }),
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([3, 1]),
        }),
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 3]),
        }),
      }),
    });
    const actual = getDiagonalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
  it('should return all positions until friendly pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 2]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([0, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([4, 4]),
        }),
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([4, 0]),
        }),
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getDiagonalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([1, 1]),
      List([1, 3]),
      List([3, 1]),
      List([3, 3]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return all positions included ennemy pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 2]),
        }),
        QUEEN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.QUEEN,
          position: List([1, 1]),
        }),
        BISHOP: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 3]),
        }),
        ROOK: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.ROOK,
          position: List([3, 1]),
        }),
        PAWN: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 3]),
        }),
      }),
    });
    const actual = getDiagonalLegalMoves(pseudoInitialState, 'KING');
    const expected = List([
      List([1, 1]),
      List([1, 3]),
      List([3, 1]),
      List([3, 3]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return no positions if the pieceId is not on the game', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([2, 0]),
        }),
        QUEEN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.QUEEN,
          position: List([1, 0]),
        }),
        BISHOP: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.BISHOP,
          position: List([3, 0]),
        }),
      }),
    });
    const actual = getDiagonalLegalMoves(pseudoInitialState, 'KING_FOR_A_DAY');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
});
describe('getDirectionLegalMoves', () => {
  it('should return all the horizontal moves to the right', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [0, 1], 'ROOK');
    const expected = List([
      List([0, 1]),
      List([0, 2]),
      List([0, 3]),
      List([0, 4]),
      List([0, 5]),
      List([0, 6]),
      List([0, 7]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return only one moves to the right if the limit is at 1', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(
      pseudoInitialState,
      [0, 1],
      'ROOK',
      1
    );
    const expected = List([List([0, 1])]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
  it('should stop the horizontal moves to the right before a friendly piece', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
        KING: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KING,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [0, 1], 'ROOK');
    const expected = List([List([0, 1]), List([0, 2]), List([0, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should stop the horizontal moves to the right after a ennemy piece', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [0, 1], 'ROOK');
    const expected = List([
      List([0, 1]),
      List([0, 2]),
      List([0, 3]),
      List([0, 4]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should stop the horizontal moves before ennemy piece if preventCapture is on', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
        KING: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.KING,
          position: List([0, 4]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(
      pseudoInitialState,
      [0, 1],
      'ROOK',
      0,
      true
    );
    const expected = List([List([0, 1]), List([0, 2]), List([0, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return the horizontal move to the left', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 7]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [0, -1], 'ROOK');
    const expected = List([
      List([0, 0]),
      List([0, 1]),
      List([0, 2]),
      List([0, 3]),
      List([0, 4]),
      List([0, 5]),
      List([0, 6]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return the vertical moves to the top', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([0, 0]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [1, 0], 'ROOK');
    const expected = List([
      List([1, 0]),
      List([2, 0]),
      List([3, 0]),
      List([4, 0]),
      List([5, 0]),
      List([6, 0]),
      List([7, 0]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return the vertical moves to the bottom', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([7, 0]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [-1, 0], 'ROOK');
    const expected = List([
      List([0, 0]),
      List([1, 0]),
      List([2, 0]),
      List([3, 0]),
      List([4, 0]),
      List([5, 0]),
      List([6, 0]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should return the vertical moves in diagonal', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        ROOK: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.ROOK,
          position: List([3, 4]),
        }),
      }),
    });
    const actual = getDirectionLegalMoves(pseudoInitialState, [-1, -1], 'ROOK');
    const expected = List([List([0, 1]), List([1, 2]), List([2, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
});
describe('getKnightLegalMoves', () => {
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
    const actual = getKnightLegalMoves(pseudoInitialState, 'KNIGHTT');
    expect(actual.toJS()).toEqual([]);
  });
  it('should offer all the move for a knight alone on board', () => {
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

    const actual = getKnightLegalMoves(pseudoInitialState, 'KNIGHT');
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

  it('should remove the out of board move for a knight', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KNIGHT,
          position: List([0, 0]),
        }),
      }),
    });

    const actual = getKnightLegalMoves(pseudoInitialState, 'KNIGHT');
    const expected = List([List([1, 2]), List([2, 1])]);

    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });

  it('should remove the moves for a knight when already occupied by allied', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KNIGHT,
          position: List([3, 3]),
        }),
        PAWN1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 2]),
        }),
        PAWN2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 4]),
        }),
        PAWN3: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([5, 2]),
        }),
        PAWN4: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([5, 4]),
        }),
      }),
    });

    const actual = getKnightLegalMoves(pseudoInitialState, 'KNIGHT');
    const expected = List([
      List([2, 1]),
      List([2, 5]),
      List([4, 1]),
      List([4, 5]),
    ]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });

  it('should propose all the moves when occupied by ennemy pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        KNIGHT: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.KNIGHT,
          position: List([3, 3]),
        }),
        PAWN1: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 2]),
        }),
        PAWN2: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 4]),
        }),
        PAWN3: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([5, 2]),
        }),
        PAWN4: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([5, 4]),
        }),
      }),
    });

    const actual = getKnightLegalMoves(pseudoInitialState, 'KNIGHT');
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

describe('getPawnCaptureMoves', () => {
  it('should return an empty list if the id is bad', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([2, 2]),
        }),
      }),
    });
    const actual = getPawnCaptureMoves(pseudoInitialState, 'PAWN1');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
  it('should give two legal moves for capturing two ennemy BLACK pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN1: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([2, 2]),
        }),
        PAWN2: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([3, 3]),
        }),
        PAWN3: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([3, 1]),
        }),
      }),
    });
    const actual = getPawnCaptureMoves(pseudoInitialState, 'PAWN1');
    const expected = List([List([3, 1]), List([3, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should give two legal moves for capturing two ennemy BLACK pieces', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([2, 2]),
        }),
        PAWN2: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 3]),
        }),
        PAWN3: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([1, 1]),
        }),
      }),
    });
    const actual = getPawnCaptureMoves(pseudoInitialState, 'PAWN1');
    const expected = List([List([1, 1]), List([1, 3])]);
    expect(sortListByPosition(actual).toJS()).toEqual(expected.toJS());
  });
  it('should give no legal moves if there is no capture possible', () => {
    const pseudoInitialState = Map({
      turn: Players.WHITE,
      won: false,
      pieces: Map({
        PAWN1: Map({
          team: Players.BLACK,
          type: ChessPiecesTypes.PAWN,
          position: List([2, 2]),
        }),
        PAWN2: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([4, 4]),
        }),
        PAWN3: Map({
          team: Players.WHITE,
          type: ChessPiecesTypes.PAWN,
          position: List([5, 5]),
        }),
      }),
    });
    const actual = getPawnCaptureMoves(pseudoInitialState, 'PAWN1');
    const expected = List([]);
    expect(actual.toJS()).toEqual(expected.toJS());
  });
});

describe('isCoordinatesOutOfBoard', () => {
  it('should return true if on board', () => {
    const actual = isCoordinatesOutOfBoard(List([1, 4]));
    expect(actual).toBeFalsy();
  });
  it('should return false if x on -1', () => {
    const actual = isCoordinatesOutOfBoard(List([-1, 4]));
    expect(actual).toBeTruthy();
  });
  it('should return false if x on 8', () => {
    const actual = isCoordinatesOutOfBoard(List([8, 4]));
    expect(actual).toBeTruthy();
  });
  it('should return false if y on -1', () => {
    const actual = isCoordinatesOutOfBoard(List([1, -1]));
    expect(actual).toBeTruthy();
  });
  it('should return false if y on 8', () => {
    const actual = isCoordinatesOutOfBoard(List([1, 8]));
    expect(actual).toBeTruthy();
  });
});
