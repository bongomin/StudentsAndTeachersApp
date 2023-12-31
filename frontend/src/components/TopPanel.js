import React, {
    useEffect,
    useState
} from 'react';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import { validateStudent } from '../utils/helpers';
import { toast } from 'react-toastify';
import { addStudent } from '../service/studentService';
import { addTeachers } from '../service/teacherService';
import { useDispatch } from 'react-redux';
import { newTeacher } from '../store/teacherSlice';
import { newStudent } from '../store/studentSlice';

function TopPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [path, setPath] = useState('');
    const [values, setValues] = useState({});
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const { pathname } = useLocation();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value })
    };

    const closeModal = () => { setIsModalOpen(false); };

    useEffect(() => {
        setPath(pathname.replace('/', ''))
    }, [pathname]);

    const createStudent = async () => {
        const error = validateStudent(values);
        if (error.name) toast.error("name is required")
        if (error.surname) toast.error("surname is required")
        if (!error.name && !error.surname) {
            const data = await addStudent(values);
            dispatch(newStudent(data));
            toast.success(`${data.name} successfuly added`)
            closeModal()
        }
    }

    const createTeacher = async (selectedStudents) => {
        const data = {
            name,
            students: selectedStudents
        }

        const response = await addTeachers(data);
        closeModal()
        toast.success(`Teacher ${response.name} created successfuly`)
        dispatch(newTeacher(response))
    }

    return (
        <div className="flex justify-between items-center p-2 my-6 mx-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 xl:p-4">
            <div className="flex items-center">
                <div className="mr-2 font-bold text-xl">{path}</div>
            </div>
            <div className="flex items-center">
                <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white p-2 rounded" onClick={openModal}>
                    <div className="mr-2" style={{ cursor: 'pointer' }}>
                        Create {path}
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ cursor: 'pointer' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>

            </div>
            {isModalOpen && (path === 'students') && (
                <Modal closeModal={closeModal}
                    onSubmit={createStudent}>
                    <div className="text-2xl font-semibold mb-4">Create Student</div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="mb-2">
                            Name:
                        </label>
                        <input onChange={e => handleChange(e)} name='name' type="text" id="name" className="border p-2" placeholder="Enter name" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="surname" className="mb-2">
                            Surname:
                        </label>
                        <input onChange={e => handleChange(e)} name='surname' type="text" id="surname" className="border p-2" placeholder="Enter surname" />
                    </div>
                </Modal>
            )}
            {isModalOpen && path === 'teachers' && (
                <Modal closeModal={closeModal} onCreate={createTeacher}>
                    <div className="text-xl font-semibold mb-4">Create Teacher</div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="mb-2">
                            Name:
                        </label>
                        <input
                            onChange={e => setName(e.target.value)}
                            type="text"
                            id="name"
                            className="border p-2"
                            placeholder="Enter name" />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default TopPanel;
