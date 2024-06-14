import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    address: '',
    membershipType: 'BRONZE SHUTTLE'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', formData);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
      <select name="membershipType" value={formData.membershipType} onChange={handleChange} required>
        <option value="BRONZE SHUTTLE">BRONZE SHUTTLE</option>
        <option value="SILVER SHUTTLE">SILVER SHUTTLE</option>
        <option value="GOLD SHUTTLE">GOLD SHUTTLE</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
