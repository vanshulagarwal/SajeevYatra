import React, { useState } from 'react';
import './AmbulanceRegister.scss';
import { Link , useNavigate} from 'react-router-dom';
const AmbulanceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        uid: '',
        location: '',
        userType: 'ambulance',
        password: '',
        email: '',
        phnum: ''
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
                navigate('/ambulance/dashboard');
                console.log('ambulance registered successfully');
                console.log(formData);
            } else {
                alert('Registration failed');
                console.log('ambukance registration failed');
            }

            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.plate.trim()) {
            errors.plate = 'Plate number is required';
        }

        if (!formData.location.trim()) {
            errors.location = 'Location is required';
        }


        return errors;
    };

    return (
        <div className="ambulance-form-container">
            <h2>Ambulance Information</h2>
            <form>
                <div className="form-row">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="Ambulance uid Number" required />
                </div>
                <div className="form-row">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                <div className="form-row">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <div className="form-row">
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" required />

                </div>
                
                <div className="form-row">
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="longitude" required />
                </div>
                <div className="form-row">
                    <input type="text" name="phnum" value={formData.phnum} onChange={handleChange} placeholder="phnum" required />
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default AmbulanceForm;
