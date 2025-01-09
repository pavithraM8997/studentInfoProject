
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./application.css";

const EditStudent = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [studentName, setStudentName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [course, setCourse] = useState('');
   
    

   
    const fetchStudentData = async () => {
        const url = 'http://localhost:5000/api/students/'+id;
        try {
            const response = await axios.get(url);
            const studentData = response.data;
            setStudentName(studentData.studentName);
            setAge(studentData.age);
            setEmail(studentData.email);
            setPhoneNo(studentData.phoneNo);
            setAddress(studentData.address);
            setCourse(studentData.course);
          } catch (error) {
            console.error('Error fetching student data:', error);
          }
        };
    useEffect(() => {
        
        fetchStudentData();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/students/${id}`, {
          studentName,
          age,
          email,
          phoneNo,
          address,
          course
        });
        navigate('/user-list'); 
      };

    

    return (
        <div className="form-container">
            <h1>Edit Student</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label>Student Name:</label>
                        <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        />
                </div>
                <div className="form-group">
                        <label>Age:</label>
                        <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        />
                </div>
                <div className="form-group">
                        <label>Email:</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="form-group">
                        <label>Phone No:</label>
                        <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        />
                </div>
                <div className="form-group">
                        <label>Address:</label>
                        <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        />
                </div>
                <div className="form-group">
                        <label>Course:</label>
                        <select value={course} onChange={(e) => setCourse(e.target.value)}>
                        <option value="">Select a course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Business">Business</option>
                        <option value="Arts">Arts</option>
                        </select>
                </div>
                    <button type="submit" className="submit-button">Save Changes</button>
            </form>
               
        </div>
    );
};

export default EditStudent;
