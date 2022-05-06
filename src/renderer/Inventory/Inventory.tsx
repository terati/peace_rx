import * as React from 'react';
import './../App.css';
import './InputStyles.css';
import './Inventory.css';
import './SelectionStyles.css';
import Sidebar from 'renderer/Sidebar/Sidebar';
import throttle from 'lodash/throttle';
import { Popup_input } from './Popup_input';
import { Toast } from './Toast';
import axios from 'axios';

function Inventory() {

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [action_status, set_action_status] = React.useState<boolean>(true);
  const [search_value, set_search_value] = React.useState<string | number | undefined>('a');
  // const [is_number, set_is_number] = React.useState<boolean | undefined>();
  const [search_div_open, set_search_div_open] = React.useState<boolean>(false);

  const [popup_item_name, set_popup_item_name] = React.useState('');
  const [popup_item_ndc, set_popup_item_ndc] = React.useState('');
  const [popup_item_qoh, set_popup_item_qoh] = React.useState('');
  const [popup_item_price, set_popup_item_price] = React.useState('');
  const [popup_item_threshhold, set_popup_item_threshhold] = React.useState('');
  const [popup_item_manufacturer, set_popup_item_manufacturer] = React.useState('');

  const throttled = React.useCallback(
    throttle((new_search_value) => {
      let is_number = /^\d/.test(new_search_value);
      let fetchData;
      if (is_number) {
        fetchData = async () => { // ndc number 
          try {
            const result = await axios(`https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:"${new_search_value}"&limit=20`)
                                    .then((datum) => {
                                      // console.log(datum)
                                      setData(datum);
                                      setLoading(false);
                                    });
          } catch (error) {
            // console.error(error);
            setLoading(true); 
            setData('');
          }
        }
      } else {
        fetchData = async () => { // either brand name or generic name
          try {
            const result = await axios(`https://api.fda.gov/drug/ndc.json?search=brand_name:"${new_search_value}"&limit=20`)
                                    .then((datum) => {
                                      // console.log(datum)
                                      setData(datum);
                                      setLoading(false);
                                    });
          } catch (error) {
            // console.error(error);
            setLoading(true);
            setData('');
          }
        }
      }
      
      fetchData();
    }, 1000),
    []
  );

  React.useEffect(() => {
    throttled(search_value);
  }, [search_value, ])  

  return (
    <>
      <Sidebar selected={'inventory'}/>

      <Toast />

      {
        (search_div_open == true) && 
          <div className="popup_div" onClick={() => set_search_div_open(false)} >  
            <div className="inner_popup" onClick={(e) => e.stopPropagation()} >
              <div className="inner_popup_items">
                <div className="inner_popup_item_row">
                  <div> Item Name: </div>
                  <Popup_input value={popup_item_name} onChange={(e:any) => set_popup_item_name(e.target.value)} /> 
                </div>
                <div className="inner_popup_item_row">
                  <div> NDC:  </div>
                  <Popup_input value={popup_item_ndc} onChange={(e:any) => set_popup_item_ndc(e.target.value)} /> 
                </div>
                <div className="inner_popup_item_row">
                  <div> QOH:  </div>
                  <Popup_input value={popup_item_qoh} onChange={(e:any) => set_popup_item_qoh(e.target.value)} />
                </div>
                <div className="inner_popup_item_row">
                  <div> Threshhold:  </div>
                  <Popup_input value={popup_item_threshhold} onChange={(e:any) => set_popup_item_threshhold(e.target.value)} />
                </div>
                <div className="inner_popup_item_row">
                  <div> Price:  </div>
                  <Popup_input value={popup_item_price} onChange={(e:any) => set_popup_item_price(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Last Updated:  </div>
                  <Popup_input value={popup_item_name} onChange={(e:any) => set_popup_item_name(e.target.value)} />
                </div>
              </div>

              {/* <div className="color_grid"> 
                <div className="grid-item">1</div>
                <div className="grid-item">2</div>
                <div className="grid-item">3</div>  
                <div className="grid-item">4</div>
                <div className="grid-item">5</div>
                <div className="grid-item">6</div>  
                <div className="grid-item">7</div>
                <div className="grid-item">8</div>
                <div className="grid-item">9</div>  

              </div> */}
              
              <div className="button_action_div">
                <button className="cancel_button" onClick={() => set_search_div_open(false)}> Cancel </button> 
                <button className="update_button"> Save </button>
              </div>
            </div>
          </div> 
        
      }
      

      <div className="outerDiv">
        <div className="inventoryRow">

          <div className="search_category">
            <div className="search_category_top">
              <div className="inventory_action_status"> 
                {action_status ? 'Dispense' : 'Receive'}
              </div>
            </div>
            
            <div className="search_category_bottom">
              <div> 
                <input type="text" onChange={(e) => set_search_value(e.target.value)}/>
              </div>

              <div className="custom-select-option">
                <select>
                  <option>Brand Name</option>
                  <option>Generic Name</option>
                </select>
              </div>
              <button onClick={() => set_search_div_open(true)}>
                Test Button  
              </button> 
            </div>
            
          </div>
          

          <div className='table_wrapper_super'>
            <table className="table_wrapper">
              {/* <thead> */}
                <tr>
                  <th>Proprietary Name</th>
                  <th>NDC Package Code</th>
                  <th>Strength</th>
                  <th>Dosage Form</th>
                  {/* <th>Route</th> */}
                  <th>Labeler Name</th>
                  {/* <th>Product NDC</th> */}
                  <th>Nonproprietary Name</th>
                  <th>Substance Name</th>
                  {/* <th>Product Type Name</th> */}
                  {/* <th>Start Marketing Date</th>
                  <th>End Marketing Date</th>
                  <th>Market Category</th>
                  <th>Package Description</th> */}
                  {/* <th>Pharm Class</th> */}
                  <th> QOH </th>
                  <th> Threshold </th>
                  <th> Price </th>
                  <th> Last Updated </th>
                </tr>
              {/* </thead> */}

              {/* <tbody> */}
                {/* <tr> */}
                  {/* <td colSpan={15} height="50px">
                    Not Found.
                  </td> */}
                {/* </tr> */}
                { (loading==false) && data.data.results.map((el:any) => {
                  // let description = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0].description;
                  console.log(el)
                  let package_ndc = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0]?.package_ndc;
                  let strengths = el.active_ingredients.map((inner_el:any) => {  })
                  return (
                    <tr className="body_td">
                      <td> {el.brand_name} </td>
                      <td> {package_ndc ?? 'N/A'} </td>
                      <td>  </td>
                      <td> {el.dosage_form ?? 'N/A'} </td>
                      {/* <td> {el.route ?? 'N/A'} </td> */}
                      {/* <td> {el.application_number ?? 'N/A'} </td> */}
                      <td> {el.labeler_name ?? 'N/A'} </td>
                      {/* <td> {el.product_ndc ?? 'N/A'} </td> */}
                      <td> {el.brand_name_base ?? 'N/A'} </td>
                      <td> {el.active_ingredients?.name ?? 'N/A'} </td>
                      {/* <td> {el.product_type ?? 'N/A'} </td> */}
                      {/* <td> {el.marketing_start_date ?? 'N/A'} </td>
                      <td> {el.marketing_end_date ?? 'N/A'} </td>
                      <td> {el.marketing_category ?? 'N/A'} </td> 
                      <td> {description} </td>    */}
                      {/* <td> {el.pharm_class} </td> */}
                      <td> {'N/A'} </td>
                      <td> {'N/A'} </td>
                      <td> {'N/A'} </td>
                      <td> {'N/A'} </td>
                    </tr>
                  )
                  })
                }

                {/* { <td colSpan={1000} className="long_colspan"> Not Found </td> } */}
              {/* </tbody> */}
            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default Inventory