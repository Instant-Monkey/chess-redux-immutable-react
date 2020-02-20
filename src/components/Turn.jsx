import React from 'react';
import { useSelector } from 'react-redux';
import { getTurn } from '../reducers/selectors';

function Turn() {
  const turn = useSelector(getTurn);

  return <h2>Turn : {turn}</h2>;
}

export default Turn;
