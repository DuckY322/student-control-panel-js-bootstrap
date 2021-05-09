import { sortList } from './sortList.js';

export const Sorting = (students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter) => {
    newStudentsSort = sortList(students, studentsList, sortBy).slice();
    if (newStudentsFilter.length > 0) {
        newStudentsSortFilter = sortList(newStudentsFilter, studentsList, sortBy).slice();
    }

    return {
        newStudentsSort,
        newStudentsSortFilter,
    }
}