import React from 'react'

export default function InputSelect({name, label, items, handler, discription}){
  return(
    <div className="form-group">
      <label htmlFor={`${name}-select-id`}>{label}</label>
      <select id={`${name}-select-id`} className="form-control" onChange={handler} name={name}>
        {items.map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <small className="form-text text-muted">{discription}</small>
    </div>
  )
}