import {
  sortListByPosition,
  getOppositeTeam,
  getPieceUnicode,
} from './helpers';
import { List, Map } from 'immutable';
import { Players, ChessPiecesTypes } from './constants';

describe('sortListByPosition', () => {
  it('should sort an horizontal list', () => {
    const list = List([List([0, 2]), List([0, 1])]);
    const actual = sortListByPosition(list);
    expect(actual.toJS()).toEqual([
      [0, 1],
      [0, 2],
    ]);
  });
  it('should sort a vertical list', () => {
    const list = List([List([1, 2]), List([0, 2])]);
    const actual = sortListByPosition(list);
    expect(actual.toJS()).toEqual([
      [0, 2],
      [1, 2],
    ]);
  });
  it('should sort a diagonal list', () => {
    const list = List([List([3, 5]), List([0, 2]), List([2, 7]), List([2, 4])]);
    const actual = sortListByPosition(list);
    expect(actual.toJS()).toEqual([
      [0, 2],
      [2, 4],
      [2, 7],
      [3, 5],
    ]);
  });
});

describe('getOppositeTeam', () => {
  it('should return BLACK when White', () => {
    const actual = getOppositeTeam(Players.BLACK);
    expect(actual).toBe(Players.WHITE);
  });
  it('should return WHITE when Black', () => {
    const actual = getOppositeTeam(Players.WHITE);
    expect(actual).toBe(Players.BLACK);
  });
});

describe('getPieceUnicode', () => {
  it('should return null for no piece ', () => {
    const actual = getPieceUnicode(undefined);
    const expected = null;
    expect(actual).toBe(expected);
  });
  it('should return null for a garbage piece ', () => {
    const king = Map({
      team: 'PURPLE',
      type: 'THIEF',
      position: List([0, 4]),
    });
    const actual = getPieceUnicode(king);
    const expected = null;
    expect(actual).toBe(expected);
  });
  it('should return &#9812; for a White King ', () => {
    const king = Map({
      team: Players.WHITE,
      type: ChessPiecesTypes.KING,
      position: List([0, 4]),
    });
    const actual = getPieceUnicode(king);
    const expected = '\u2654';
    expect(actual).toBe(expected);
  });
});
