import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

const StudentDetail = () => {
    const { id } = useParams();
   
     const [studentName, setStudentName] = useState(''); // State for student name
     const [age, setAge] = useState('');
     const [email, setEmail] = useState('');
     const [course, setCourse] = useState('');
     const [phoneNo, setPhoneNo] = useState('');
     const [address, setAddress] = useState('');
    console.log(id); 
    const fetchStudent = async () => {
      const url = 'http://localhost:5000/api/students/'+id;
      try {
        const response = await axios.get(url);
        
        setStudentName(response.data.studentName);
        setAge(response.data.age);
        setEmail(response.data.email);
        setCourse(response.data.course);
        setPhoneNo(response.data.phoneNo);
        setAddress(response.data.address);

        return response.data;
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    useEffect(() => {
        fetchStudent();
      }, [id]);

    return (
        <div className="tables3">
            <p>Displaying details for student with ID: <span>{id}</span></p>
            
                <div>
                    <p><strong>Name:</strong> {studentName}</p>
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Course:</strong> {course}</p>
                    <p><strong>PhoneNo:</strong> {phoneNo}</p>
                    <p><strong>Address:</strong> {address}</p>
                    
                </div>
           
                
            
            <Outlet />
            </div>
            
    );
            };
            export default StudentDetail ;