import * as React from 'react';
import './../App.scss';
import './InputStyles.css';
import './Inventory.scss';
import './SelectionStyles.css';
import './Header_Input_Styles.css';
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
  const [popup_item_package_description, set_popup_item_package_description] = React.useState('');
  const [popup_item_active_numerator_strength, set_popup_item_active_numerator_strength] = React.useState('');
  const [popup_item_active_ingredient_unit, set_popup_item_active_ingredient_unit] = React.useState('');
  const [popup_item_deaschedule, set_popup_item_deaschedule] = React.useState('');
  const [popup_item_product_type_name, set_popup_item_product_type_name] = React.useState('');
  const [popup_item_nonpropietary_name, set_popup_item_nonpropietary_name] = React.useState('');
  const [popup_item_route_name, set_popup_item_route_name] = React.useState('');
  const [popup_item_dosage_form_name, set_popup_item_dosage_form_name] = React.useState('');
  const [popup_item_substance_name, set_popup_item_substance_name] = React.useState('');
  const [popup_item_start_marketing_date, set_popup_item_start_marketing_date] = React.useState('');
  const [popup_item_pharm_classes, set_popup_item_pharm_classes] = React.useState('');

  const [selected_ndc_package_code, set_selected_ndc_package_code] = React.useState('72205-023-90');
  const [spl_set_id, set_spl_set_id] = React.useState('');
  const [label_data, set_label_data] = React.useState(null);

  const [selected_row_index, set_selected_row_index] = React.useState<number | null>(null);

  const toast_ref = React.useRef('hellotrue');
  const [toast_status, set_toast_status] = React.useState<boolean>(false);

  // search_dropdown
  const [search_dropdown, set_search_dropdown] = React.useState('Auto');

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
            const result = await axios(`http://localhost:3000/api/inventory_db/ndc/?search=${new_search_value}&offset=${pagination_offset}&limit=${pagination_limit}`)
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
            //  https://api.fda.gov/drug/ndc.json?search=brand_name:"${new_search_value}"&limit=20
            const result = await axios(`http://localhost:3000/api/inventory_db/string/?search=${new_search_value}&offset=${pagination_offset}&limit=${pagination_limit}`)
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
    const fetchLabelMedia = async (package_ndc:any) => {
      try {
        console.log(package_ndc);
        const media = await axios(`https://api.fda.gov/drug/label.json?search=openfda.package_ndc.exact:"${package_ndc}"`)
                            .then((datum:any) => {
                              set_label_data(datum);
                              console.log(datum);
                            })
      } catch (error) {
        console.log(error);
      }
    }

    const fetchFromFDA = async () => { // ndc number 
      try {
        //`https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:"${new_search_value}"&limit=20`
        const result = await axios(`https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:"${selected_ndc_package_code}"&limit=20`)
                        .then((datum) => {
                          console.log('From FDA', datum);
                          fetchLabelMedia(selected_ndc_package_code);
                        });
      } catch (error) {
        // console.error(error);
      }
    }
    fetchFromFDA();
  }, [selected_ndc_package_code])

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
    set_popup_item_manufacturer(row_data.labeler_name ?? 'NA');
    set_popup_item_package_description(row_data.package_description ?? 'NA');
    set_popup_item_active_numerator_strength(row_data.active_numerator_strength ?? 'NA');
    set_popup_item_active_ingredient_unit(row_data.active_ingredient_unit ?? 'NA');
    set_popup_item_deaschedule(row_data.deaschedule ?? 'NA');
    set_popup_item_product_type_name(row_data.product_type_name ?? 'NA');
    set_popup_item_nonpropietary_name(row_data.nonpropietary_name ?? 'NA');
    set_popup_item_route_name(row_data.route_name ?? 'NA');
    set_popup_item_dosage_form_name(row_data.dosage_form_name ?? 'NA');
    set_popup_item_substance_name(row_data.substance_name ?? 'NA');
    set_popup_item_start_marketing_date(row_data.start_marketing_date ?? 'NA');
    set_popup_item_pharm_classes(row_data.pharm_classes ?? 'NA');

    set_search_div_open(true);
  }



  const [global_click_down, set_global_click_down] = React.useState(false);
  const [test_width, set_test_width] = React.useState(100);
  const [min_column_width, set_min_column_width] = React.useState(70);
  const [column_widths, set_column_widths] = React.useState({
    0: 150,
    1: 180,
    2: 70,
    3: 70,
    4: 100,
    5: 100,
    6: 100,
    7: 200,
    8: 300
  });
  const [parent_x, set_parent_x] = React.useState(0);
  const [parent_x_dt, set_parent_x_dt] = React.useState({
    0: 200,
    1: 200,
    2: 200,
    3: 200,
    4: 200,
    5: 200,
    6: 200,
    7: 200,
    8: 200
  });
  const parentRef = React.useRef<Array<HTMLDivElement | null>>([]);
  const [click_flag, set_click_flag] = React.useState(false);
  const [coords, set_coords] = React.useState({x: 0, y: 0});
  const [last_clicked_idx, set_last_clicked_idx] = React.useState<number>(0);
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
      // set_test_width( Math.abs(event.x-parent_x) );
      // console.log(event.x, last_clicked_idx, parent_x_dt[last_clicked_idx]);
      // console.log( Math.abs(event.x - parent_x_dt[last_clicked_idx]) );
      let tmp_new_width = Math.abs(event.x - parent_x_dt[last_clicked_idx]);
      if (tmp_new_width <= min_column_width) {
        tmp_new_width = min_column_width;
      } 
      set_column_widths(prevState => ({
        ...prevState,
        [last_clicked_idx]: tmp_new_width
      }));

      // console.log( Math.abs(event.x-parent_x), event.x, parent_x );
    }

    if (click_flag) window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [click_flag]);
  const click_handler_test = (event:any, key:any) => {
    event.stopPropagation();
    event.preventDefault();
    set_last_clicked_idx(key);
    set_click_flag(true);
    let tmp = parentRef?.current[key].getBoundingClientRect();
    set_parent_x_dt(prevState => ({
      ...prevState,
      [key]: tmp.left
    }));
    // set_parent_x(tmp.left);
  }
  const click_handler_release_test = () => {
    set_click_flag(false);
  }

  const table_column_titles = [
    {
      name: "Propietary Name",
      width: 200,
      parse_property: "propietary_name",
      additional_properties: ""
    },
    {
      name: "NDC Package Code",
      width: 200,
      parse_property: "ndc_package_code",
      additional_properties: "table_item_border"
    },
    {
      name: "QOH",
      width: 200,
      parse_property: "qoh",
      additional_properties: ""
    }, 
    {
      name: "Thresh",
      width: 200,
      parse_property: "thresh",
      additional_properties: ""
    },
    {
      name: "Purchase Price",
      width: 200,
      parse_property: "purchase_price",
      additional_properties: ""
    },
    {
      name: "Suggested Price",
      width: 200,
      parse_property: "suggested_selling_price",
      additional_properties: ""
    }, 
    {
      name: "Last Transaction",
      width: 200,
      parse_property: "updatedAt",
      additional_properties: ""
    }, 
    {
      name: "Description",
      width: 200,
      parse_property: "package_description",
      additional_properties: ""
    }
  ]

  const example = "propietary_name"
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
                <div className="inner_popup_item_row"> 
                  <div> Package Description:  </div>
                  <div className="inner_popup_item_content"> {popup_item_package_description} </div>
                </div>

                <div className="inner_popup_item_row"> 
                  <div> Strength </div>
                  <Popup_input value={`${popup_item_active_numerator_strength} ${popup_item_active_ingredient_unit}`}  />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Deaschedule </div>
                  <Popup_input value={popup_item_deaschedule} onChange={(e:any) => set_popup_item_deaschedule(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Product Type Name </div>
                  <Popup_input value={popup_item_product_type_name} onChange={(e:any) => set_popup_item_product_type_name(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Nonpropietary Name </div>
                  <Popup_input value={popup_item_nonpropietary_name} onChange={(e:any) => set_popup_item_nonpropietary_name(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Route Name </div>
                  <Popup_input value={popup_item_route_name} onChange={(e:any) => set_popup_item_route_name(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Dosage Form Name </div>
                  <Popup_input value={popup_item_dosage_form_name} onChange={(e:any) => set_popup_item_dosage_form_name(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Substance Name </div>
                  <Popup_input value={popup_item_substance_name} onChange={(e:any) => set_popup_item_substance_name(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Start Marketing Date </div>
                  <Popup_input value={popup_item_start_marketing_date} onChange={(e:any) => set_popup_item_start_marketing_date(e.target.value)} />
                </div>
                <div className="inner_popup_item_row"> 
                  <div> Pharm Classes </div>
                  <Popup_input value={popup_item_pharm_classes} onChange={(e:any) => set_popup_item_pharm_classes(e.target.value)} />
                </div>
                {/* popup_item_pharm_classes */}
              </div>
 
              {/*
              set_popup_item_active_numerator_strength(row_data.active_numerator_strength ?? 'NA');
              set_popup_item_active_ingredient_unit(row_data.active_ingredient_unit ?? 'NA');
              set_popup_item_deaschedule(row_data.deaschedule ?? 'NA');
              set_popup_item_product_type_name(row_data.product_type_name ?? 'NA');
              set_popup_item_nonpropietary_name(row_data.nonpropietary_name ?? 'NA');
              set_popup_item_route_name(row_data.route_name ?? 'NA');
              set_popup_item_dosage_form_name(row_data.dosage_form_name ?? 'NA');
              
              set_popup_item_substance_name(row_data.substance_name ?? 'NA');
              set_popup_item_start_marketing_date(row_data.start_marketing_date ?? 'NA'); */}


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
                  }} > Save 
                </button>
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
              <div className="search_dropdown">
                <button className="search_dropbtn" tabIndex={-1}> {search_dropdown} </button>
                  <div className="search_dropdown_content">
                    <a href="#" onClick={() => set_search_dropdown('Auto')} >Auto</a>
                    <a href="#" onClick={() => set_search_dropdown('NDC')}>NDC</a>
                    <a href="#" onClick={() => set_search_dropdown('GS1')}>GS1</a>
                    <a href="#" onClick={() => set_search_dropdown('TXT')}>TXT</a>
                  </div>
              </div>

              {/* </div> */}

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
                  { table_column_titles.map((item, idx:number) => {
                    return (
                      <th>
                        <div ref={el => parentRef.current[idx] = el} className="table_item_div_head" style={{width: column_widths[idx]}}>
                          <div className="table_slider" onMouseDown={(e) => click_handler_test(e, idx)} onMouseUp={click_handler_release_test} >
                            <div className="three_dots">
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          </div>
                          {item.name}
                        </div>
                      </th>
                    )
                    })
                  }
                  {/* <th>
                    <div ref={parentRef} className="table_item_div" style={{width: column_widths[0]}}>
                      <div className="table_slider" onMouseDown={(e) => click_handler_test(e, 0)} onMouseUp={click_handler_release_test} >
                        <div className="three_dots">
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                      Proprietary Name
                    </div>
                  </th>

                  <th>
                    <div ref={parentRef} className="table_item_div" style={{width: column_widths[1]}}>
                        <div className="table_slider" onMouseDown={(e) => click_handler_test(e, 1)} onMouseUp={click_handler_release_test} >
                          <div className="three_dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                          </div>
                        </div>
                        NDC Package Code
                    </div>
                  </th>

                  <th>QOH</th>
                  <th>Thresh</th>
                  <th>Purchase Price</th>
                  <th>Suggested Price</th>
                  <th>Last Transaction</th>
                  <th> Description </th> */}
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
                      { table_column_titles.map((item, idx:number) => {
                          return (
                            <td> <div className={`table_item_div ${item.additional_properties}`} style={{width: column_widths[idx]}}> <p>{el[item.parse_property] ?? 'N/A'}</p> </div></td>
                          )
                        }) 
                      }

                      {/* <td> <div className="table_item_div" style={{width: column_widths[0]}}> {el[example]} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[1]}}> {el.ndc_package_code ?? 'N/A'} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[2]}}> {el.qoh ?? 0} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[3]}}> {el.thresh ?? 0} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[4]}}> {el.purchase_price ?? 'N/A'} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[5]}}> {el.suggested_selling_price ?? 'N/A'} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[6]}}> {el.updatedAt ?? 'N/A'} </div></td>
                      <td> <div className="table_item_div" style={{width: column_widths[7]}}> {el.package_description} </div></td> */}
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