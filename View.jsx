// ViewStudent.js
import React from 'react';

function View({ student }) {
    if (!student || !student.studentname) {
        return <div>No student data available.</div>; // Display if student data is incomplete or undefined
    }

    return (
        <div>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {student.studentname}</p>
            <p><strong>Age:</strong> {student.age}</p>
            
        </div>
    );
}


export default View;
