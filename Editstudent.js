import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        studentname: '',
        age: '',
        email: '',
        phoneno: '',
        address: '',
        course: ''
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/studentslist/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/studentslist/${id}`, student);
            alert('Student updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Failed to update student');
        }
    };

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleSave}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="studentname"
                        value={student.studentname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone No:</label>
                    <input
                        type="text"
                        name="phoneno"
                        value={student.phoneno}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Course:</label>
                    <input
                        type="text"
                        name="course"
                        value={student.course}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditStudent;
