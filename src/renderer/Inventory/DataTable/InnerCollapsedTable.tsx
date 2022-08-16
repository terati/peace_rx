import * as React from 'react';
import ict_style from './InnerCollapsedTable.module.scss';

function InnerCollapsedTable(props:any) {
  const ccolumns = [
    {
      field: 'GTIN',
      headerName: 'GTIN',
      width: 100 
    },
    {
      field: 'Batch_Lot',
      headerName: 'Batch/Lot',
      width: 200
    },
    {
      field: 'Expiration_date',
      headerName: 'Expiration Date',
      width: 100
    },
    {
      field: 'Serial',
      headerName: 'Serial',
      width: 100
    },
  ]
  const {
    rows, 
    columns=ccolumns
  } = props;
  return (
    <>
      <table className={ict_style.DataTable}>
        <tr >
            {/* <th></th> */}
            { columns.map((column:any, idx: number) => {
                return (
                  <th>
                    { column.headerName }
                  </th>
                )
              })
            }
        </tr>

        { rows.map((row:any, idx: number) => { 
            return (
              <tr>
                { columns.map((column:any, idx: number) => {
                    return (
                      <>
                        <th>
                          { row[column.field] }
                        </th>
                      </>
                    )
                  })
                }
              </tr>
            )
          })
        }


      </table>
    </>
  )
}

export default InnerCollapsedTable