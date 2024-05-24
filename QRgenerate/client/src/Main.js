import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const ContactForm = () => {
    const [drwonload, setDrwonload] = useState('');
    const [loader, setLoader] = useState(false)
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
        setLoader(true)
        try {
            const response = await axios.post('http://localhost:3001/api/vscardgenerate', formData);
            setDrwonload(response.data.fileUrl)
            setLoader(false)
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // console.log(loader,"loda")
    const downloadQRCodeImage = () => {
        const canvas = document.getElementById('qrCodeCanvas');
        const dataUrl = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr_code.png';
        link.click();
    };

    return (
        <div className="flex justify-center text-center content-center mt-10">

            {loader &&
                <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 z-50 flex items-center justify-center">
                    <div role="status" className="flex justify-center items-center">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600 mr-2" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="">Loading...</span>
                    </div>
                </div>
            }


            <div className='w-full'></div>

            <div className='w-full ml-10'>
                <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="mb-10">
                        <input type="text" name="fname" value={formData.fname} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='First Name' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="lname" value={formData.lname} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Last Name' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Contact Number' />
                    </div>
                    <div className="mb-10">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Contact Email' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="organisation" value={formData.organisation} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Organisation' />
                    </div>
                    <div className="mb-10">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="border border-gray-400 p-3 rounded-md w-full" placeholder='Role' />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Generate vCard</button>
                </form>

            </div>
            <div className='w-full z-50'>
                {drwonload && (
                    <div className=" items-center">
                        <QRCode id="qrCodeCanvas" value={drwonload} size={300} className="border-2 border-black p-4 m-4" />
                        <button onClick={downloadQRCodeImage} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Download QR Code</button>
                    </div>
                )}
            </div>
            <div className='w-full'></div>

        </div>
    );
};

export default ContactForm;
