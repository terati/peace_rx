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
import { Loader } from './Loader';
import { Inventory_Search } from './Inventory_Search';
import dog_gif from "./../../../assets/generalIcons/doge.gif";
import axios from 'axios';

function Inventory() {

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [action_status, set_action_status] = React.useState<boolean>(true);
  // atorvastatin
  // 7220502390
  // 72205-023-90
  const [search_value, set_search_value] = React.useState<string | number | undefined>(72205);
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

  const ref = React.createRef();

  const [pagination_page_count, set_pagination_page_count] = React.useState(0);
  const [pagination_offset, set_pagination_offset] = React.useState(0);
  const [pagination_limit, set_pagination_limit] = React.useState(50);
  const [pagination_index, set_pagination_index] = React.useState(1);



  const throttled = React.useCallback(
    throttle((new_search_value) => {
      setLoading(true);
      let is_number = /^\d/.test(new_search_value);
      let fetchData;
      if (is_number) {
        fetchData = async () => { // ndc number 
          try {
            //`https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:"${new_search_value}"&limit=20`
            const result = await axios(`http://localhost:3000/api/inventory_db/?search=${new_search_value}&offset=${pagination_offset}&limit=${pagination_limit}`)
                                    .then((datum) => {
                                      console.log(datum)
                                      setData(datum);
                                      set_pagination_page_count( Math.ceil( parseInt(datum.data.count)/pagination_limit ) );
                                      // console.log( Math.ceil(parseInt(datum.data.count)/pagination_limit) );
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
    [pagination_index]
  );

  React.useEffect(() => {
    console.log(data);
    // set_pagination_page_count( Math.ceil( parseInt(data.data.count)/pagination_limit ) );
    console.log(pagination_page_count);
    set_pagination_offset((pagination_index-1)*pagination_limit); 
    throttled(search_value);
  }, [search_value, pagination_limit, pagination_index])  

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



  const [global_click_down, set_global_click_down] = React.useState(false);
  const [test_width, set_test_width] = React.useState(100);
  const [parent_x, set_parent_x] = React.useState(0);
  const parentRef = React.useRef();
  const [click_flag, set_click_flag] = React.useState(false);
  const [coords, set_coords] = React.useState({x: 0, y: 0});
  React.useEffect(() => {
    const handleClickUpEvent = (event:any) => {
      set_global_click_down(false);
      set_click_flag(false);
    };
    window.addEventListener('mouseup', handleClickUpEvent);
    return () => {
      window.removeEventListener('mouseup', handleClickUpEvent);
    };
  }, []);
  React.useEffect(() => {
    const handleWindowMouseMove = (event:any) => {
      set_coords({
        x: event.clientX,
        y: event.clientY,
      });
      set_test_width( Math.abs(event.x-parent_x) );
      console.log( Math.abs(event.x-parent_x), event.x, parent_x );
    }

    if (click_flag) window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [click_flag]);
  const click_handler_test = (event:any) => {
    event.stopPropagation();
    event.preventDefault();
    set_click_flag(true);
    let tmp = parentRef?.current.getBoundingClientRect();
    console.log(tmp);
    set_parent_x(tmp.left);
  }
  const click_handler_release_test = () => {
    set_click_flag(false);
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
                <Inventory_Search type="text" onChange={(e) => set_search_value(e.target.value)} />
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
                <tr className="table_header">
                  <th>
                    <div ref={parentRef} className="table_item_div" style={{width: test_width}} >
                      <div className="table_slider" onMouseDown={click_handler_test} onMouseUp={click_handler_release_test} >
                        <div className="three_dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                      Proprietary Name
                    </div>
                  </th>
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


                {/* { (loading==true) && 
                  <tr className="loading_tr">
                    Hello World

                  </tr>
                } */}

                { (loading==false) && data.data.rows.map((el:any, index:number) => {
                  // let description = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0].description;
                  // let package_ndc = el.packaging.filter((pkg:any) => pkg.package_ndc == search_value)[0]?.package_ndc;
                  // let strengths = el.active_ingredients.map((inner_el:any) => {  })
                  return (
                    <tr key={index} className="body_td" onClick={event => select_row_index_onclick(event, index)}>
                      <td> <div className="table_item_div" style={{width: test_width}} > {el.propietary_name} </div></td>
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
            {(loading==true) && 
              <div className="loading_tr">
                <Loader />
              </div>
            }

            {(!loading && (pagination_page_count==0) ) && 
              <div className="nothing_here">
                <img height={100} width={100} src={dog_gif} draggable="false" alt="Nothing to see"/>
                <p> Nothing here. </p>
              </div>
            }
          </div>

          <div className="pagination_options"> 
                <Pagination ref={ref} max={pagination_page_count} current={3} pagination_index={pagination_index} set_pagination_index={set_pagination_index}/>

                

                <div className="select_show_options">
                  <p style={{padding: "5px"}}>Show: {pagination_index} / {pagination_page_count} page </p> 
                  <select>
                    <option value="0">10 rows</option>
                    <option value="1">50 rows</option>
                    <option value="2">100 rows</option>
                  </select>
                </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Inventory