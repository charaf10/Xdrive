import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {mydbAPI, myip} from '../../../IP';

function Select({ selectedValue, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
    .get('http://' + myip +':80/link/driver/SelectListShift.php') // Remplacez <URL_DE_VOTRE_API> par l'URL de votre API
    .then(response => {
        setOptions(response.data);
        console.log("rep : " + response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSelectChange = event => {
    const value = event.target.value;
    onChange(value);
  };

  const customStyles = {
    width:'100%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  };

  return (
    <select  style={customStyles} value={selectedValue} onChange={handleSelectChange}>
      <option value="" disabled>Select a shift</option> {/* Placeholder */}
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
