import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import"./submmition.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
  
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/studentslist');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);
  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };
  const handleDeleteSelected = async () => {
    try {
      await axios.delete('http://localhost:5000/studentslist', { data: { ids: selectedStudents } });
      setStudents(students.filter((student) => !selectedStudents.includes(student._id)));
      setSelectedStudents([]);
      alert(`${selectedStudents.length} student(s) deleted successfully.`);
    } catch (error) {
      console.error('Error deleting students:', error);
    }
  };
  
  

const handleRowClick = (studentId, event) => {
  
  if (event.target.type === 'checkbox') return;

  
  navigate(`/students/${studentId}`);
};;
const handleEditClick = (id) => {
  navigate(`/student/edit/${id}`);
};



  return (
    <div>
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>studentName</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>phoneNo</th>
             <th>address</th>

          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}onClick={(e) => handleRowClick(student._id,e)}>
              <td>
                  <button onClick={() => handleEditClick(student._id)}>Edit</button>
                  <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                   onChange={(e) => {e.stopPropagation(); handleCheckboxChange(student._id);}}
                  />       
              </td>
                
              <td>{student.studentName}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.phoneNo}</td>
              <td>{student.address}</td>
              </tr>
          ))}
          
        </tbody>
      </table>
                <button key="delete-selected" onClick={handleDeleteSelected} disabled={selectedStudents.length === 0}>
                Delete Selected
                </button>
    </div>
  );
};

export default StudentList;
