import { useState } from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uid: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed to the next page
            // calling api
            const response = await fetch('http://localhost:3000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            if (response.ok) {
                alert('Login successful');
                const data = await response.json();
                console.log('User registered successfully');
                console.log(data.message);
                localStorage.setItem('uid', data.message.uid);
                navigate('/user/dashboard');

            } else {
                alert('Login failed');
                console.log(response)
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

        if (Object.keys(errors).length !== 0) {            
            errors.uid = 'uid is invalid';            
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="Enter UID" required />
                    {errors.uid && <span className="error">{errors.uid}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>           
        
                <button type="submit" onClick={handleSubmit}>Login</button>
           
            </form>
        </div>
    );
}

export default Login