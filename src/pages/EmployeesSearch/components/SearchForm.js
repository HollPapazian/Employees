import React, { Component } from 'react';

import {titlesForGenerator as titles, salary} from '../../../config/employees_config'
import InputSelect from '../../../shared/FormElements/InputSelect'
import InputRange from '../../../shared/FormElements/InputRange'

const [minSalary, maxSalary] = salary;

class SearchForm extends Component {
  constructor(props){
    super(props)
    this.state={
      minsalary: minSalary,
      maxsalary: maxSalary,
      title:''
    }
  }

  onChangeHandler = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  filterFunction = item => {
    const salaryCheck = (item.salary >= this.state.minsalary) && (item.salary < this.state.maxsalary)
    if (!!this.state.title) {
      return (item.title === this.state.title) && salaryCheck;
    } else {
      return salaryCheck;
    }
  }

  submit = event => {
    event.preventDefault();
    const employeesSearch = this.props.employees.filter(this.filterFunction);
    this.props.updateEmployeesSearch(employeesSearch);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-row align-items-center">
          <div className="col-md">
            <InputRange
              name='minsalary'
              min={minSalary}
              max={this.state.maxsalary}
              label='Min salary'
              value={this.state.minsalary}
              handler={this.onChangeHandler}
              discription={`Сhoose salary: ${minSalary} - ${this.state.maxsalary}`}
            />
          </div>
          <div className="col-md">
            <InputRange
              name='maxsalary'
              min={this.state.minsalary}
              max={maxSalary}
              label='Max salary'
              value={this.state.maxsalary}
              handler={this.onChangeHandler}
              discription={`Сhoose salary: ${this.state.minsalary} - ${maxSalary}`}
            />
          </div>
          <div className="col-sm-auto">
            <InputSelect 
              name='title'
              label='Title'
              items={['', ...titles]}
              handler={this.onChangeHandler}
              discription='Сhoose title'
            />
          </div>
          <div className="col-sm-auto">
            <button type="submit" className='btn btn-outline-dark'><i className="fas fa-search"></i>Search!</button>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;

