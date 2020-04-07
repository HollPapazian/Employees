import React from 'react'

export default function InputRange({name, min, max, label, value, handler, discription}){
  return(
    <div className="form-group">
      <label htmlFor={`${name}-range-id`}>{label}: <strong>{value}</strong></label>
      <input 
        type="range" 
        className="custom-range" 
        min={min} 
        max={max} 
        id={`${name}-range-id`} 
        onChange={handler} 
        value={value} 
        name={name}
      />
      <small className="form-text text-muted">{discription}</small>
    </div>
  )
}