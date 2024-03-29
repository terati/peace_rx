import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout_Card } from 'renderer/Components/Logout_Card';
import "./Sidebar.css";

// import HomeIcon from '../../../assets/generalIcons/layout-fluid.svg';
// import PencilIcon from '../../../assets/generalIcons/pencil.svg';
// import InventoryIcon from '../../../assets/generalIcons/layers.svg';
// import SettingsIcon from '../../../assets/generalIcons/settings.svg';
// import ExclamationIcon from '../../../assets/generalIcons/exclamation.svg';
// import SignoutIcon from '../../../assets/generalIcons/sign-out-alt.svg';

// import CalenderIcon from '../../../assets/generalIcons/calendar.svg';
import Calender_Icon from '../Icons_Color_Control/Calender_Icon';
import Dashboard_Icon from '../Icons_Color_Control/Dashboard_Icon';
import Database_Icon from '../Icons_Color_Control/Database_Icon';
import Settings_Icon from '../Icons_Color_Control/Settings_Icon';
import Signout_Icon from '../Icons_Color_Control/Signout_Icon';

function Sidebar({ selected = 'home' }) {
  const size = 20;
  const [logout_card_status, set_logout_card_status] = React.useState(false);
  let navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        {/* <img src={HomeIcon} height={size} width={size} alt="fasd" 
          className={(selected == 'home') ? 'selected' : ''}
          onClick={() => navigate('/')}
          />
        <img src={InventoryIcon} height={size} width={size} 
          alt="fasd" 
          className={(selected == 'inventory') ? 'selected' : ''}
          onClick={() => navigate('/inventory')} 
        />  */}
        {/* <img src={PencilIcon} height={size} width={size} alt="fasd" className={(selected == 'notes') ? 'selected' : ''}/> */}
        {/* <img src={SettingsIcon} height={size} width={size} alt="fasd" className={(selected == 'settings') ? 'selected' : ''}/> */}
        {/* <img src={Calender} height={size} width={size} alt="fasd" className={(selected == 'calender') ? 'selected' : ''}/> */}
        {/* <img src={SignoutIcon} height={size} width={size} alt="fasd" className={(selected == 'signout') ? 'selected' : ''}/> */}
        
        <div className={`option_focus ${(selected == 'home') ? 'selected' : ''}`}
          onClick={() => navigate('/')}
        >
          <Dashboard_Icon height={size} width={size} fill="white" />
        </div>

        <div className={`option_focus ${(selected == 'inventory') ? 'selected' : ''}`}
          onClick={() => navigate('/inventory')}
        >
          <Database_Icon height={size} width={size} fill="white" />
        </div>

        <div className={`option_focus ${(selected == 'settings') ? 'selected' : ''}`}
          onClick={() => navigate('/settings')}
        >
          <Settings_Icon height={size} width={size} fill="white" />
        </div>

        <div className={`option_focus ${(selected == 'schedule') ? 'selected' : ''}`}
          onClick={() => navigate('/schedule')}
        >
          <Calender_Icon height={size} width={size} fill="white" />
        </div>

        <div className={`option_focus ${(selected == 'signout') ? 'selected' : ''}`}
          onClick={() => set_logout_card_status(true)}
        >
          <Signout_Icon height={size} width={size} fill="white" />
        </div>
        { logout_card_status &&
            <Logout_Card 
              logout_card_status
              set_logout_card_status={set_logout_card_status}
            />
        }
        
      </div> 
    </>
    
  )
}

export default Sidebar