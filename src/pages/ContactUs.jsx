import React from 'react';

const ContactUs = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Contact Us</h1>
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
                We'd love to hear from you! Fill out the form below or reach us at the provided contact details.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '500px', flex: 1 }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <label>
                            Name:
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px'
                                }} 
                            />
                        </label>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px'
                                }} 
                            />
                        </label>
                        <label>
                            Message:
                            <textarea 
                                placeholder="Your message here..." 
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px'
                                }} 
                            />
                        </label>
                        <button 
                            type="submit" 
                            style={{
                                padding: '10px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div style={{ maxWidth: '500px', flex: 1, textAlign: 'center', marginTop: '20px' }}>
                    <h3>Contact Details</h3>
                    <p>Email: primeshoes@gmail.com</p>
                    <p>Phone: +91 12345 67890</p>
                    <p>Address: 123, Goregaon East,Navi Mumbai</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
