import React from 'react'

export default function InputElement({name, type, min, max, value, label, handler, errors={}, maxLength, discription}){
  return(
    <div className="form-group">
      <label htmlFor={`${name}-input-id`}>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={handler} 
        maxLength={maxLength}
        min={min} 
        max={max} 
        className={`form-control ${(!value || errors[name]) && 'isinvalid'}`} 
        id={`${name}-input-id`}
        name={name} 
        autoComplete="off"
      />
      <small className="form-text text-muted">{discription}</small>
      {errors[name] && <small className="form-text text-danger">{errors[name]}</small>}
    </div>
  )
}