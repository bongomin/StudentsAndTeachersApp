import { configureStore } from '@reduxjs/toolkit';
import studentsSlice from './studentSlice'; // Assuming the slice is named studentsSlice
import teachersSlice from './teacherSlice';

export const store = configureStore({
    reducer: {
        students: studentsSlice.reducer,
        teachers: teachersSlice.reducer
    }
});
