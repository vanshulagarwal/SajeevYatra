import React, { useState } from 'react';
import './AmbulanceLogin.scss';
import { Link } from 'react-router-dom';
const AmbulanceLogin = () => {
    const [formData, setFormData] = useState({
        name: '',
        plate: '',
        location: '',
        ageType: ''
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
            errors.name = 'Name is required';
        }

        if (!formData.plate.trim()) {
            errors.plate = 'Plate number is required';
        }

        if (!formData.location.trim()) {
            errors.location = 'Location is required';
        }

        if (!formData.ageType.trim()) {
            errors.ageType = 'Age type is required';
        }

        return errors;
    };

    return (
        <div className="ambulance-form-container">
            <h2>Ambulance Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="plate" value={formData.plate} onChange={handleChange} placeholder="Ambulance Plate Number" required />
                    {errors.plate && <span className="error">{errors.plate}</span>}
                </div>

                <div className="form-row">
                    <input type="email" name="plate" value={formData.plate} onChange={handleChange} placeholder="Registered Email" required />
                    {errors.plate && <span className="error">{errors.plate}</span>}
                </div>

                <div className="form-row">
                    <input type="number" name="location" value={formData.location} onChange={handleChange} placeholder="OTP" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                

                <Link to="/ambulance/dashboard"><button type="submit" style={{marginBottom: "20px"}}>Get OTP</button></Link>
                <Link to="/ambulance/dashboard"><button type="submit">Login</button></Link>
            </form>
        </div>
    );
}

export default AmbulanceLogin;
