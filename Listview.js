import React, { useState, useEffect } from 'react';
import  './View.jsx'; 

function StudentViewPage() {
    const [student, setStudent] = useState(null); 

    useEffect(() => {
                async function fetchStudentData() {
            try {
               
                const response = await fetch('http://localhost:5000/studentslist');
                const data = await response.json();
                setStudent(data); 
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        }

        fetchStudentData();
    }, []); 
    if (!student) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Student Profile</h1>
            <table>
        <thead>
          <tr>
            <th>studentname</th>
            <th>Age</th>
            <th>Email</th>
            <th>Course</th>
            <th>phoneno</th>
             <th>address</th>
             </tr>
             </thead>
             <tbody>
          {student.map((student) => (
            <tr key={student._id}>
                 <td>{student.studentname}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.phoneno}</td>
              <td>{student.address}</td>
              </tr>
          ))}
        </tbody>
        </table>    
        </div>
    );
}

export default StudentViewPage;
