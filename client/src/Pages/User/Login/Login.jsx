import { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'

const Register = () => {
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
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed to the next page
            // calling api
            const response = fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            if (response.ok) {
                console.log('User registered successfully');
                console.log(formData);
            } else {
                console.log('User registration failed');
            }

            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        for (const key in formData) {
            if (!formData[key].trim()) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        }

        if (Object.keys(errors).length === 0) {
            if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid';
            }
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                {Object.keys(errors).length === 0 ? (
                    <Link to='/user/dashboard'><button type="submit">Submit</button></Link>
                ) : (
                    <button type="submit">Submit</button>
                )}
            </form>
        </div>
    );
}

export default Register