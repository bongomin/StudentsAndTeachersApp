import React, {
    useState
} from 'react';
import Modal from './Modal';
import { deleteStudent, editStudent } from '../service/studentService';
import { useDispatch, useSelector } from 'react-redux';
import { studentToUpdate } from '../store/studentSlice';

const initialValues = {
    name: '',
    surname: ''
}

function Table() {
    const [isModalVisible, setModalVisible] = useState(false);
    const students = useSelector(state => state.students.students);
    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValues);

    const [modal, setModal] = useState('');
    const [currentStudent, setCurrentStudent] = useState();

    const handleUpdateClick = (student) => {
        setValues({
            name: student.name,
            surname: student.surname
        })
        dispatch(studentToUpdate(student))
        setModalVisible(true);
        setModal('create')
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const deleteStudentFunction = (student) => {
        setModalVisible(true)
        setCurrentStudent(student)
        setModal('delete')
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleDelete = async () => {
        const data = await deleteStudent(currentStudent.id);
        console.log(data, "confirm deletion")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const updateStudentData = async () => {
        const response = await editStudent(values);
        console.log(response)
    }

    return (
        <div className="table-container p-4 my-6 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-8 dark:bg-gray-800">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Surname</th>
                        <th className="p-4">Date Created</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                {students && students.map(student => (
                    <tbody key={student.id} className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="w-4 p-4">#</td>
                            <td className="p-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                    {student.name}
                                </div>
                            </td>
                            <td className="p-4 text-base font-medium text-gray-900 dark:text-white text-center">
                                {student.surname}
                            </td>
                            <td className="p-4 text-base font-medium text-gray-900 dark:text-white text-center">
                                <span className="inline-block bg-green-200 text-green-800 rounded-full px-2 py-1">
                                    {formatDate(student.created_at)}
                                </span>
                            </td>
                            <td className="p-4 space-x-2 whitespace-nowrap text-center">
                                <button
                                    type="button"
                                    onClick={() => handleUpdateClick(student)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                        <path
                                            fillRule="evenodd"
                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteStudentFunction(student)}
                                    type="button"
                                    data-drawer-placement="right"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>))}
            </table>

            {isModalVisible && modal === 'create' && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container p-12 bg-white rounded-lg shadow-lg w-96">
                        <div className="text-xl font-semibold mb-4">Update Student</div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2">
                                Name:
                            </label>
                            <input
                                onChange={(e) => handleChange(e)}
                                name='name' value={values.name} type="text" id="name" className="border p-2" placeholder="Enter name" />
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="surname" className="mb-2">
                                Surname:
                            </label>
                            <input
                                onChange={(e) => handleChange(e)}
                                name='surname' value={values.surname} type="text" id="surname" className="border p-2" placeholder="Enter surname" />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateStudentData}
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                            >
                                Update 
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                isModalVisible && modal === 'delete' ? (
                    <Modal closeModal={closeModal} onSubmit={handleDelete} isConfirm={true}>
                        <p>Confirm Delete</p>
                    </Modal>
                ) : null
            }
        </div>

    );
}

export default Table;
