import * as React from 'react';
import './../App.scss';
import './InputStyles.css';
import inventory_style from './Inventory.module.scss';
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
import { Question_Tooltip } from 'renderer/Components/Question_Tooltip';
import { Inventory_Action_Status } from './Inventory_Action_Status';
import { parseGS1 } from './inventory_gtin_calc';
import { Items_Per_Page } from './Items_Per_Page';

function Inventory() {

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const [action_status, set_action_status] = React.useState<boolean>(true);
  // atorvastatin
  // 7220502390
  // 72205-023-90
  const [search_value, set_search_value] = React.useState<string | undefined>('');
  const [parsed_search_value, set_parsed_search_value] = React.useState<string>('');
  React.useEffect(() => {
    console.log(String(search_value), 
    String(search_value).length,
    /^\s*$/.test(String(search_value))
    )
    if ( String(search_value).length > 13 
          && (String(search_value).trim().split(' ').length > 1)
        ) {
          let tmp = parseGS1(search_value);
          console.log(tmp)
          set_parsed_search_value(tmp["GTIN"]);
    } else {
      set_parsed_search_value(search_value);
    }

  }, [search_value])
  const inventory_search_on_key_down_handler = (event:KeyboardEvent) => {
    if (event.key === 'Escape') {
      set_search_value('');
    }
  }
  // const [is_number, set_is_number] = React.useState<boolean | undefined>();
  const [search_div_open, set_search_div_open] = React.useState<boolean>(false);

  const [popup_item_product_ndc, set_popup_item_product_ndc] = React.useState('');
  const [popup_item_package_ndc_without_hyphens, set_popup_item_package_ndc_without_hyphens] = React.useState('');
  const [popup_item_generic_name, set_popup_item_generic_name] = React.useState('');
  const [popup_item_labeler_name, set_popup_item_labeler_name] = React.useState('');
  const [popup_item_dea_schedule, set_popup_item_dea_schedule] = React.useState('');
  const [popup_item_brand_name, set_popup_item_brand_name] = React.useState('');
  const [popup_item_active_ingredients, set_popup_item_active_ingredients] = React.useState('');
  const [popup_item_finished, set_popup_item_finished] = React.useState('');
  const [popup_item_package_ndc, set_popup_item_package_ndc] = React.useState('');
  const [popup_item_description, set_popup_item_description] = React.useState('');
  const [popup_item_sample, set_popup_item_sample] = React.useState('');
  const [popup_item_listing_expiration_date, set_popup_item_listing_expiration_date] = React.useState('');
  const [popup_item_manufacturer_name, set_popup_item_manufacturer_name] = React.useState('');
  const [popup_item_rxcui, set_popup_item_rxcui] = React.useState('');
  const [popup_item_spl_set_id, set_popup_item_spl_set_id] = React.useState('');
  const [popup_item_is_original_packager, set_popup_item_is_original_packager] = React.useState('');
  const [popup_item_upc, set_popup_item_upc] = React.useState('');
  const [popup_item_pharm_class_epc, set_popup_item_pharm_class_epc] = React.useState('');
  const [popup_item_pharm_class_pe, set_popup_item_pharm_class_pe] = React.useState('');
  const [popup_item_pharm_class_cs, set_popup_item_pharm_class_cs] = React.useState('');
  const [popup_item_unii, set_popup_item_unii] = React.useState('');
  const [popup_item_marketing_category, set_popup_item_marketing_category] = React.useState('');
  const [popup_item_dosage_form, set_popup_item_dosage_form] = React.useState('');
  const [popup_item_spl_id, set_popup_item_spl_id] = React.useState('');
  const [popup_item_product_type, set_popup_item_product_type] = React.useState('');
  const [popup_item_route, set_popup_item_route] = React.useState('');
  const [popup_item_marketing_start_date, set_popup_item_marketing_start_date] = React.useState('');
  const [popup_item_product_id, set_popup_item_product_id] = React.useState('');
  const [popup_item_application_number, set_popup_item_application_number] = React.useState('');
  const [popup_item_brand_name_base, set_popup_item_brand_name_base] = React.useState('');
  const [popup_item_pharm_class, set_popup_item_pharm_class] = React.useState('');

  const [selected_ndc_package_code, set_selected_ndc_package_code] = React.useState('72205-023-90');
  const [spl_set_id, set_spl_set_id] = React.useState('');
  const [label_data, set_label_data] = React.useState(null);

  const [selected_row_index, set_selected_row_index] = React.useState<number | null>(null);

  const toast_ref = React.useRef('hellotrue');
  const [toast_status, set_toast_status] = React.useState<boolean>(false);

  // search_dropdown
  // const [search_dropdown, set_search_dropdown] = React.useState('Auto');

  const ref = React.createRef();

  const [pagination_page_count, set_pagination_page_count] = React.useState(0);
  const [pagination_offset, set_pagination_offset] = React.useState(0);
  const [pagination_limit, set_pagination_limit] = React.useState(50);
  const [pagination_index, set_pagination_index] = React.useState(1);
  const [number_of_items, set_number_of_items] = React.useState(50);


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
                                      set_pagination_page_count( Math.ceil( parseInt(datum.data.count)/pagination_limit ) );
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
                          // console.log('From FDA', datum);
                          fetchLabelMedia(selected_ndc_package_code);
                        });
      } catch (error) {
        // console.error(error);
      }
    }
    fetchFromFDA();
  }, [selected_ndc_package_code])

  React.useEffect(() => {
    set_pagination_index(1);
    set_pagination_offset(0);
    throttled(search_value);
    set_selected_row_index(1);
    console.log('fire') 
  }, [search_value])

  React.useEffect(() => {
    // console.log(data);
    // set_pagination_page_count( Math.ceil( parseInt(data.data.count)/pagination_limit ) );
    // console.log(pagination_page_count);
    throttled(search_value);
    // set_pagination_offset((pagination_index-1)*pagination_limit); 
  }, [pagination_limit, pagination_index])  

  const select_row_index_onclick = (event:any, key:number) => {
    set_selected_row_index(key);
    let row_data = data.data.rows[key];

    set_popup_item_product_ndc(row_data.product_ndc ?? '')
    set_popup_item_package_ndc_without_hyphens(row_data.package_ndc_without_hyphens ?? '')
    set_popup_item_generic_name(row_data.generic_name ?? '')
    set_popup_item_labeler_name(row_data.labeler_name ?? '')
    set_popup_item_dea_schedule(row_data.dea_schedule ?? '')
    set_popup_item_brand_name(row_data.brand_name ?? '')
    set_popup_item_active_ingredients(row_data.active_ingredients ?? '')
    set_popup_item_finished(row_data.finished ?? '')
    set_popup_item_package_ndc(row_data.package_ndc ?? '')
    set_popup_item_description(row_data.description ?? '')
    set_popup_item_sample(row_data.sample ?? '')
    set_popup_item_listing_expiration_date(row_data.listing_expiration_date ?? '')
    set_popup_item_manufacturer_name(row_data.manufacturer_name ?? '')
    set_popup_item_rxcui(row_data.rxcui ?? '')
    set_popup_item_spl_set_id(row_data.spl_set_id ?? '')
    set_popup_item_is_original_packager(row_data.is_original_packager ?? '')
    set_popup_item_upc(row_data.upc ?? '')
    set_popup_item_pharm_class_epc(row_data.pharm_class_epc ?? '')
    set_popup_item_pharm_class_pe(row_data.pharm_class_pe ?? '')
    set_popup_item_pharm_class_cs(row_data.pharm_class_cs ?? '')
    set_popup_item_unii(row_data.unii ?? '')
    set_popup_item_marketing_category(row_data.marketing_category ?? '')
    set_popup_item_dosage_form(row_data.dosage_form ?? '')
    set_popup_item_spl_id(row_data.spl_id ?? '')
    set_popup_item_product_type(row_data.product_type ?? '')
    set_popup_item_route(row_data.route ?? '')
    set_popup_item_marketing_start_date(row_data.marketing_start_date ?? '')
    set_popup_item_product_id(row_data.product_id ?? '')
    set_popup_item_application_number(row_data.application_number ?? '')
    set_popup_item_brand_name_base(row_data.brand_name_base ?? '')
    set_popup_item_pharm_class(row_data.pharm_class ?? '')

    set_search_div_open(true);
  }



  const [global_click_down, set_global_click_down] = React.useState(false);
  const [test_width, set_test_width] = React.useState(100);
  const [min_column_width, set_min_column_width] = React.useState(70);
  
  const [parent_x, set_parent_x] = React.useState(0);

  const parentRef = React.useRef<Array<HTMLDivElement | null>>([]);
  const div_table_ref = React.useRef<Array<HTMLDivElement | null>>([]);
  // console.log(div_table_ref);
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

  // console.log(div_table_ref.current?.clientWidth/8)

  const [column_widths, set_column_widths] = React.useState({
    0: '150px',
    1: '100px',
    2: '150px',
    3: '80px',
    4: '80px',
    5: '80px',
    6: '80px',
    7: '500px'
  });
  const [parent_x_dt, set_parent_x_dt] = React.useState({
    0: '150px',
    1: '100px',
    2: '150px',
    3: '80px',
    4: '80px',
    5: '80px',
    6: '80px',
    7: '500px'

  });


  const table_column_titles = [
    {
      name: "Generic Name",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "generic_name",
      additional_properties: ""
    },
    {
      name: "Brand Name",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "brand_name",
      additional_properties: ""
    },
    {
      name: "NDC Package Code",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "package_ndc",
      additional_properties: "table_item_border"
    },
    {
      name: "QOH",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "qoh",
      additional_properties: ""
    }, 
    {
      name: "Thresh",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "thresh",
      additional_properties: ""
    },
    {
      name: "Purchase Price",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "purchase_price",
      additional_properties: ""
    },
     
    {
      name: "Last Transaction",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "updatedAt",
      additional_properties: ""
    }, 
    {
      name: "Description",
      width: div_table_ref.current?.clientWidth/(8),
      parse_property: "description",
      additional_properties: ""
    }
  ]

  const example = "propietary_name"

  let popup_item_pharm_classes_list = popup_item_pharm_class.split(',');

  return (
    <>
      <Sidebar selected={'inventory'}/>

      { toast_status &&
        <Toast ref={toast_ref} onClick={() => set_toast_status(false)} />
      }

      {
        (search_div_open == true) && 
          <div className={inventory_style.popup_div} onClick={() => set_search_div_open(false)} >  
            <div className={inventory_style.inner_popup} onClick={(e) => e.stopPropagation()} >
              <div className={inventory_style.inner_popup_items}>
                <div className={inventory_style.inner_popup_item_row_title}>
                  <h1> {popup_item_brand_name} </h1>
                  {/* <div> Item Name: </div>
                  <Popup_input value={popup_item_name} onChange={(e:any) => set_popup_item_name(e.target.value)} />  */}
                </div>
                
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.inner_popup_item_row_nonprietary_name}> {popup_item_generic_name} </div>
                  <Question_Tooltip text="Nonpropietary Name"/>
                  {/* <Popup_input value={popup_item_nonpropietary_name} onChange={(e:any) => set_popup_item_nonpropietary_name(e.target.value)} /> */}
                </div>
                <div className={inventory_style.inner_popup_item_row_ndc}>
                  <div className={inventory_style.popup_ndc}> 
                    <div> {popup_item_package_ndc} </div>
                    <Question_Tooltip text="NDC"/>
                  </div>
                  {/* <Popup_input value={popup_item_ndc} onChange={(e:any) => set_popup_item_ndc(e.target.value)} />  */}
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div> {popup_item_description} </div>
                </div>

                
                <div className={inventory_style.inner_popup_item_row}> 
                    <div className={inventory_style.div_popup_highlighted}> Active Ingredients </div>
                    <div className={inventory_style.pharm_classes}>
                    { JSON.parse(popup_item_active_ingredients.replace(/'/g,'"')).map((el) => {
                        return(
                          <div className={inventory_style.inner_popup_item_ingredient_card}>
                            <div className={inventory_style.ingredient}>
                              { el.name }
                            </div>
                            <div className={inventory_style.strength}>
                              { el.strength }
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>                 
                </div>




                <div className={inventory_style.inner_popup_item_row}>
                  <div className={inventory_style.div_popup_highlighted}> 
                    <div> QOH </div>
                    <Question_Tooltip text='Quantity On Hand' />
                  </div>
                  {/* <Popup_input value={popup_item_qoh} onChange={(e:any) => set_popup_item_qoh(e.target.value)} /> */}
                </div>
                {/* <div className="inner_popup_item_row">
                  <div className="div_popup_highlighted"> Threshhold  </div>
                  <Popup_input value={popup_item_threshhold} onChange={(e:any) => set_popup_item_threshhold(e.target.value)} />
                </div> */}
                <div className={inventory_style.inner_popup_item_row}>
                  <div className={inventory_style.div_popup_highlighted}> Price  </div>
                  {/* <Popup_input value={popup_item_price} onChange={(e:any) => set_popup_item_price(e.target.value)} /> */}
                </div>
                {/* <div className="inner_popup_item_row"> 
                  <div className="div_popup_highlighted"> Last Updated  </div>
                  <Popup_input value={popup_item_name} onChange={(e:any) => set_popup_item_name(e.target.value)} />
                </div> */}
                {/* <div className="inner_popup_item_row"> 
                  <div className="div_popup_highlighted"> Package Description  </div>
                  <div className="inner_popup_item_content"> {popup_item_package_description} </div>
                </div> */}

                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> Strength </div>
                  {/* <Popup_input value={`${popup_item_active_numerator_strength} ${popup_item_active_ingredient_unit}`}  /> */}
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> Deaschedule </div>
                  <Popup_input value={popup_item_dea_schedule} onChange={(e:any) => set_popup_item_dea_schedule(e.target.value)} />
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> Product Type Name </div>
                  <Popup_input value={popup_item_product_type} onChange={(e:any) => set_popup_item_product_type(e.target.value)} />
                </div>
                
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}>  
                    <div> Route </div>
                    <Question_Tooltip text='Route of Administration' />
                  </div>
                  <Popup_input value={popup_item_route} onChange={(e:any) => set_popup_item_route(e.target.value)} />
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> Dosage Form Name </div>
                  <Popup_input value={popup_item_dosage_form} onChange={(e:any) => set_popup_item_dosage_form(e.target.value)} />
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> Substance Name </div>
                  <Popup_input value={popup_item_active_ingredients} onChange={(e:any) => set_popup_item_active_ingredients(e.target.value)} />
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> 
                    <div> Marketing Start </div>
                    <Question_Tooltip text='Date of Market Arrival {year, month, day}' />
                  </div>
                  <Popup_input value={popup_item_marketing_start_date} onChange={(e:any) => set_popup_item_marketing_start_date(e.target.value)} disable={}/>
                </div>
                <div className={inventory_style.inner_popup_item_row}> 
                  <div className={inventory_style.div_popup_highlighted}> 
                    <div> Labeler Name </div>
                    <Question_Tooltip text='Not necessarily the manufacturer' />
                  </div>
                  <Popup_input value={popup_item_labeler_name} onChange={(e:any) => set_popup_item_labeler_name(e.target.value)} disable={}/>
                </div>

                { (popup_item_pharm_class_epc.replace(/[\[\]']+/g,'').length > 0) &&
                  <div className={inventory_style.inner_popup_item_row}> 
                    <div className={inventory_style.div_popup_highlighted}> Pharm Classes EPC</div>
                    <div className={inventory_style.pharm_classes}>
                      { popup_item_pharm_class_epc.replace(/[\[\]']+/g,'').split(',').map((el) => {
                          if (el)
                          return (
                            <div className={inventory_style.pharm_class_epc}>
                              {el}
                            </div>
                          )
                      }) }
                    </div>                 
                  </div>
                }

                { (popup_item_pharm_class_pe.replace(/[\[\]']+/g,'').length > 0) &&
                  <div className={inventory_style.inner_popup_item_row}> 
                    <div className={inventory_style.div_popup_highlighted}> Pharm Classes PE</div>
                    <div className={inventory_style.pharm_classes}>
                      { popup_item_pharm_class_pe.replace(/[\[\]']+/g,'').split(',').map((el) => {
                          if (el)
                          return (
                            <div className={inventory_style.pharm_class_pe}>
                              {el}
                            </div>
                          )
                      }) }
                    </div>                 
                  </div>
                }
                
                { (popup_item_pharm_class_cs.replace(/[\[\]']+/g,'').length > 0) &&
                  <div className={inventory_style.inner_popup_item_row}> 
                    <div className={inventory_style.div_popup_highlighted}> Pharm Classes CS</div>
                    <div className={inventory_style.pharm_classes}>
                      { popup_item_pharm_class_cs.replace(/[\[\]']+/g,'').split(',').map((el) => {
                          if (el)
                          return (
                            <div className={inventory_style.pharm_class_cs}>
                              {el}
                            </div>
                          )
                      }) }
                    </div>                 
                  </div>
                }

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
              
              <div className={inventory_style.button_action_div}>
                <button className={inventory_style.cancel_button} onClick={() => set_search_div_open(false)}> Cancel </button> 
                <button className={inventory_style.update_button} 
                  onClick={() => {
                    set_toast_status(true);
                    set_search_div_open(false);
                  }} > Save 
                </button>
              </div>
            </div>
          </div> 
        
      }
      

      <div className={inventory_style.outerDiv}>
        <div className={inventory_style.inventoryRow}>

          <div className={inventory_style.search_category}>
            
            <div className={inventory_style.search_category_top}>
              <Inventory_Action_Status
                options={['Dispense', 'Input', 'Section1', 'Section2']}
                color_options={['red', 'green', 'orange', 'blue']}
              />
              {/* <div className={inventory_style.inventory_action_status}> 
                {action_status ? 'Dispense' : 'Receive'}
              </div> */}
            </div>
            
            {/* <div> Example: {toast_ref.current} </div> */}

            <div className={inventory_style.search_category_bottom}>
              <div> 
                <Inventory_Search 
                  type={"text"} 
                  onChange={(e) => set_search_value(e.target.value)} 
                  value={search_value}
                  placeholder={'NDC / GS1-128 / Name'}  
                  onKeyDown={inventory_search_on_key_down_handler}
                />
              </div>
              {/* <div className={inventory_style.search_dropdown}>
                <button className={inventory_style.search_dropbtn} tabIndex={-1}> {search_dropdown} </button>
                  <div className={inventory_style.search_dropdown_content}>
                    <a href="#" onClick={() => set_search_dropdown('Auto')} >Auto</a>
                    <a href="#" onClick={() => set_search_dropdown('NDC')}>NDC</a>
                    <a href="#" onClick={() => set_search_dropdown('GS1')}>GS1</a>
                    <a href="#" onClick={() => set_search_dropdown('TXT')}>TXT</a>
                  </div>
              </div> */}

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
          

          <div ref={div_table_ref} className={inventory_style.table_wrapper_super}>
            <table className={inventory_style.table_wrapper}>
              {/* <thead> */}
                <tr className={inventory_style.table_header}>
                  { table_column_titles.map((item, idx:number) => {
                    return (
                      <th>
                        <div ref={el => parentRef.current[idx] = el} className={inventory_style.table_item_div_head} style={{width: column_widths[idx]}}>
                          <div className={inventory_style.table_slider} onMouseDown={(e) => click_handler_test(e, idx)} onMouseUp={click_handler_release_test} >
                            <div className={inventory_style.three_dots}>
                              <div className={inventory_style.dot}></div>
                              <div className={inventory_style.dot}></div>
                              <div className={inventory_style.dot}></div>
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
                    <tr key={index} className={inventory_style.body_td} onClick={event => select_row_index_onclick(event, index)}>
                      { table_column_titles.map((item, idx:number) => {
                          return (
                            // minWidth: div_table_ref.current?.clientWidth ,
                            <td> <div className={`${inventory_style.table_item_div} ${item.additional_properties}`} style={{ width: column_widths[idx]}}> <p>{el[item.parse_property] ?? 'N/A'}</p> </div></td>
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
              <div className={inventory_style.loading_tr}>
                <Loader />
              </div>
            }

            {(!loading && (pagination_page_count==0) ) && 
              <div className={inventory_style.nothing_here}>
                <img height={100} width={100} src={dog_gif} draggable="false" alt="Nothing to see"/>
                <p> Nothing here. </p>
              </div>
            }
          </div>

          <div className={inventory_style.pagination_options}> 
            <div className={inventory_style.select_show_options}>
              <p style={{padding: "5px"}}>Showing: {pagination_index} / {pagination_page_count} page </p> 
            </div>
      
            <Pagination ref={ref} max={pagination_page_count} current={3} pagination_index={pagination_index} set_pagination_index={set_pagination_index}/>

            <Items_Per_Page 
              number_of_items={number_of_items} 
              set_number_of_items={set_number_of_items}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default Inventory