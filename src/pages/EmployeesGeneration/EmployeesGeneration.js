import React from 'react'; 
import {Redirect} from 'react-router-dom'

import {getRandomNumber, getRandomElement} from '../../utils/random'
import {firstIdForGenerator, domainsForGenerator as domains, namesForGenerator as names, titlesForGenerator as titles, salary} from '../../config/employees_config'
import InputElement from '../../shared/FormElements/InputElement'
import Card from '../../shared/Card'
import {employeesConfig} from '../../config/employees_config'

import './EmployeesGeneration.css'

const [minSalary, maxSalary] = salary;
const {employees} = employeesConfig
let idCount = firstIdForGenerator;

function generateEmploye(){
  const id = idCount++;
  const {name, gender} = getRandomElement(names);
  const salary = getRandomNumber(+minSalary, +maxSalary);
  const title = getRandomElement(titles);
  const emailAdress = `${name}${id.toString().substring(0,3)}@${getRandomElement(domains)}`;
  return {id, emailAdress, name, gender, salary, title};
}

export default class EmployeesGeneration extends React.Component {
  constructor(props){
    super(props)
    this.state={
      numberOFLines:10,
      redirect: false
    }
  }

  onChangeHandler = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submit = event => {
    event.preventDefault();
    const employees = []
    for (let i=0; i<this.state.numberOFLines; i++){
      employees.push(generateEmploye())
    }
    this.props.updateEmployees(employees);
    this.setState({redirect: true})
  }
  
  render(){
    return(
      <>
      {this.state.redirect && <Redirect to={employees} />}
        <Card className='generator-card' label='Generate employees'>
          <form onSubmit={this.submit}>
            <div className="form-row align-items-center">
              <div className="col-md-auto">
                <InputElement 
                  type='number'
                  name='numberOFLines'
                  label='Employees count'
                  value={this.state.numberOFLines}
                  handler={this.onChangeHandler}
                  discription='Insert how many employees do you want insert in db'
                  max={100}
                />
              </div>
              <div className="col-md-auto">
                <button type="submit" className='btn btn-outline-dark'>Generate!</button>
              </div>
            </div>
          </form>
        </Card>
      </>
    )
  }

}