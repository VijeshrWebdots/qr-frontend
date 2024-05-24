import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [drwonload, setdrwonload] = useState('')
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
        organisation: '',
        title: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });



        


    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:3001/api/vscardgenerate', { params: formData });
            console.log(response.data.filePath);
            setdrwonload(response.data.filePath)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Organisation:
                    <input type="text" name="organisation" value={formData.organisation} onChange={handleChange} />
                </label>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </label>
                <button type="submit">Generate vCard</button>
            </form>
            
        </div>
    );
};

export default ContactForm;
