import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { isPositionOnLegalMoves } from '../reducers/selectors';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%',
    content: '',
    backgroundColor: ({ isUnderALegalMove }) =>
      isUnderALegalMove ? 'rgba(255,255,255,0.5)' : 'inherit',
    cursor: ({ isUnderALegalMove }) =>
      isUnderALegalMove ? 'pointer' : 'default',
    '&:hover': {
      backgroundColor: ({ isUnderALegalMove }) =>
        isUnderALegalMove ? 'rgba(255,0,0, 0.25)' : 'inherit',
    },
  },
});

function EmptySquare({ position }) {
  const isUnderALegalMove = useSelector(state =>
    isPositionOnLegalMoves(state, position)
  );

  const classes = useStyles({ isUnderALegalMove });

  return <div className={classes.root}></div>;
}

export default EmptySquare;
