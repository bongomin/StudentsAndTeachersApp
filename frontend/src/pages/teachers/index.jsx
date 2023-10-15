import React, {
    useEffect,
    useState
} from 'react'
import { fetchTeachers } from '../../service/teacherService';
import TeachersTable from '../../components/TeachersTable';

const Teachers = () => {
    const [teachers, setTeachers] = useState();
    const fetch = async () => {
        const data = await fetchTeachers();
        setTeachers(data.results);
    }

    useEffect(() => { fetch() }, []);

    return (
        <><TeachersTable teachers={teachers} />
        </>
    )
};

export default Teachers;
