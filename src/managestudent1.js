import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaEdit, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';
import './managestudents.css';

const ManageStudents1 = () => {
  const [students, setStudents] = useState([
    {
      id: '',
      rollNo: '',
      name: '',
      email: '',
      password: '',
      periods: [
        { period: 'phy', present: true },
        { period: 'che', present: true },
        { period: 'cs', present: true },
        { period: 'm2', present: true },
        { period: 'ui', present: true },
        { period: 'firebase', present: true },
      ],
    },
  ]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    rollNo: '',
    name: '',
    email: '',
    password: '',
    periods: [
      { period: 'phy', present: true },
      { period: 'che', present: true },
      { period: 'cs', present: true },
      { period: 'm2', present: true },
      { period: 'ui', present: true },
      { period: 'firebase', present: true },
    ],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isAddStudentFormOpen, setIsAddStudentFormOpen] = useState(false);
  const [editStudentIndex, setEditStudentIndex] = useState(null);
  const [searchOption, setSearchOption] = useState('name');

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

  const handleCheckboxChange = (studentId, period) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        const updatedPeriods = student.periods.map((p) => {
          if (p.period === period) {
            return { ...p, present: !p.present }; // Toggle the value
          }
          return p;
        });
        return { ...student, periods: updatedPeriods };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
  
  

  const handleAddStudent = () => {
    if (editStudentIndex === null) {
      if (students.some((student) => student.rollNo === newStudent.rollNo)) {
        alert('Roll No already exists!');
        return;
      }
      if (students.some((student) => student.email === newStudent.email)) {
        setEmailErrorMessage('Email ID already exists!');
        return;
      }
      if (!/@/.test(newStudent.password)) {
        setPasswordErrorMessage('Password must contain @ symbol!');
        return;
      }
    }

    if (editStudentIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editStudentIndex] = newStudent;
      setStudents(updatedStudents);
      setEditStudentIndex(null);
    } else {
      const studentWithId = { ...newStudent, id: generateUniqueId() };
      setStudents((prevStudents) => [...prevStudents, studentWithId]);
    }

    setNewStudent({
      id: '',
      rollNo: '',
      name: '',
      email: '',
      password: '',
      periods: [
        { period: 'phy', present: true },
        { period: 'che', present: true },
        { period: 'mat', present: true },
        { period: 'cs', present: true },
        { period: 'm2', present: true },
      ],
    });
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    setIsAddStudentFormOpen(false);
  };

  const generateUniqueId = () => {
    // Generate a unique ID using any method you prefer
    // For example, you can use the `uuid` library or increment a counter
    // In this example, we'll use a simple counter

    // Initialize the counter in the localStorage if it doesn't exist
    if (!localStorage.getItem('studentCounter')) {
      localStorage.setItem('studentCounter', '0');
    }

    // Get the current counter value and increment it
    const counter = parseInt(localStorage.getItem('studentCounter'));
    const newCounter = counter + 1;

    // Save the new counter value to the localStorage
    localStorage.setItem('studentCounter', newCounter.toString());

    // Return the unique ID
    return newCounter.toString();
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setNewStudent(studentToEdit);
    setEditStudentIndex(students.findIndex((student) => student.id === id));
    setIsAddStudentFormOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterStudents(e.target.value);
  };

  const handleSearchOption = (e) => {
    setSearchOption(e.target.value);
  };

  const handleStatusChange = (id, period) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) => {
        if (student.id === id) {
          const updatedPeriods = student.periods.map((p) => {
            if (p.period === period) {
              return { ...p, present: !p.present };
            }
            return p;
          });
          return { ...student, periods: updatedPeriods };
        }
        return student;
      });
      return updatedStudents;
    });
  };

  const filterStudents = (searchValue) => {
    const filtered = students.filter((student) => {
      if (searchOption === 'name') {
        return student.name.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchOption === 'rollNo') {
        return student.rollNo.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchOption === 'present') {
        return (
          (student.present && searchValue.toLowerCase() === 'present') ||
          (!student.present && searchValue.toLowerCase() === 'absent')
        );
      }
      return false;
    });
    setFilteredStudents(filtered);
  };

  const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));

  const isAddButtonDisabled =
    !newStudent.rollNo ||
    !newStudent.name ||
    !newStudent.email ||
    students.some((student) => student.email === newStudent.email) ||
    students.some((student) => student.rollNo === newStudent.rollNo) ||
    !/@/.test(newStudent.password);

  const isUpdateButtonDisabled = !newStudent.password;

  const columnNames = ['phy', 'che', 'cs', 'm2', 'ui', 'firebase'];

  const totalPresentees = students.reduce((total, student) => {
    return (
      total +
      student.periods.reduce((count, p) => {
        return p.present ? count + 1 : count;
      }, 0)
    );
  }, 0);

  const totalAbsentees = students.reduce((total, student) => {
    return (
      total +
      student.periods.reduce((count, p) => {
        return !p.present ? count + 1 : count;
      }, 0)
    );
  }, 0);

  const getColumnTotal = (columnName) => {
    return students.reduce((total, student) => {
      const period = student.periods.find((p) => p.period === columnName);
      return period.present ? total + 1 : total;
    }, 0);
  };

  return (
    <div className="manage-students">
      <nav className="navbar">
        <div className="navbar-brand">
          <b>Manage Students</b>
        </div>
        <div className="navbar-icons">
          {!isAddStudentFormOpen && (
            <div className="navbar-icon" onClick={() => setIsAddStudentFormOpen(true)}>
              <FaUserPlus /> Add Student
            </div>
          )}
          {!isAddStudentFormOpen && (
            <div className="navbar-icon" onClick={() => setIsAddStudentFormOpen(false)}>
              <FaEdit /> Update Student
            </div>
          )}
        </div>
      </nav>
      {isAddStudentFormOpen ? (
        <div className="add-student-form-container">
          <div className="add-student-form">
            <h2>{editStudentIndex !== null ? 'Update Student' : 'Add Student'}</h2>
            <div className="form-field">
              <label htmlFor="rollNo">Roll No:</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={newStudent.rollNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
              {emailErrorMessage && <p className="error-message">{emailErrorMessage}</p>}
            </div>
            {editStudentIndex === null && (
              <div className="form-field">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newStudent.password}
                  onChange={handleInputChange}
                  required
                />
                {passwordErrorMessage && <p className="error-message">{passwordErrorMessage}</p>}
              </div>
            )}
            <div className="form-field">
              <button onClick={handleAddStudent} disabled={isUpdateButtonDisabled}>
                {editStudentIndex !== null ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="search-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>
            <select value={searchOption} onChange={handleSearchOption}>
              <option value="name">Search by Name</option>
              <option value="rollNo">Search by Roll No</option>
              <option value="present">Search by Status</option>
            </select>
          </div>

          <div className="student-list">
            <h2>Student List</h2>
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Email</th>
                  {columnNames.map((columnName) => (
                    <th key={columnName}>{columnName.toUpperCase()}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      {columnNames.map((columnName) => (
                        <td key={columnName}>
                          <span
                            className={`status ${
                              student.periods.find((p) => p.period === columnName).present
                                ? 'present'
                                : 'absent'
                            }`}
                            onClick={() => handleCheckboxChange(student.id, columnName)}
                          >
                            {student.periods.find((p) => p.period === columnName).present ? (
                              <FaCheck className="status-icon present" />
                            ) : (
                              <FaTimes className="status-icon absent" />
                            )}
                          </span>
                        </td>
                      ))}
                      <td>
                        <FaEdit
                          className="action-icon"
                          onClick={() => handleEditStudent(student.id)}
                        />
                        <FaTimes
                          className="action-icon"
                          onClick={() => handleDeleteStudent(student.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  sortedStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      {columnNames.map((columnName) => (
                        <td key={columnName}>
                          <span
                            className={`status ${
                              student.periods.find((p) => p.period === columnName).present
                                ? 'present'
                                : 'absent'
                            }`}
                            onClick={() => handleCheckboxChange(student.id, columnName)}
                          >
                            {student.periods.find((p) => p.period === columnName).present ? (
                              <FaCheck className="status-icon present" />
                            ) : (
                              <FaTimes className="status-icon absent" />
                            )}
                          </span>
                        </td>
                      ))}
                      <td>
                        <FaEdit
                          className="action-icon"
                          onClick={() => handleEditStudent(student.id)}
                        />
                        <FaTimes
                          className="action-icon"
                          onClick={() => handleDeleteStudent(student.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="totals-container">
            <table>
              <thead>
                <tr>
                  {columnNames.map((columnName) => (
                    <th key={columnName}>{columnName.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {columnNames.map((columnName) => (
                    <td key={columnName}>{getColumnTotal(columnName)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p>
              Total Presentees: {totalPresentees} | Total Absentees: {totalAbsentees}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents1;
