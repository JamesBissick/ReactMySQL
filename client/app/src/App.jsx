import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [ name, setName ] = useState('');
  const [ age, setAge ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ employeeList, setEmployeeList ] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      gender: gender
    })
      .then(() => {
        console.log('Data sent!');
      });
  };

  const showEmployees = () => {
    Axios.get('http://localhost:3001/employees')
      .then((response) => {
        console.log(response);
        setEmployeeList(response.data);
      });
  };


  return (
    <div className='App'>
      <div className='infos'>
        <label>Name</label>
        <input type='text' onChange={ event => {
          setName(event.target.value);
        } } />
        <label>Age</label>
        <input type='number' onChange={ event => {
          setAge(event.target.value);
        } } />
        <label>Gender</label>
        <input type='text' onChange={ event => {
          setGender(event.target.value);
        } } />
        <button type='button' onClick={ addEmployee }>Add Employee</button>

        <div className='hr-line' />
        <div className='employees'>
          <button type='button' onClick={ showEmployees }>Show Data</button>
          <div className='employee-list'>
            { employeeList.map((value) => {
              return (
                <div key={ value.id }>{ value.name }</div>
              );
            }) }
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
