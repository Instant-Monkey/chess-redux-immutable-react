import React from 'react';
import PieceSquare from './PieceSquare';
import EmptySquare from './EmptySquare';
import { useClickOnSquare } from '../hooks/useClickOnSquare';
import { useSelector } from 'react-redux';
import {
  getPieceIdOnSquareByPosition,
  getPieceOnSquareByPosition,
} from '../reducers/selectors';

function Square({ position }) {
  const pieceId = useSelector(state =>
    getPieceIdOnSquareByPosition(state, position)
  );
  const piece = useSelector(state =>
    getPieceOnSquareByPosition(state, position)
  );
  const onClickOnSquare = useClickOnSquare(position, pieceId, piece);
  return (
    <div onClick={onClickOnSquare} style={{ height: '100%' }}>
      {pieceId ? (
        <PieceSquare pieceId={pieceId} piece={piece} position={position} />
      ) : (
        <EmptySquare position={position} />
      )}
    </div>
  );
}

export default Square;
