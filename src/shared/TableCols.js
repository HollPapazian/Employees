import React from 'react'


export default function TableCols({data, type}){
  return(
    data.map((elem, index)=>(type==='th' ? <th key={index}>{elem}</th> : <td key={index}>{elem}</td>))
  )

}