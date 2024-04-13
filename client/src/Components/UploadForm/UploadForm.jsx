import React, { useState } from 'react';
import './UploadForm.scss';

const UploadForm = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        date: '',
        reportType: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { from, to, date, reportType, file } = formData;

        const formDataToSend = new FormData();
        formDataToSend.append('from', from);
        formDataToSend.append('to', to);
        formDataToSend.append('date', date);
        formDataToSend.append('reportType', reportType);
        formDataToSend.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/api/v1/uploadreport', {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully:', data.url);
            } else {
                const errorData = await response.json();
                console.error('File upload failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="upload-form-container">
            <h2>Upload Medical Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="From (Hospital ID)" required />
                </div>
                <div className="form-row">
                    <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="To (Patient ID)" required />
                </div>
                <div className="form-row">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
                </div>
                <div className="form-row">
                    <input type="text" name="reportType" value={formData.reportType} onChange={handleChange} placeholder="Report Type" required />
                </div>
                <div className="form-row">
                    <input type="file" name="file" onChange={handleFileChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadForm;
