import React, { useState, useEffect } from 'react';
import './managestudents.css';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    rollNo: '',
    name: '',
    email: '',
    password: '',
    present: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isAddStudentFormOpen, setIsAddStudentFormOpen] = useState(false);
  const [editStudentIndex, setEditStudentIndex] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedStudents = students.map((student) => {
      if (student.rollNo === name) {
        return { ...student, present: checked };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleAddStudent = () => {
    if (students.some((student) => student.email === newStudent.email)) {
      setEmailErrorMessage('Email ID already exists!');
      return;
    }

    if (!/@/.test(newStudent.password)) {
      setPasswordErrorMessage('Password must contain @ symbol!');
      return;
    }

    if (editStudentIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editStudentIndex] = newStudent;
      setStudents(updatedStudents);
      setEditStudentIndex(null);
    } else {
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }

    setNewStudent({
      rollNo: '',
      name: '',
      email: '',
      password: '',
      present: false,
    });
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setIsAddStudentFormOpen(false);
  };

  const handleEditStudent = (index) => {
    const studentToEdit = students[index];
    setNewStudent(studentToEdit);
    setEditStudentIndex(index);
    setIsAddStudentFormOpen(true);
  };

  const handleDeleteStudent = (index) => {
    setStudents((prevStudents) =>
      prevStudents.filter((_, i) => i !== index)
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterStudents(e.target.value);
  };

  const filterStudents = (searchValue) => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchValue.toLowerCase()) ||
        (student.present && searchValue.toLowerCase() === 'present') ||
        (!student.present && searchValue.toLowerCase() === 'absent')
    );
    setFilteredStudents(filtered);
  };

  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const totalPresentees = students.filter((student) => student.present).length;
  const totalAbsentees = students.filter((student) => !student.present).length;

  const isAddButtonDisabled =
    !newStudent.rollNo ||
    !newStudent.name ||
    !newStudent.email ||
    students.some((student) => student.email === newStudent.email) ||
    !/@/.test(newStudent.password);

  return (
    <div className="manage-students">
      <nav className="navbar">
        <div className="navbar-brand">Manage Students</div>
        <div className="navbar-icons">
          <div
            className="navbar-icon"
            onClick={() => setIsAddStudentFormOpen(true)}
          >
            <i className="fas fa-user-plus"></i> Add Student
          </div>
          <div className="navbar-icon">
            <i className="fas fa-edit"></i> Update Student
          </div>
        </div>
      </nav>

      {isAddStudentFormOpen && (
        <div className="add-student-form">
          <h2>{editStudentIndex !== null ? 'Update Student' : 'Add Student'}</h2>
          <label>
            Roll No:
            <input
              type="text"
              name="rollNo"
              value={newStudent.rollNo}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              required
            />
            {emailErrorMessage && <p className="error-message">{emailErrorMessage}</p>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={newStudent.password}
              onChange={handleInputChange}
              required
            />
            {passwordErrorMessage && <p className="error-message">{passwordErrorMessage}</p>}
          </label>
          <button onClick={handleAddStudent} disabled={isAddButtonDisabled}>
            {editStudentIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="student-list">
        <h2>Student List</h2>
        <ul>
          {sortedStudents.map((student, index) => (
            <li key={index}>
              <strong>Roll No:</strong> {student.rollNo},&nbsp;
              <strong>Name:</strong> {student.name},&nbsp;
              <strong>Email:</strong> {student.email},&nbsp;
              <strong>Status:</strong> {student.present ? 'Present' : 'Absent'}
              <button onClick={() => handleEditStudent(index)}>Edit</button>
              <input
                type="checkbox"
                name={student.rollNo}
                checked={student.present}
                onChange={handleCheckboxChange}
              />
              <button onClick={() => handleDeleteStudent(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="totals">
        <p>
          Total Presentees: {totalPresentees} | Total Absentees: {totalAbsentees}
        </p>
      </div>
    </div>
  );
};

export default ManageStudents;
