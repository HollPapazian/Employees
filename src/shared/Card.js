import React from 'react';

export default function Card(props){
  return (
    <div className={`card ${props.className}`}>
      <div className="card-header">
        <h4>{props.label}</h4>
      </div>
      <div className="card-body">
        {props.children}
      </div>
    </div>
  )
}