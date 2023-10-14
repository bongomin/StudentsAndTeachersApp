export const validateStudent = (student) => {
    let error = {
        surname: false,
        name: false
    }
    if (!student.name) {
        error.name = true
    }
    if (!student.surname) {
        error.surname = true
    }

    return error
}