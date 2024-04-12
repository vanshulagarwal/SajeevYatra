import React, { useState } from 'react';
import './HospitalRegistration.scss';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        license: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            const response = fetch('http://localhost:3000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Hospital registered successfully');
                console.log(formData);
            } else {
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

        if (!formData.license.trim()) {
            errors.license = 'License is required';
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Register Hospital</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="license" value={formData.license} onChange={handleChange} placeholder="License" required />
                    {errors.license && <span className="error">{errors.license}</span>}
                </div>
                <Link to="/hospital/dashboard"> <button type="submit">Submit</button></Link>
            </form>
        </div>
    );
}

export default LoginForm;
