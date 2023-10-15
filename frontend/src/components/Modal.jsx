import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Modal = ({ children, closeModal, onSubmit, onCreate, isConfirm = false }) => {
    const [selectedStudents, setSelectedStudents] = useState([]);

    const students = useSelector(state => state.students.students);

    const { pathname } = useLocation();
    console.log(pathname, "path name")

    const handleStudentSelection = (studentId) => {
        setSelectedStudents((prevSelectedStudents) => {
            if (prevSelectedStudents.includes(studentId)) {
                return prevSelectedStudents.filter((id) => id !== studentId);
            } else {
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-container p-12 bg-white rounded-lg shadow-lg w-96">
                    {children}
                    {
                        students && (pathname.replace('/', '')) === 'teachers' &&
                        <div className='p-2 border mb-2'>
                            <p>Assign Student to Teacher:</p>
                            <hr className='p-2'></hr>
                            <ul className='m-2'>
                                {
                                    students.map((student) => (
                                        <li key={student.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleStudentSelection(student.id)}
                                                    checked={selectedStudents.includes(student.id)}
                                                />
                                                {`${student.name} ${student.surname}`}
                                            </label>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    }

                    <div className="flex justify-end">
                        <button
                            onClick={closeModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        {!isConfirm && <button
                            onClick={() => pathname === '/students' ? onSubmit() : onCreate(selectedStudents)}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Create
                        </button>}
                        {isConfirm && <button
                            onClick={onSubmit}
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                        >
                            Confirm
                        </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
