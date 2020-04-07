import React, { Component } from 'react';

import InputElement from '../../../shared/FormElements/InputElement'

class SalaryStatisticForm extends Component {

  constructor(props){
    super(props)
    this.state={
      interval:5000,
      rangesCounts:[],
      showStatistic: false
    }
  }

  onChangeHandler = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  submit = event => {
    event.preventDefault();
    this.props.submit(+this.state.interval)
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="form-row align-items-center">
          <div className="col-sm">
            <InputElement 
              type='number'
              name='interval'
              label='Range interval'
              value={this.state.interval}
              handler={this.onChangeHandler}
              discription='Insert salary interval value for getting salary statistics grouped by the ranges'
            />
          </div>
          <div className="col-sm-auto">
            <button disabled={this.isInvalid} type="submit" className='btn btn-outline-dark'>Get statistic</button>
            </div>
        </div>
      </form>
    );
  }
}

export default SalaryStatisticForm;