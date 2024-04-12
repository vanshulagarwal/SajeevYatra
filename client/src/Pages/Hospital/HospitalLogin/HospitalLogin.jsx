import React, { useState } from 'react';
import './HospitalLogin.scss';
import { Link } from 'react-router-dom';

const HospitalLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

        // Check if form data is empty
        if (!formData.email.trim() || !formData.password.trim()) {
            setErrors({
                email: !formData.email.trim() ? 'Email is required' : '',
                password: !formData.password.trim() ? 'Password is required' : ''
            });
            return;
        }

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            const response = fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Hospital login successfully');
                console.log(formData);
            } else {
                console.log('Hospital login failed');
            }

            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email format is invalid';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login Hospital</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <Link to="/hospital/dashboard" onClick={handleSubmit}> <button type="submit" style={{ marginBottom: "20px" }}>Submit</button></Link>
                <p className='msgforlogin'>OR If you don't have any account </p>
                <Link to="/hospital/register"> <button type="submit">Register</button></Link>
            </form>
        </div>
    );
}

export default HospitalLogin;
