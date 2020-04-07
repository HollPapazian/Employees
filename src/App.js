import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import EmployeesNav from './shared/EmployeesNav'
import {employeesConfig} from './config/employees_config'
import Employees from './pages/Employees/Employees'
import TitleStatistics from './pages/TitleStatistics/TitleStatistics'
import EmployeesGeneration from './pages/EmployeesGeneration/EmployeesGeneration'
import EmployeesSearch from './pages/EmployeesSearch/EmployeesSearch'
import SalaryStatistics from './pages/SalaryStatistics/SalaryStatistics'


const {employees, titleStatistic, search, generation, salaryStatistics} = employeesConfig
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      employees: []
    }
  }

  updateEmployees = employees => this.setState({employees})

  render(){
    return (
      <Router>
        <EmployeesNav />
        <Switch>
          <Route path='/' exact><Redirect to={employees}/></Route>
          <Route path={employees}><Employees employees={this.state.employees} updateEmployees={this.updateEmployees}/></Route>
          <Route path={titleStatistic}><TitleStatistics employees={this.state.employees}/></Route>
          <Route path={search}><EmployeesSearch employees={this.state.employees} /></Route>
          <Route path={generation}><EmployeesGeneration updateEmployees={this.updateEmployees} /></Route>
          <Route path={salaryStatistics}><SalaryStatistics employees={this.state.employees} /></Route>
        </Switch>
      </Router>
    )
  }
}

