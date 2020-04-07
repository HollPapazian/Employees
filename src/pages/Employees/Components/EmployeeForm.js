import React from 'react'; 

import { salary, genders, titles, idLength, nameMinLength } from '../../../config/employees_config';
import RadioBoxes from '../../../shared/FormElements/RadioBoxes'
import InputSelect from '../../../shared/FormElements/InputSelect'
import EmailWithFixPart from '../../../shared/FormElements/EmailWithFixPart'
import InputRange from '../../../shared/FormElements/InputRange'
import InputElement from '../../../shared/FormElements/InputElement'

const [minSalary, maxSalary] = salary;

export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.isInvalid = true;
    this.state = {
      emailFirstPart: '@',
      formState: {
        id: '',
        emailAddress: '',
        name: '',
        gender: '',
        salary: '5000',
        title: titles[0]
      },
      errors: {}
    }
  }

  emailGenerator = ()=>{
      const emailFirstPart = this.state.formState.name + this.state.formState.id.substring(0,3) + this.state.emailFirstPart.slice(-1);
      this.setState({emailFirstPart})
  }

  changeHandler = event => {
    let {name, value} = event.target;
    const formState = {...this.state.formState};
    formState[name] = value;
    // second argument for be sure that state is already updated
    this.setState({formState}, () => {if (name === 'name' || name === 'id') this.emailGenerator()});
  }

  // something like middleware, to not get a user put letters in field of ID
  numberTextFieldKeyCheck = event => {
    const errors = this.state.errors;
    errors['id'] = ''
    if (/^\d+$/.test(event.target.value) || event.target.value === '') {
      this.minLengthValidator(event, idLength)
    } else {
      errors['id'] = 'This field accept only digits!'
    }
    this.setState({errors})
  }

  // minimal length validator
  minLengthValidator = (event, min) => {
    let {name, value} = event.target;
    const errors = this.state.errors;
    errors[name] = '';
    if (value.length < min) {
      errors[name] = `This field should be not less than ${min} symbols`;
    }
    this.setState({ errors });
    this.changeHandler(event)
  }   

  // email validation. it`s very simple I know, but it`s something
  emailValidator = event => {
    let {name, value} = event.target;
    const errors = this.state.errors;
    errors[name] = '';
    if (!(/\w+@\w+\.\w{2,}/.test(this.state.emailFirstPart + value))) {
      errors[name] = `E-mail is invalid`;
    }
    this.setState({ errors });
    this.changeHandler(event)
  }

  // checking if we have some errors in state.error and we have some fields untouched
  checkErrors = () => {
    if (Object.values(this.state.formState).some(item => item === '') || Object.values(this.state.errors).some(item => item !== '')) {
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
    }
  }

  submit = event => {
    event.preventDefault();
    const employeData = {...this.state.formState};
    employeData.emailAddress = this.state.emailFirstPart + this.state.formState.emailAddress;
    if (!this.props.addFunc(employeData)) {
      const errors = this.state.errors;
      errors['id'] = 'This ID already exists';
      this.setState({ errors });
    }
  }

  render(){
    this.checkErrors();
    return(
        <form onSubmit={this.submit}>
          <div className="row">
            <div className="col-sm">
              <InputElement 
                type='text'
                name='id'
                value={this.state.formState['id']} 
                label='Employe ID'
                handler={this.numberTextFieldKeyCheck}
                errors={this.state.errors}
                maxLength={idLength}
                discription={`ID should be an unique number containing ${idLength} digits`}
              />
            </div>
            <div className="col-sm">
              <InputElement 
                type='text'
                name='name'
                value={this.state.formState['name']} 
                label='Employe name'
                handler={event=>{this.minLengthValidator(event, nameMinLength)}}
                errors={this.state.errors}
                discription={`Name should be any string with length not less than ${idLength} symbols`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
              <RadioBoxes 
                name='gender'
                value={this.state.formState.gender}
                label='Gender'
                items={genders}
                handler={this.changeHandler}
                errors={this.state.errors}
                discription='Сhoose gender'
              />
            </div>
            <div className="col-sm">
              <InputSelect 
                name='title'
                label='Title'
                items={titles}
                handler={this.changeHandler}
                discription='Сhoose title'
              />
            </div>
          </div>          
          <EmailWithFixPart 
            name='emailAddress'
            label='E-mail address'
            fixPart={this.state.emailFirstPart}
            value={this.state.formState.emailAddress}
            handler={this.emailValidator}
            errors={this.state.errors}
            discription='Enter e-mail address'
          />
          <InputRange
            name='salary'
            min={minSalary}
            max={maxSalary}
            label='Salary'
            value={this.state.formState.salary}
            handler={this.changeHandler}
            discription='Сhoose salary'
          />
          <div className="form-group">
            <button disabled={this.isInvalid} type="submit" className='btn btn-outline-dark'>Add new employe</button>
          </div>
          { Object.values(this.state.formState).some(item => item === '') && <small className="form-text text-danger">Please fill  all fields</small> }
        </form>
    )
  }
  
}