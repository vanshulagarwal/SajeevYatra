import { useState } from 'react';
import './HospitalLogin.scss';
import { Link , useNavigate} from 'react-router-dom';

const HospitalLogin = () => {
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

        // Check if form data is empty
        if (!formData.uid.trim() || !formData.password.trim()) {
            setErrors({
                uid: !formData.uid.trim() ? 'uid is required' : '',
                password: !formData.password.trim() ? 'Password is required' : ''
            });
            return;
        }

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
                console.log('Hospital login successfully');
                const data = await response.json();
                localStorage.setItem('uid', data.message.uid);
                navigate('/hospital/dashboard');
            } else {
                alert('Invalid credentials');
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

        if (!formData.uid.trim() === 0) {
            errors.uid = 'uid not entered';
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login Hospital</h2>
            <form>
                <div className="form-row">
                    <input type="text" name="uid" value={formData.uid} onChange={handleChange} placeholder="UID" required />
                    {errors.uid && <span className="error">{errors.uid}</span>}
                </div>
                <div className="form-row">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit" style={{ marginBottom: "20px" }} onClick={handleSubmit}>Submit</button>
                <p className='msgforlogin'>OR If you don't have any account </p>
                <Link to="/hospital/register"> <button type="submit">Register</button></Link>
            </form>
        </div>
    );
}

export default HospitalLogin;
