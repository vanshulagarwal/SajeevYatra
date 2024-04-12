import React, { useState } from 'react';
import './HospitalLogin.scss';
import { Link } from 'react-router-dom';

const HospitalLogin = () => {
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
            console.log(formData);
            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.email = 'Email is required';
        }

        if (!formData.password.trim()) {
            errors.password = 'password is required';
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login Hospital</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="email" name="name" value={formData.email} onChange={handleChange} placeholder="email" required />
                    {errors.name && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="license" value={formData.password} onChange={handleChange} placeholder="password" required />
                    {errors.license && <span className="error">{errors.password}</span>}
                </div>
                <Link to="/hospital/dashboard"> <button type="submit">Submit</button></Link>
            </form>
        </div>
    );
}

export default HospitalLogin;
