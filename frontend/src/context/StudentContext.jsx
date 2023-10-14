import { createContext } from "react";

const initialState = {
    students: [],
    setStudents: () => { }
}

export const StudentContext = createContext(initialState);
