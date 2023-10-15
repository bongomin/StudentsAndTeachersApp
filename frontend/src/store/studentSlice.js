// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    students: [],
    student: {}
};

const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        loadStudents: (state, { payload }) => {
            state.students = payload;
        },
        newStudent: (state, { payload }) => {
            state.students.unshift(payload);
        },
        removeStudent: (state, { payload }) => {
            state.students = state.students.filter(student => student.id !== payload.id)
        },
        studentToUpdate: (state, { payload }) => {
            state.student = payload;
        },
        updatedStudent: (state, { payload }) => {
            state.students = state.students.map(
                student => student.id === payload.id ? payload : student
            )
        }
    }
});

export const { loadStudents, newStudent, removeStudent, studentToUpdate, updatedStudent } = studentsSlice.actions;
export default studentsSlice; 
