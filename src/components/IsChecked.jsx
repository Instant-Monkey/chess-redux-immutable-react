import React from 'react';
import { useSelector } from 'react-redux';
import { getTurn, getWon } from '../reducers/selectors';
import { isKingChecked } from '../chess-rules/chessRules';
import { getOppositeTeam } from '../helpers/helpers';

function IsChecked() {
  const turn = useSelector(getTurn);
  const checked = useSelector(state => isKingChecked(state, turn));
  const checkedMate = useSelector(getWon);
  if (!checked) {
    return <h2 style={{ height: 32 }}>&nbsp;</h2>;
  }
  if (checkedMate) {
    return <h2>Check Mate ! {getOppositeTeam(turn)} win ! </h2>;
  }
  return <h2>{turn} King is checked</h2>;
}

export default IsChecked;
