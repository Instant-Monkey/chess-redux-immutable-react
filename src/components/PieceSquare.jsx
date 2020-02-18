import React, { useMemo } from 'react';
import { getPieceUnicode } from '../helpers/helpers';
import { Players } from '../helpers/constants';
import { createUseStyles } from 'react-jss';
import {
  getTurn,
  isPositionOnLegalMoves,
  getSelectedPiece,
} from '../reducers/selectors';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles({
  root: {
    fontSize: 64,
    paddingLeft: 8,
    marginTop: -2,
    color: ({ piece }) => {
      return piece && piece.get('team') === Players.WHITE ? 'white' : 'black';
    },
    backgroundColor: ({ isUnderAttack, isSelected }) =>
      isUnderAttack
        ? 'rgba(255,255,255,0.5)'
        : isSelected
        ? 'rgba(0,0,255,0.25)'
        : '',
    cursor: ({ isASelectionablePiece, isUnderAttack }) =>
      isASelectionablePiece || isUnderAttack ? 'pointer' : 'default',
    '&:hover': {
      backgroundColor: ({ isUnderAttack }) =>
        isUnderAttack ? 'rgba(255,0,0,1)' : '',
    },
  },
});

function PieceSquare({ piece, position, pieceId }) {
  const turn = useSelector(state => getTurn(state));
  const isASelectionablePiece = piece.get('team') === turn;
  const selectedPiece = useSelector(getSelectedPiece);
  const isSelected = useMemo(() => selectedPiece === pieceId, [
    pieceId,
    selectedPiece,
  ]);

  const isUnderAttack = useSelector(state =>
    isPositionOnLegalMoves(state, position)
  );
  const classes = useStyles({
    piece,
    isASelectionablePiece,
    isUnderAttack,
    isSelected,
  });

  const unicode = useMemo(() => getPieceUnicode(piece), [piece]);

  return <div className={classes.root}>{unicode}</div>;
}

export default PieceSquare;
