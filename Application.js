import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import "./application.css";

const StudentForm = () => {
    const [studentName, setStudentName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [course, setCourse] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(''); 
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:5000/signup', {
                studentName,
                age,
                email,
                phoneNo,
                address,
                course
            }).then( response => {
                console.log("RESPONSE :", response)
                setOpen(true);
                let isSuccess = false;
                if (response.data) {
                    setMessage('Form submitted successfully!');
                    setSeverity('success'); 
                    setStudentName('');
                    setAge('');
                    setEmail('');
                    setPhoneNo('');
                    setAddress('');
                    setCourse('');
                    isSuccess = true;
                } else {
                    setMessage('Form submission failed. Please try again.');
                    setSeverity('error'); 
                }
                if(isSuccess) {
                    setTimeout( navigateFun, 2000)
                }
            });
        } catch (error) {
            console.error('Error during submission:', error);
            setMessage('An error occurred. Please try again later.');
            setSeverity('error');
            setOpen(true);
            console.log(error.config); 
            console.log(error.response?.data); 
        }
    } ;

    const navigateFun = () => {
        navigate('/user-list')
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        
        }
        setOpen(false);
    };

    return (
        <div className="form-container">
            <div className="form-group">
                <label>StudentName:</label>
                <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name" 
                />
                <div className="form-group">
                    <label>Age:</label>
                    <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <select value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value="">Select a course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Engineering">Electonics</option>
                        <option value="Business">Business</option>
                        <option value="Arts">Arts</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>PhoneNo:</label>
                    <input
                        type='text'
                        value={phoneNo}
                        onChange={(e)=>setPhoneNo(e.target.value)}
                        placeholder='Enter your PhoneNo'
                    />
                </div>
                <div className='form-group'>
                    <label>Address</label>
                    <input 
                        type='text'
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        placeholder='Enter your Address'
                    />
                </div>
                <button type="submit" className="submit-button" onClick= {e => handleSubmit(e)}>Submit</button>
            </div>
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={5000} 
                onClose={handleClose}
            />
        </div>
    );
}

export default StudentForm;
