import React from 'react'

export default function EmailWithFixPart({name, label, fixPart, value, handler, errors, discription}){
  return(
    <div className="form-group">
      <label htmlFor={`${name}-email-id`}>{label}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="validationTooltipUsernamePrepend">{fixPart}</span>
        </div>
        <input 
          type="text" 
          value={value} 
          onChange={handler} 
          className={`form-control ${(!value || errors[name])&& 'isinvalid'}`} 
          id={`${name}-email-id`} 
          name={name}
          autoComplete="off"
        />
      </div>
      <small className="form-text text-muted">{discription}</small>
      {errors[name] && <small className="form-text text-danger">{errors[name]}</small>}
    </div>
  )
}