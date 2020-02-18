import React from 'react';
import './App.css';
import { Board } from './components/Board';

const appStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function App() {
  return (
    <div>
      <div style={appStyle}>
        <Board />
      </div>
    </div>
  );
}

export default App;
