import React from 'react';
import _ from 'lodash';

import Card from '../../shared/Card'
import Table from '../../shared/Table'
import SalaryBarChart from '../../shared/MyBarChart'

import './TitleStatistics.css'

export default function EmployeesStatistics({employees}){
  const statisticsObj = _.countBy(employees, 'title'); 
  const statisticsArray = Object.entries(statisticsObj).map((item, index) => { return {name: item[0], count: item[1]} })

  return(
    <Card label='Salary statistics' className='title_statistic-card'>
      {employees.length ?
      // <Table className="table-title_statistic" keyForRows = {obj => obj.name} body={statisticsArray} header={['Title','Count']}/> :
      <SalaryBarChart data={statisticsArray} legendLabel='Title count' margin={{top: 5, right: 0, left: 50, bottom: 5}}/>:
      <div className="alert alert-info" role="alert">No employes in db</div>
      } 
    </Card>
  )
}