import React, { useState } from 'react';
import './AmbulanceLogin.scss';
import { Link, useNavigate } from 'react-router-dom';
const AmbulanceLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uid: '',
        password: '',
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
                localStorage.setItem('uid', data.message.uid);
                navigate('/ambulance/dashboard');
                // console.log('ambulance registered successfully');
                // console.log(formData);
            } else {
                alert('Login failed');
                console.log('ambukance login failed');
            }

            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        if (!formData.password.trim()) {
            errors.password = 'password is required';
        }

        if (!formData.uid.trim()) {
            errors.uid = 'uid number is required';
        }
        return errors;
    };

    return (
        <div className="ambulance-form-container">
            <h2>Ambulance Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="Ambulance uid Number" required />
                </div>

                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
                </div>
                

                {/* <Link to="/ambulance/dashboard"><button type="submit" style={{marginBottom: "20px"}}>Get OTP</button></Link> */}
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default AmbulanceLogin;
