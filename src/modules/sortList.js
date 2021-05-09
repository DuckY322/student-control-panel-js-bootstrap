import { createNewStudentsList } from "../modules/createNewStudentsList.js";

export const sortList = (students, studentsList, parameter) => {
    let newStudentsSort = students.slice();
    newStudentsSort.sort((prev, next) => {
        if (prev[parameter] < next[parameter]) return -1;
        if (prev[parameter] < next[parameter]) return 1;
    });

    createNewStudentsList(studentsList, newStudentsSort)

    return newStudentsSort;
}