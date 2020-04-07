import React from 'react'; 

import SearchForm from './components/SearchForm'
import Card from '../../shared/Card'
import Table from '../../shared/Table'

import './EmployeesSearch.css'

export default class EmployeesSearch extends React.Component {
  constructor(props){
    super(props)
    this.state={
      // I show all employees for default
      employeesSearch: this.props.employees
    }
  }

  componentDidUpdate(){

  }

  updateEmployeesSearch = employeesSearch => this.setState({employeesSearch})
 
  render(){
    return(
      <Card className='search-card' label='Search'>
      <SearchForm employees={this.props.employees} updateEmployeesSearch={this.updateEmployeesSearch}/>  
      {
        this.state.employeesSearch.length>0 ?
        <Table className="table-search" keyForRows = {obj => obj.id} body={this.state.employeesSearch} header={['ID','e-mail', 'Name', 'Gender', 'Salary', 'Title']} /> :
        <div className="alert alert-info" role="alert">No employes for this parameters</div>
      }
      </Card>
    )
  }
}