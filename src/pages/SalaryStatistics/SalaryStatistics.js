import React from 'react'; 
import _ from 'lodash'

import {salary} from '../../config/employees_config'
import Card from '../../shared/Card'
import SalaryStatisticForm from './component/SalaryStatisticForm'

import './SalaryStatistics.css'

const [minSalary, maxSalary] = salary;

export default class SalaryStatistics extends React.Component {
  constructor(props){
    super(props)
    this.maxActualSalaryObj = _.maxBy(this.props.employees, item=>item.salary)
    this.minActualSalaryObj = _.minBy(this.props.employees, item=>item.salary)
    this.totalBudget = this.props.employees.reduce((accum, current) => accum + current.salary, 0)
    this.interval = null; // i think its not best way, but i cant use state without rerender list
    this.state={
      rangesCounts:[],
      showStatistic: false
    }
  }

  submit = interval => {
    if (this.props.employees.length > 0) {
      this.setState({rangesCounts:_.countBy(this.props.employees, item => Math.trunc((item.salary - minSalary)/interval))});
      this.interval = interval;
    }
    this.setState({showStatistic: true});
  }

  rangeList = () => {
    // here i need check all ranges if we want display ranges with 0 employes
    const rangeListItems = [];
    for (let i=0;i<Math.trunc((maxSalary-minSalary)/this.interval)+1; i++){
      rangeListItems.push(
        <li className="list-group-item" key={i}>
          {minSalary + this.interval * i} - {minSalary + this.interval * (i + 1)}: {this.state.rangesCounts[i]?this.state.rangesCounts[i]:0}
        </li>
      )
    }
    return rangeListItems;
  }
  
  render(){
    return(
          <Card className='salary_statistic-card' label='Salary statistics'>
            <SalaryStatisticForm submit={this.submit} />
          {
            this.state.showStatistic &&
              (
              this.props.employees.length > 0 ?
              <ul className="list-group range_list">{this.rangeList()}</ul> :
              <div className="alert alert-info" role="alert">No employes in db</div>
              )
          }
          <ul className="list-group">
            <li className="list-group-item">Actual minimal salary: ₪{this.minActualSalaryObj ? this.minActualSalaryObj.salary : '0'}</li>
            <li className="list-group-item">Actual maximal salary: ₪{this.maxActualSalaryObj ? this.maxActualSalaryObj.salary : '0'}</li>
            <li className="list-group-item">Total salary budget: ₪{this.totalBudget}</li>
          </ul>
          </Card>

    )
  }

}