import React, { useState } from 'react';
import './HospitalRegistration.scss';
import { Link, useNavigate } from 'react-router-dom';

const HospitalRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        uid: '',
        userType: 'hospital',
        password: '',
        email: '',
        phnum: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            const response = await fetch('http://localhost:3000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            if (response.ok) {
                alert('Registration successful');
                const data = await response.json();
                localStorage.setItem('uid', data.message.uid);
                navigate('/hospital/dashboard');
                console.log('Hospital registered successfully');
                console.log(formData);
            } else {
                alert('Invalid credentials');
                console.log('Hospital registration failed');
            }

            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        if (!formData.name.trim() ) {
            errors.name = 'Name is required';
        }

        if (!formData.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!formData.uid.trim()) {
            errors.uid = 'License is required';
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Register Hospital</h2>
            <form >
                <div className="form-row">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="UID" required />
                    {errors.uid && <span className="error">{errors.uid}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
                </div>
                <div className="form-row">
                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="email" required />
                </div>
                <div className="form-row">
                    <input type="text" name="phnum" value={formData.phnum} onChange={handleChange} placeholder="phone number" required />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default HospitalRegistration;
