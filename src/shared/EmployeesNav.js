import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'

import './EmployeesNav.css'

import {employeesConfig} from '../config/employees_config'
const {employees, titleStatistic, search, generation, salaryStatistics} = employeesConfig

export default function EmployeesNav(){
  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link className="navbar-brand" to={employees}>EmployesManager</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={employees}>All employees</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={titleStatistic}>Title statistics</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={search}>Employe search</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={generation}>Employe generator</NavLink>
            </li>          
            <li className="nav-item">
              <NavLink className="nav-link" to={salaryStatistics}>Salary statistics</NavLink>
            </li>
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}