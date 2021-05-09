import { createStudent } from "../modules/createStudent.js";

export const createNewStudentsList = (studentsList, newStudents) => {
    studentsList.innerHTML = ``;
    newStudents.forEach(student => {
        const studentElement = createStudent(student);
        studentsList.append(studentElement);
    });
}