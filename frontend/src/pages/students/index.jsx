import React, {
    useEffect,
    useState,
} from 'react'
import { fetchStudents } from '../../service/studentService';
import { StudentContext } from '../../context/StudentContext';
import Table from '../../components/Table';

const Students = () => {
    const [students, setStudents] = useState();

    const fetch = async () => {
        const data = await fetchStudents();
        setStudents(data.results);
    };

    useEffect(() => { fetch() }, []);

    return (
        <>
            <StudentContext.Provider value={{ students, setStudents }}>
                <Table />
            </StudentContext.Provider>

        </>
    )
}

export default Students
