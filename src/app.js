import { Sorting } from './modules/Sorting.js';
import { sortList } from "../src/modules/sortList.js";
import { createNewStudentsList } from "../src/modules/createNewStudentsList.js";
import { createStudentForm } from "../src/modules/createStudentForm.js";
import { createSortMenu } from "../src/modules/createSortMenu.js";
import { createStudentsList } from "../src/modules/createStudentsList.js";
import { createSortMenuItem } from "../src/modules/createSortMenuItem.js";
import { createFilterItem } from "../src/modules/createFilterItem.js";
import { createStudent } from "../src/modules/createStudent.js";

export const app = () => {
    const container = document.getElementById(`student-panel`);
    const myStorage = window.localStorage;
    const dataFromStorage = JSON.parse(myStorage.getItem('table'));
    const students = dataFromStorage !== null ? dataFromStorage : [];
    let newStudentsSort = students.slice();
    let newStudentsSortFilter = [];
    let newStudentsFilter = [];
    let sortBy = '';
    const filteredBy = [];
    const filteredParameters = [
        {
            title: `По имени`,
            value: `FullName`,
            sortBy: `sortByName`,
        },
        {
            title: `По факультету`,
            value: `Faculty`,
            sortBy: `sortByFaculty`,
        },
        {
            title: `По году рождения`,
            value: `dateOfBirth`,
            sortBy: `sortByAge`,
        },
        {
            title: `По году начала обучения`,
            value: `YearOfBeginningOfTraining`,
            sortBy: `sortByYearOfBeg`,
        },
    ];
    let textFilter = '';
    let textDatafilteredBy = '';
    const filtering = () => {
        if (textFilter === '') {
            const index = filteredBy.findIndex(item => Object.keys(item)[0] === textDatafilteredBy);
            filteredBy[index][textDatafilteredBy] = null;
        } else {
            const index = filteredBy.findIndex(item => Object.keys(item)[0] === textDatafilteredBy);
            filteredBy[index][textDatafilteredBy] = textFilter;
        }

        let dataFilter = newStudentsSortFilter.length > 0 ? newStudentsSortFilter : newStudentsSort;

        newStudentsFilter = dataFilter.filter(student => {
            let result = false;
            let filterParametersCount = 0;
            let numberOfFiltersPassed = 0;

            filteredBy.forEach(item => {
                const key = Object.keys(item)[0];
                if (item[key]) {
                    filterParametersCount++;
                }
            });

            filteredBy.forEach(item => {
                const key = Object.keys(item)[0];
                if (item[key]) {
                    if (student[key].includes(item[key])) {
                        numberOfFiltersPassed++;
                        if (filterParametersCount === numberOfFiltersPassed) {
                            result = true;
                            return;
                        }
                    }
                }
            });

            return result;
        });

        if (newStudentsFilter.length > 0) {
            createNewStudentsList(studentsList, newStudentsFilter);
        } else {
            newStudentsFilter = [];
            newStudentsSortFilter = [];
            createNewStudentsList(studentsList, newStudentsSort);
        }
    }
    const handlers = [
        {
            sortByName() {
                sortBy = filteredParameters[0].value;
                const resultSorting = Sorting(students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter);
                newStudentsSort = resultSorting.newStudentsSort;
                newStudentsSortFilter = resultSorting.newStudentsSortFilter;
            },
            sortByFaculty() {
                sortBy = filteredParameters[1].value;
                const resultSorting = Sorting(students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter);
                newStudentsSort = resultSorting.newStudentsSort;
                newStudentsSortFilter = resultSorting.newStudentsSortFilter;
            },
            sortByAge() {
                sortBy = filteredParameters[2].value;
                const resultSorting = Sorting(students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter);
                newStudentsSort = resultSorting.newStudentsSort;
                newStudentsSortFilter = resultSorting.newStudentsSortFilter;
            },
            sortByYearOfBeg() {
                sortBy = filteredParameters[3].value;
                const resultSorting = Sorting(students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter);
                newStudentsSort = resultSorting.newStudentsSort;
                newStudentsSortFilter = resultSorting.newStudentsSortFilter;
            }
        },
        {
            listFiltering(text, datafilteredBy) {
                textFilter = text;
                textDatafilteredBy = datafilteredBy;
                filtering();
            }
        }
    ];
    const studentCreateForm = createStudentForm();
    const sortMenu = createSortMenu();
    const studentsList = createStudentsList();

    container.append(studentCreateForm.formTitle);
    container.append(studentCreateForm.form);
    container.append(sortMenu.dropDown);

    filteredParameters.forEach(el => {
        sortMenu.dropDownMenu.append(createSortMenuItem(handlers[0], el));
        container.append(createFilterItem(handlers[1], el));
        filteredBy.push({ [el.value]: null });
    });

    container.append(studentsList);

    students.forEach(student => {
        const studentElement = createStudent(student);
        studentsList.append(studentElement);
    });

    studentCreateForm.form.addEventListener(`submit`, function (e) {
        e.preventDefault();
        const studentObj = {
            FullName: `${studentCreateForm.inputSurname.value.trim()} ${studentCreateForm.inputFirstName.value.trim()} ${studentCreateForm.inputMiddleName.value.trim()}`,
            dateOfBirth: studentCreateForm.inputDateOfBirth.value.trim(),
            YearOfBeginningOfTraining: studentCreateForm.inputYearOfBeginningOfTraining.value.trim(),
            Faculty: studentCreateForm.inputFaculty.value.trim(),
        };

        const studentElement = createStudent(studentObj);
        studentsList.append(studentElement);
        students.push(studentObj);
        myStorage.setItem('table', JSON.stringify(students))

        studentCreateForm.form.reset();

        studentCreateForm.button.setAttribute(`disabled`, `disabled`);

        newStudentsSort.push(studentObj);
        newStudentsFilter.length > 0 ? newStudentsFilter.push(studentObj) : 0;
        const resultSorting = Sorting(students, studentsList, sortBy, newStudentsSort, newStudentsFilter, newStudentsSortFilter);
        newStudentsSort = resultSorting.newStudentsSort;
        newStudentsSortFilter = resultSorting.newStudentsSortFilter;
        filtering();
    });
}