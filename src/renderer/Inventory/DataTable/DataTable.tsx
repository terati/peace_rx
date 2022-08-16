import * as React from 'react';
import Angle_Down from 'renderer/Icons_Color_Control/Angle_Down';
import DataTable_style from './DataTable.module.scss';
import InnerCollapsedTable from './InnerCollapsedTable';

interface Column {
  field: string | number,
  headerName: string | number,
  width?: string | number 
}

const DataTable = (props:any) => {
  const ccolumns: Column[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100 
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 100
    },
    
  ]
  
  const rrows = [
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
    { id: 1,  firstName: 'Bobby', lastName: 'Low'},
    { id: 2, firstName: 'Amy', lastName: 'Ann' },
    { id: 3, firstName: 'James', lastName: 'Smith' },
  ]
  

  const {
    rows = rrows,
    columns = ccolumns,
    innerTable = false,
    inner_rows,
    inner_columns, 
    ...other
  } = props;

  return (
    <>
      <div className={DataTable_style.DataTable}>
      <table>
        <tr className={DataTable_style.header}>
          <th></th>
          { columns.map((column: Column, idx: number) => {
              return (
                <th>
                  { column.headerName }
                </th>
              )
            })
          }
        </tr>

        { rows.map((row, idx: number) => {
            const [ex, set_ex] = React.useState(false);

            return (
              <>
                <tr>
                  <th onClick={() => set_ex(!ex)}>
                    <Angle_Down fill={'white'} height={12} width={12} />
                  </th>
                  { columns.map((column: Column, idx: number) => {
                      return (
                        <th>
                          { row[column.field] }
                        </th>
                      )
                    })
                  }
                </tr>
                { ex &&
                  <tr>
                    <td colSpan={100} className={DataTable_style.collapsed_td}>
                      <InnerCollapsedTable rows={row.entries} />
                    </td>
                  </tr>
                }
              </>
            )
          })

        }


      </table>
      </div>
    </>
  )
}

export default DataTable