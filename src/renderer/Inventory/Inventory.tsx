import * as React from 'react';
import './../App.css';
import './InputStyles.css';
import './Inventory.css';
import './SelectionStyles.css';
import Sidebar from 'renderer/Sidebar/Sidebar';
import throttle from 'lodash/throttle';
import { Popup_input } from './Popup_input';
import { Toast } from './Toast';
import { Pagination } from './Pagination';
import axios from 'axios';

function Inventory() {

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [action_status, set_action_status] = React.useState<boolean>(true);
  const [search_value, set_search_value] = React.useState<string | number | undefined>(0);
  // const [is_number, set_is_number] = React.useState<boolean | undefined>();
  const [search_div_open, set_search_div_open] = React.useState<boolean>(false);

  const [popup_item_name, set_popup_item_name] = React.useState('');
  const [popup_item_ndc, set_popup_item_ndc] = React.useState('');
  const [popup_item_qoh, set_popup_item_qoh] = React.useState('');
  const [popup_item_price, set_popup_item_price] = React.useState('');
  const [popup_item_threshhold, set_popup_item_threshhold] = React.useState('');
  const [popup_item_manufacturer, set_popup_item_manufacturer] = React.useState('');

  const [selected_row_index, set_selected_row_index] = React.useState<number | null>(null);

  const toast_ref = React.useRef('hellotrue');
  const [toast_status, set_toast_status] = React.useState<boolean>(false);

  const throttled = React.useCallback(
    throttle((new_search_value) => {
      let is_number = /^\d/.test(new_search_value);
      let fetchData;
      if (is_number) {
        fetchData = async () => { // ndc number 
          try {
            //`https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:"${new_search_value}"&limit=20`
            const result = await axios(`http://localhost:3000/api/inventory_db/?search=${new_search_value}&offset=0&limit=50`)
                                    .then((datum) => {
                                      console.log(datum)
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
                                      console.log(datum)
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

  const select_row_index_onclick = (event:any, key:number) => {
    set_selected_row_index(key);
    let row_data = data.data.rows[key];

    set_popup_item_name(row_data.propietary_name ?? 'NA');
    set_popup_item_ndc(row_data.ndc_package_code ?? 'NA');
    set_popup_item_qoh(row_data.qoh ?? 'NA');
    set_popup_item_price(row_data.purchase_price ?? 'NA');
    set_popup_item_threshhold(row_data.thresh ?? 'NA');
    set_popup_item_manufacturer(row_data ?? 'labeler_name');

    set_search_div_open(true);
  }

  return (
    <>
      <Sidebar selected={'inventory'}/>

      { toast_status &&
        <Toast ref={toast_ref} onClick={() => set_toast_status(false)} />
      }

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
                <button className="update_button" 
                  onClick={() => {
                    set_toast_status(true);
                    set_search_div_open(false);
                  }} > Save </button>
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
            
            {/* <div> Example: {toast_ref.current} </div> */}

            <div className="search_category_bottom">
              <div> 
                <input type="text" onChange={(e) => set_search_value(e.target.value)}/>
              </div>

              {/* <div className="custom-select-option">
                <select>
                  <option>Brand Name</option>
                  <option>Generic Name</option>
                </select>
              </div> */}
              {/* <button onClick={() => set_search_div_open(true)}>
                Test Button  
              </button>  */}
            </div>
            
          </div>
          

          <div className='table_wrapper_super'>
            <table className="table_wrapper">
              {/* <thead> */}
                <tr>
                  <th>Proprietary Name</th>
                  <th>NDC Package Code</th>
                  <th>QOH</th>
                  <th>Thresh</th>
                  {/* <th>Route</th> */}
                  <th>Purchase Price</th>
                  {/* <th>Product NDC</th> */}
                  <th>Suggested Price</th>
                  <th>Last Transaction</th>
                  {/* <th>Product Type Name</th> */}
                  {/* <th>Start Marketing Date</th>
                  <th>End Marketing Date</th>
                  <th>Market Category</th>
                  <th>Package Description</th> */}
                  {/* <th>Pharm Class</th> */}
                  <th> Description </th>
                </tr>
              {/* </thead> */}

              <tbody></tbody>
              {/* <tbody> */}
                {/* <tr> */}
                  {/* <td colSpan={15} height="50px">
                    Not Found.
                  </td> */}
                {/* </tr> */}
                { (loading==false) && data.data.rows.map((el:any, index:number) => {
                  // let description = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0].description;
                  // let package_ndc = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0]?.package_ndc;
                  // let strengths = el.active_ingredients.map((inner_el:any) => {  })
                  return (
                    <tr key={index} className="body_td" onClick={event => select_row_index_onclick(event, index)}>
                      <td> {el.propietary_name} </td>
                      <td> {el.ndc_package_code ?? 'N/A'} </td>
                      <td> {el.qoh ?? 0} </td>
                      <td> {el.thresh ?? 0} </td>
                      <td> {el.purchase_price ?? 'N/A'} </td>
                      <td> {el.suggested_selling_price ?? 'N/A'} </td>
                      <td> {el.updatedAt ?? 'N/A'} </td>
                      <td> {el.package_description} </td>
                    </tr>
                  )
                  })
                }

                {/* { <td colSpan={1000} className="long_colspan"> Not Found </td> } */}
              {/* </tbody> */}
            </table>
          </div>

          <div className="pagination_options"> 
                <Pagination max={5} current={3}/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Inventory