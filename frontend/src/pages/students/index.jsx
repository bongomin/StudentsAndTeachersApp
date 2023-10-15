import React, {
    useEffect,
    useState,
} from 'react'
import { fetchStudents } from '../../service/studentService';
import Table from '../../components/Table';
import { useDispatch } from 'react-redux';
import { loadStudents } from '../../store/studentSlice';

const Students = () => {
    const dispatch = useDispatch();

    const fetch = async () => {
        const data = await fetchStudents();
        dispatch(loadStudents(data.results))
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetch() }, []);

    return (
        <>
            <Table />
        </>
    )
}

export default Students
