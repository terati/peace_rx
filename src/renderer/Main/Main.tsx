import * as React from 'react';
import "./../App.scss"
import Sidebar from 'renderer/Sidebar/Sidebar';
import "./Main.css";
import Graph from './Graph';

function Main() {
  return (
    <>
      <Sidebar selected={'home'}/>
      {/* <div className="gridRow">

      </div> */}
      <div className="gridRow">
        <div className="gridLeftCol">
          <div className="gridLeftTop">
            <h1> Add New Action </h1>

            <div className="statusBoxes"> 

              <div className="_box" id="_box1"> 
                <div className="_boxTitle"> 
                  Messages
                </div>
                <div className="_boxDescription"> 
                  <h1>{31}</h1>
                  <p> new messages</p>
                </div>
              </div>

              <div className="_box" id="_box2"> 
                <div className="_boxTitle"> 
                  Stock
                </div>
                <div className="_boxDescription"> 
                  <h1>{142}</h1>
                  <p> total products</p>
                </div>
              </div>

              <div className="_box" id="_box3"> 
                <div className="_boxTitle"> 
                  Refill
                </div>
                <div className="_boxDescription"> 
                  <h1>{5}</h1>
                  <p> needing refills</p>
                </div>
              </div>
            </div>
          </div>

          <div className="gridLeftBottom">
            <h1> Inventory Trends </h1>
            <Graph />
          </div>
          
        </div>
{/* ---------------------------------------------------------------- */}
        <div className="gridRightCol">
          Hello World
          
        </div>

      </div>
    </>
    
  )
}

export default Main