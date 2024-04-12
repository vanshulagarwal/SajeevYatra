import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookAmbulance.scss'
import socket from '../../socket';
import { useEffect } from 'react';

const BookAmbulance = () => {

  useEffect(() => {
    // Example: Listen for a 'message' event
    socket.on('found-ambulance', (data) => {
      console.log('ambulance found', data);
    });
    
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phnum: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.emit('join-room', formData.phnum);

    socket.emit('find-ambulance', formData);
  };



  return (
    <div className="login-form-container">
      <h2>Information</h2>
      <form >
        <div className="form-row">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        </div>
        <div className="form-row">
          <input type="tel" name="phnum" value={formData.phnum} onChange={handleChange} placeholder="Phone No." pattern="[0-9]{10}" required />
        </div>
        <div className="form-row">
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default BookAmbulance;
