import { AxiosInstance, baseURL } from "./axios"

export const fetchStudents = async () => {
    try {
        const response = await AxiosInstance.get(`${baseURL}students/`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const addStudent = async (body) => {
    try {
        const response = await AxiosInstance.post(`${baseURL}students/`, body);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await AxiosInstance.delete(`${baseURL}students/${id}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const editStudent = async (body) => {
    try {
        const response = await AxiosInstance.update(`${baseURL}students/${body.id}, body`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};