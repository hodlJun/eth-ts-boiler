import React from 'react';
import MetaMaskonBoarding from './components/MetaMaskOnBoarding';

function App() {
  let btnText = 'Please Install MetakMask';
  return (
    <MetaMaskonBoarding>
      <button>{btnText}</button>
    </MetaMaskonBoarding>
  );
}

export default App;
