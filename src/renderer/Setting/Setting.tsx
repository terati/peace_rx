import * as React from "react";
import "./setting.css";
import "./../App.css";
import Sidebar from 'renderer/Sidebar/Sidebar';
import { Toggle } from "./Toggle";
import { store } from "renderer/store";
import { getIP_async } from "reducers/ip_adr";
import { useSelector } from "react-redux";

import axios from "axios";

function Setting() {
  const [ip, set_ip] = React.useState("");

  const [stat, set_stat] = React.useState<boolean>(true);
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   set_ip(res.data.IPv4);
  //   console.log(useSelector);
  // }

  const ip_store = useSelector(state => state.ip_adr?.value);

  React.useEffect(() => {
    // getData();
    store.dispatch(getIP_async())
  }, []);

  return (
    <>
      <Sidebar selected={'settings'}/>

      <div className="div_setting" >
        <div className="div_inner_setting">
          <h1> Settings </h1>

          <div className="inner_grid_row">
            <div className="inner_grid_col1">
              Current user:
            </div>
            <div className="inner_grid_col2"> 
              Test user 123
            </div>
          </div>

          <div className="inner_grid_row">
            <div className="inner_grid_col1">
              Logged in device IPv4:
            </div>
            <div className="inner_grid_col2"> 
             {ip_store}
            </div>
          </div>

          <div className="inner_grid_row">
            <div className="inner_grid_col1">
              Toggle dark mode
            </div>
            <div className="inner_grid_col2"> 
              <Toggle checked={stat} onClick={() => set_stat(!stat)}/>
              <div style={{marginLeft: "10px"}} > {stat == true ? "Off" : "On" } </div>
            </div>
          </div>

          <div style={{marginTop: "100px"}}>
            Designed and created by Timothy. 
            Windows Client Open Sourced at: 
          </div> 
          <div>
            https://github.com/terati/peace_rx
          </div>
          <div> Server client available at request. </div>
          <div style={{marginTop: "20px"}}>
            Contact: wongtimothy13@gmail.com
          </div>
          <div>
            plRX v0.1.0
          </div>
          <div>
            MIT License. 
          </div>
        </div>
      </div>

      {/* <Webcam audio={false}/> */}
    </>
  )
}

export default Setting