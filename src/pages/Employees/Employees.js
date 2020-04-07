import React from 'react';
import _ from 'lodash';

import EmployeeForm from './Components/EmployeeForm'
import ModalWindow from '../../shared/ModalWindow'
import Table from '../../shared/Table'
import Card from '../../shared/Card'

import './Employees.css'

export default class Employees extends React.Component {
  constructor(props){
    super(props);
    this.idToRemove = null;
    this.state = {
      showAddForm: 0,
      showModal: false
    }
    this.addEmployee = this.addEmployee.bind(this)
  }

  addEmployee(employe){
    const employees = [...this.props.employees];
    if (employees.find(item => item.id === employe.id)){
      return false;
    }
    employees.splice(0,0, employe);
    this.props.updateEmployees(employees);
    this.setState({showAddForm:0});
    return true;
  }

  pageToggle = ()=> {
    this.setState(prev=>({showAddForm: !prev.showAddForm}))
  }

  removeEmployee = () =>{
    let removedItems = [];
    const employees = [...this.props.employees];
    removedItems = _.remove(employees, elem => elem.id === this.idToRemove);
    this.props.updateEmployees(employees);
    this.setState({showModal:false});
    return removedItems.length !== 0
  }

  removeHandler (id) {
    this.idToRemove=id; 
    this.setState({showModal:true});
  }

  modalClose = () => {this.setState({showModal: false})}

  render(){

    return(
      <>
        <ModalWindow 
          show={this.state.showModal} 
          handleConfirm={this.removeEmployee} 
          handleCancel={this.modalClose}
          header={'Remove employe'}
          bodyText={`Do you really want remove employe with ID ${this.idToRemove}?`}
          nameConfirm={'Remove!'}
          nameCancel={'Cancel'}
        />

        <div className="container">
          <div className="row employees-page-header">
            {!this.state.showAddForm ?
              <button type="button" className="btn btn-dark" onClick={this.pageToggle}><i className="fa fa-plus-circle"></i>Add new employe</button>:
              <button type="button" className="btn btn-dark" onClick={this.pageToggle}><i className="fas fa-table"></i>Show table</button>
            }
          </div>
        </div>
        <Card label='All emloyees' className='employees-card'>
        {
          this.state.showAddForm ?
          <EmployeeForm addFunc={this.addEmployee} /> :
          (
            // render Table or Alert if employees is empty
            this.props.employees.length > 0 ?
            <Table 
              className="table-employees" 
              keyForRows = {obj => obj.id}
              body={this.props.employees.map(item=>{ 
                item = {...item};
                item.func=<i className='fa fa-trash' onClick={this.removeHandler.bind(this, item.id)}></i>; 
                return item; 
              })}
              header={['ID','e-mail', 'Name', 'Gender', 'Salary', 'Title', <i className='fa fa-trash'></i>]}
            /> :
            <div className="alert alert-info" role="alert">No employes in db</div>
          )
        }
        </Card>
      </>
    )
  }

}