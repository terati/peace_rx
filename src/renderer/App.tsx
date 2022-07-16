import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import * as React from 'react';
import icon from '../../assets/icon.svg';
import axios from 'axios';

import minimizeIcon from './../../assets/generalIcons/minimize.svg';
import closeIcon from './../../assets/generalIcons/close.svg';
import restoreUpIcon from './../../assets/generalIcons/restoreUp.svg';
import restoreDownIcon from './../../assets/generalIcons/restoreDown.svg';

import './App.scss';


import Inventory from './Inventory/Inventory';
import { Main } from './Main';
import Setting from './Setting/Setting';
import { Schedule } from './Schedule';
import './theme.scss';
import { Login } from './Login';
import config from 'config';
// onClick={() => ipcRenderer.send('close-window')}
// import { ipcRenderer } from require('electron').myPing;

Amplify.configure({
  aws_cognito_region: 'us-east-1',
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  }
})

Auth.configure({
  aws_cognito_region: 'us-east-1',
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-1',
    identityPoolId: 'us-east-1:37fe7370-a658-4e7e-85c9-ec9b4c137c12',
  }
})

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
          {/* <Route path="/" element={<Schedule />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/schedule" element={<Schedule />} />

          <Route path="./login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
