import { Map, List } from 'immutable';
import { Players, ChessPiecesTypes } from '../helpers/constants';

export const initialState = Map({
  turn: Players.WHITE,
  won: false,
  pieces: Map({
    BLACK_ROOK1: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.ROOK,
      position: List([7, 0]),
    }),
    BLACK_KNIGHT1: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.KNIGHT,
      position: List([7, 1]),
    }),
    BLACK_BISHOP1: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.BISHOP,
      position: List([7, 2]),
    }),
    BLACK_QUEEN: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.QUEEN,
      position: List([7, 3]),
    }),
    BLACK_KING: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.KING,
      position: List([7, 4]),
    }),
    BLACK_BISHOP2: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.BISHOP,
      position: List([7, 5]),
    }),
    BLACK_KNIGHT2: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.KNIGHT,
      position: List([7, 6]),
    }),
    BLACK_ROOK2: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.ROOK,
      position: List([7, 7]),
    }),
    BLACK_PAWN1: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 0]),
      firstMove: true,
    }),
    BLACK_PAWN2: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 1]),
      firstMove: true,
    }),
    BLACK_PAWN3: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 2]),
      firstMove: true,
    }),
    BLACK_PAWN4: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 3]),
      firstMove: true,
    }),
    BLACK_PAWN5: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 4]),
      firstMove: true,
    }),
    BLACK_PAWN6: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 5]),
      firstMove: true,
    }),
    BLACK_PAWN7: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 6]),
      firstMove: true,
    }),
    BLACK_PAWN8: Map({
      team: Players.BLACK,
      type: ChessPiecesTypes.PAWN,
      position: List([6, 7]),
      firstMove: true,
    }),
    LIGHT_ROOK1: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.ROOK,
      position: List([0, 0]),
    }),
    LIGHT_KNIGHT1: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.KNIGHT,
      position: List([0, 1]),
    }),
    LIGHT_BISHOP1: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.BISHOP,
      position: List([0, 2]),
    }),
    LIGHT_QUEEN: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.QUEEN,
      position: List([0, 3]),
    }),
    LIGHT_KING: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.KING,
      position: List([0, 4]),
    }),
    LIGHT_BISHOP2: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.BISHOP,
      position: List([0, 5]),
    }),
    LIGHT_KNIGHT2: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.KNIGHT,
      position: List([0, 6]),
    }),
    LIGHT_ROOK2: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.ROOK,
      position: List([0, 7]),
    }),
    LIGHT_PAWN1: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 0]),
      firstMove: true,
    }),
    LIGHT_PAWN2: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 1]),
      firstMove: true,
    }),
    LIGHT_PAWN3: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 2]),
      firstMove: true,
    }),
    LIGHT_PAWN4: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 3]),
      firstMove: true,
    }),
    LIGHT_PAWN5: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 4]),
      firstMove: true,
    }),
    LIGHT_PAWN6: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 5]),
      firstMove: true,
    }),
    LIGHT_PAWN7: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 6]),
      firstMove: true,
    }),
    LIGHT_PAWN8: Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.PAWN,
      position: List([1, 7]),
      firstMove: true,
    }),
  }),
});
