import React, { useMemo } from 'react';
import { getCapturedPieces } from '../reducers/selectors';
import { useSelector } from 'react-redux';
import { getPieceUnicode } from '../helpers/helpers';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    width: 150,
    flexFlow: 'wrap',
  },
  capturedPiece: {
    fontSize: 48,
    width: 50,
  },
});

function CapturedPieces({ team }) {
  const capturedPieces = useSelector(getCapturedPieces);
  const teamCapturedPieces = useMemo(
    () => capturedPieces.filter(piece => piece.get('team') === team).toArray(),
    [team, capturedPieces]
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {teamCapturedPieces &&
        teamCapturedPieces.map(piece => (
          <div className={classes.capturedPiece} key={piece[0]}>
            {getPieceUnicode(piece[1])}
          </div>
        ))}
    </div>
  );
}

export default CapturedPieces;
