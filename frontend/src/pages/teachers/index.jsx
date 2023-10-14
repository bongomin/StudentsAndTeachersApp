import React, {
    useEffect,
    useState
} from 'react'
import { fetchTeachers } from '../../service/teacherService';

const Teachers = () => {
    const [teachers, setTeachers] = useState();
    const fetch = async () => {
        const data = await fetchTeachers();
        setTeachers(data.results);
    }

    useEffect(() => { fetch() }, []);

    return (
        <div>
            test
            {
                teachers && teachers?.map((teacher) => (
                    <div key={teacher.id}>
                        <p>{teacher.name}</p>
                    </div>
                ))
            }
        </div>
    )
};

export default Teachers;
