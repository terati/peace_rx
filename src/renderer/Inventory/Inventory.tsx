import * as React from 'react';
import './../App.css';
import "./InputStyles.css";
import Sidebar from 'renderer/Sidebar/Sidebar';

function Inventory() {

  const [data, setData] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true)


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await axios("https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:%220904-5853-40%22&limit=10")
        //                         .then((datum) => {
        //                           console.log(datum)
        //                           setData(datum);
        //                           setLoading(false);
        //                         });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Sidebar selected={'home'}/>

      <div className="inventoryRow">
        <div> 
          <input type="text"/>
        </div>

        <div className="table_wrapper">
          <table>
            <tr>
              <th>Proprietary Name</th>
              <th>NDC Package Code</th>
              <th>Strength</th>
              <th>Dosage Form</th>
              <th>Route</th>
              <th>Labeler Name</th>
              <th>Product NDC</th>
              <th>Nonproprietary Name</th>
              <th>Substance Name</th>
              <th>Product Type Name</th>
              <th>Start Marketing Date</th>
              <th>End Marketing Date</th>
              <th>Market Category</th>
              <th>Package Description</th>
              <th>Pharm Class</th>
            </tr>

            <tr>
              {/* <td colSpan={15} height="50px">
                Not Found.
              </td> */}
            </tr>

            { (loading==false) && data.data.results.map((el:any) => {
              let description = el.packaging.filter((pkg:any) => pkg.package_ndc == "0904-5853-40")[0].description;
              return <tr>
                <td> {el.brand_name} </td>
                <td> </td>
                <td> {el.active_ingredients.strength ?? 'N/A'} </td>
                <td> {el.dosage_form ?? 'N/A'} </td>
                <td> {el.route ?? 'N/A'} </td>
                {/* <td> {el.application_number ?? 'N/A'} </td> */}
                <td> {el.labeler_name ?? 'N/A'} </td>
                <td> {el.product_ndc ?? 'N/A'} </td>
                <td> {el.brand_name_base ?? 'N/A'} </td>
                <td> {el.active_ingredients.name ?? 'N/A'} </td>
                <td> {el.product_type ?? 'N/A'} </td>
                <td> {el.marketing_start_date ?? 'N/A'} </td>
                <td> {el.marketing_end_date ?? 'N/A'} </td>
                <td> {el.marketing_category ?? 'N/A'} </td>
                <td> {description} </td>
                <td> {el.pharm_class} </td>
              </tr>
            })

            }

          </table>
        </div>

      </div>
      
    </>
  )
}

export default Inventory