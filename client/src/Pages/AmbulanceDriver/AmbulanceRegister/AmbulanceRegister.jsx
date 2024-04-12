import React, { useState } from 'react';
import './AmbulanceRegister.scss';
import { Link } from 'react-router-dom';
const AmbulanceForm = () => {
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
            <h2>Ambulance Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="plate" value={formData.plate} onChange={handleChange} placeholder="Ambulance Plate Number" required />
                    {errors.plate && <span className="error">{errors.plate}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                <div className="form-row" >
                    <select name="ageType" value={formData.ageType} onChange={handleChange} required>
                        <option value="">Select Age Type</option>
                        <option value="child">Child</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                    {errors.ageType && <span className="error">{errors.ageType}</span>}
                </div>
                <Link to="/ambulance/dashboard"><button type="submit">Submit</button></Link>
            </form>
        </div>
    );
}

export default AmbulanceForm;
