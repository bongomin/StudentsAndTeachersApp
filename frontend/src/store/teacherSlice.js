// teacherslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teachers: [],
    teacher: {}
};

const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        loadTeachers: (state, { payload }) => {
            state.teachers = payload;
        },
        newTeacher: (state, { payload }) => {
            console.log(payload, "teacher payload")
            state.teachers.unshift(payload);
        },
        removeTeacher: (state, { payload }) => {
            state.teachers = state.teachers.filter(teacher => teacher.id !== payload)
        },
        teacherToUpdate: (state, {payload}) => {
            state.teacher = payload;
        }
    }
});

export const { loadTeachers, newTeacher, removeTeacher, teacherToUpdate } = teachersSlice.actions;
export default teachersSlice; 
