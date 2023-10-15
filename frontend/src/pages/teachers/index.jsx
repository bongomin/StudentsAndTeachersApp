import React, {
    useEffect,
} from 'react'
import { fetchTeachers } from '../../service/teacherService';
import TeachersTable from '../../components/TeachersTable';
import { fetchStudents } from '../../service/studentService';
import { loadStudents } from '../../store/studentSlice';
import { useDispatch } from 'react-redux';
import { loadTeachers } from '../../store/teacherSlice';

const Teachers = () => {
    const dispatch = useDispatch();

    const fetch = async () => {
        const data = await fetchTeachers();
        const studentsData = await fetchStudents();
        dispatch(loadStudents(studentsData.results))
        dispatch(loadTeachers(data.results));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetch() }, []);

    return (
        <>
            <TeachersTable />
        </>
    )
};

export default Teachers;
