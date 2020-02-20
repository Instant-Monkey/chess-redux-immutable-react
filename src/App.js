import React, { useCallback } from 'react';
import './App.css';
import { Board } from './components/Board';
import CapturedPieces from './components/CapturedPieces';
import { Players } from './helpers/constants';
import { createUseStyles } from 'react-jss';
import Turn from './components/Turn';
import IsChecked from './components/IsChecked';
import { useDispatch } from 'react-redux';
import { newGame } from './actions/actions';

const useStyles = createUseStyles({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  boardContainer: {
    height: 650,
    display: 'flex',
    alignItems: 'flex-start',
  },
  whiteCapturedPiecesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onNewGameClick = useCallback(() => {
    dispatch(newGame());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <Turn />
      <div className={classes.boardContainer}>
        <CapturedPieces team={Players.BLACK} />
        <Board />

        <div className={classes.whiteCapturedPiecesContainer}>
          <CapturedPieces team={Players.WHITE} />
        </div>
      </div>
      <IsChecked />
      <button onClick={onNewGameClick}>NEW GAME</button>
    </div>
  );
}

export default App;
