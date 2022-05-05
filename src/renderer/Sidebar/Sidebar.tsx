import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";

import HomeIcon from '../../../assets/generalIcons/layout-fluid.svg';
import PencilIcon from '../../../assets/generalIcons/pencil.svg';
import InventoryIcon from '../../../assets/generalIcons/layers.svg';
import SettingsIcon from '../../../assets/generalIcons/settings.svg';
import ExclamationIcon from '../../../assets/generalIcons/exclamation.svg';
import SignoutIcon from '../../../assets/generalIcons/sign-out-alt.svg';

function Sidebar({ selected = 'home' }) {
  const size = 20;
  let navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        <img src={HomeIcon} height={size} width={size} alt="fasd" 
          className={(selected == 'home') ? 'selected' : ''}
          onClick={() => navigate('/')}
          />
        <img src={InventoryIcon} height={size} width={size} 
          alt="fasd" 
          className={(selected == 'inventory') ? 'selected' : ''}
          onClick={() => navigate('/inventory')}
        />
        <img src={PencilIcon} height={size} width={size} alt="fasd" className={(selected == 'notes') ? 'selected' : ''}/>
        <img src={SettingsIcon} height={size} width={size} alt="fasd" className={(selected == 'settings') ? 'selected' : ''}/>
        <img src={ExclamationIcon} height={size} width={size} alt="fasd" className={(selected == 'about') ? 'selected' : ''}/>
        <img src={SignoutIcon} height={size} width={size} alt="fasd" className={(selected == 'signout') ? 'selected' : ''}/>
      </div> 
    </>
    
  )
}

export default Sidebar