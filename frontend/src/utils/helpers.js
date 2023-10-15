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

export const filterStuddents = (studentIds, students) => {
    const data = students.filter(student => studentIds.includes(student.id));
    console.log(data, "each teacher")
    return data;
}