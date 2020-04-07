import React from 'react';

import TableCols from './TableCols'

export default function Table(props){

  const orderTableRecords = props.body.map(
    item => {
      return (
        <tr key={props.keyForRows(item)}>
          <TableCols data={Object.values(item)}/>
        </tr>
      )
    }
  ) 

  return(
    <div className={`${props.className}`}> 
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <TableCols type='th' data={props.header} />
          </tr>
        </thead>
        <tbody>
          {orderTableRecords}
        </tbody>
      </table>
    </div>
  )
}