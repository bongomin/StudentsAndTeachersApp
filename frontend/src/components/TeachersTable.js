import React, { useEffect, useState } from 'react';
import { filterStuddents } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeachers } from '../service/teacherService';
import { removeTeacher, teacherToUpdate } from '../store/teacherSlice';
import { useLocation } from 'react-router-dom';

function TeachersTable() {
    const { teachers } = useSelector(state => state.teachers);
    const students = useSelector(state => state.students.students);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState({});
    const [name, setName] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    const { pathname } = useLocation();

    const [modal, setModal] = useState('');

    const dispatch = useDispatch();

    const deleteTeacher = async (teacher) => {
        const response = await deleteTeachers(teacher.id);
        dispatch(removeTeacher(teacher.id))
        console.log(response, "response data!!");
    }

    const updateTeacher = async (teacher) => {
        setCurrentTeacher(teacher)
        dispatch(teacherToUpdate(teacher))
        setName(teacher.name)
        setModalVisible(true);
        setModal('create')
    }

    const handleClose = () => {
        setModalVisible(false);
        setModal('')
    };

    const handleStudentSelection = (studentId) => {
        setSelectedStudents((prevSelectedStudents) => {
            if (prevSelectedStudents.includes(studentId)) {
                return prevSelectedStudents.filter((id) => id !== studentId);
            } else {
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    useEffect(() => {
        if(currentTeacher.students && currentTeacher.students.length > 0){
            setSelectedStudents(currentTeacher?.students)
        }
    }, [currentTeacher])

    return (
        <div className="container mx-auto p-6">
            {teachers && teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <table className="w-full">
                        <thead>
                            <tr className='text-center'>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center border'>
                                <td className="p-2 font-semibold text-gray-900 text-left">{teacher.name}</td>
                                <td className="p-4 space-x-2 text-right">
                                    <button
                                        onClick={() => updateTeacher(teacher)}
                                        className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteTeacher(teacher)}
                                        className="px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-lg font-semibold mt-2 mb-2">Associated Students</div>
                    <div className="space-y-2">
                        {teacher.students.length > 0 ? (
                            (filterStuddents(teacher.students, students)).map((student) => (
                                <div
                                    key={student.id}
                                    className="bg-gray-100 p-4 rounded-lg"
                                >
                                    <div>
                                        <strong>ID:</strong> {student.id}
                                    </div>
                                    <div>
                                        <strong>Name:</strong> {student.name}
                                    </div>
                                    <div>
                                        <strong>Surname:</strong> {student.surname}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No students</div>
                        )}
                    </div>
                </div>
            ))}
            {isModalVisible && modal === 'create' && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container p-12 bg-white rounded-lg shadow-lg w-96">
                        <div className="text-xl font-semibold mb-4">Update Student</div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2">
                                Name:
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                name='name' value={name} type="text" id="name" className="border p-2" placeholder="Enter name" />
                            {
                                students && (pathname.replace('/', '')) === 'teachers' &&
                                <div className='p-2 border mb-'>
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
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleClose}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default TeachersTable;
