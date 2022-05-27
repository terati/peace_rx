import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react';
import icon from '../../assets/icon.svg';
import axios from 'axios';

import minimizeIcon from './../../assets/generalIcons/minimize.svg';
import closeIcon from './../../assets/generalIcons/close.svg';
import restoreUpIcon from './../../assets/generalIcons/restoreUp.svg';
import restoreDownIcon from './../../assets/generalIcons/restoreDown.svg';

import './App.css';


import Inventory from './Inventory/Inventory';
import { Main } from './Main';
import Setting from './Setting/Setting';
// onClick={() => ipcRenderer.send('close-window')}
// import { ipcRenderer } from require('electron').myPing;

export default function App() {
  const size = 10;

  // React.useEffect(() => {
  //   window.electron.ipcRenderer.myPing()
  // }, []);

  return (
    <>
      <header id="titlebar">
        <div id="drag-region">

          <div id="window-title">
            <span>Peace Logistic Rx</span>
          </div>

          <div id="window-controls">

            <div className="button" id="min-button" onClick={() => window.electron.ipcRenderer.minimize()}>
              <img className="icon" height={size} width={size} src={minimizeIcon} draggable="false" />
            </div>
            <div className="button" id="max-button" onClick={() => window.electron.ipcRenderer.maximize()}>
              <img className="icon" height={size} width={size} src={restoreUpIcon} draggable="false" />
            </div>
            <div className="button" id="restore-button" onClick={() => window.electron.ipcRenderer.restore()}>
              <img className="icon" height={size} width={size} src={restoreDownIcon} draggable="false" />
            </div>
            <div className="button" id="close-button" onClick={() => window.electron.ipcRenderer.close()}>
              <img className="icon" height={size} width={size} src={closeIcon} draggable="false" />
            </div>

          </div>
        </div>
      </header>

      <Router> 
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </>
  );
}
