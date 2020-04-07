import React from 'react'

export default function RadioBoxes({name, value, label, items, handler, errors, discription}){
  return(
    <div className="form-group">
      <legend style={{paddingLeft:0}} className="col-form-label pt-0">{label}</legend>
      {items.map(item => (
        <div className="form-check form-check-inline" key={item}>
          <input className="form-check-input" checked={value === item} onChange={handler} type="radio" name={name} id={`radio${item}`} value={item} />
          <label style={{textTransform: 'capitalize'}} className={`form-check-label ${!value && 'isinvalid'}`} htmlFor={`radio${item}`}>{item}</label>
        </div>
      ))}
      <small className="form-text text-muted">{discription}</small>
      {errors[name] && <small className="form-text text-danger">{errors[name]}</small>}
    </div>
  )
}