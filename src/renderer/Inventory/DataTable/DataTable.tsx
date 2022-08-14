import * as React from 'react';
import DataTable_style from './DataTable.module.scss';

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
    ...other
  } = props;

  return (
    <>
      <div className={DataTable_style.DataTable}>
      <table>
        <tr className={DataTable_style.header}>
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
            return (
              <tr>
                { columns.map((column: Column, idx: number) => {
                    return (
                      <th>
                        { row[column.field] }
                      </th>
                    )
                  })
                }
              </tr>
            )
          })

        }


      </table>
      </div>
    </>
  )
}

export default DataTable