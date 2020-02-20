import React, { useMemo } from 'react';
import Square from './Square';
import { createUseStyles } from 'react-jss';
import { List } from 'immutable';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: 650,
  },
  boardRow: {
    display: 'flex',
    width: '100%',
    height: `${100 / 8}%`,
  },
  boardSquareContainer: {
    width: `${100 / 8}%`,
    height: '100%',
  },
});

export function Board() {
  const boardArray = useMemo(() => generateBoardArray(), []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {boardArray.map((row, i) => (
        <div className={classes.boardRow} key={i}>
          {row.map((square, j) => (
            <div
              className={classes.boardSquareContainer}
              style={{ backgroundColor: getBoardColor(i, j) }}
              key={`${i}${j}`}
            >
              <Square position={List([7 - i, j])} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getBoardColor(i, j) {
  if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
    return '#eeab71';
  }
  return '#451d06';
}

function generateBoardArray() {
  const board = [];
  for (let i = 0; i < 8; i += 1) {
    board.push([]);
    for (let j = 0; j < 8; j += 1) {
      board[i][j] = [i, j];
    }
  }
  return board;
}
