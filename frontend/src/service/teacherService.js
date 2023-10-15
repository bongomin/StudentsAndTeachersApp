import { AxiosInstance, baseURL } from "./axios"

export const fetchTeachers = async () => {
    try {
        const response = await AxiosInstance.get(`${baseURL}teachers/`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const addTeachers = async (body) => {
    try {
        const response = await AxiosInstance.post(`${baseURL}teachers/`, body);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const deleteTeachers = async (id) => {
    try {
        const response = await AxiosInstance.delete(`${baseURL}teachers/${id}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};

export const editTeachers = async (body) => {
    try {
        const response = await AxiosInstance.put(`${baseURL}teachers/${body.id}, body`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};