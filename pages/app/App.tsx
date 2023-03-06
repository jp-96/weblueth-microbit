import React from 'react'
import Logo from './Logo';  // logo.svg ==> Log0.tsx
//import './App.css'; // ==> ../index.html
import { MicrobitContextProvider } from '../../src';
import MicrobitConn from '../components/MicrobitConn';
import MicrobitName from '../components/MicrobitName';
import MicrobitBtn from '../components/MicrobitBtn';
import MicrobitAcc from '../components/MicrobitAcc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/app/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MicrobitContextProvider connectionName={"micro:bit"}>
          <p>
            <MicrobitConn />
            <br/>
            micro:bit Name: <MicrobitName /><br/>
            Button A: <MicrobitBtn button='a' /> Button B: <MicrobitBtn button='b' />
            <br/>
            Accelerometer
            <MicrobitAcc/>
          </p>
        </MicrobitContextProvider>
      </header>
    </div>
  );
}

export default App;
