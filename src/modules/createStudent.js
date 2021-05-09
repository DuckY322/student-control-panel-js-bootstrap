import { calculatingTime } from "../modules/calculatingTime.js";

export const createStudent = (studentInfo) => {

    const dateOfBirth = new Date(studentInfo.dateOfBirth);
    const yearOfBirth = dateOfBirth.getFullYear();
    const monthOfBirth = dateOfBirth.getMonth() + 1 < 10 ? `0${dateOfBirth.getMonth() + 1}` : dateOfBirth.getMonth() + 1;
    const dayOfBirth = dateOfBirth.getDate() < 10 ? `0${dateOfBirth.getDate()}` : dateOfBirth.getDate();

    const course = calculatingTime(`${studentInfo.YearOfBeginningOfTraining}-09-01`) + 1;

    const studentCardTemplate = document.getElementById(`template__studentCard`).content;
    const templateCopy = document.createElement('div');
    templateCopy.append(studentCardTemplate.cloneNode(true));

    const studentName = templateCopy.querySelector(`#studentName`);
    studentName.textContent = `ФИО: ${studentInfo.FullName}`;

    const studentdateOfBirth = templateCopy.querySelector(`#studentdateOfBirth`);
    studentdateOfBirth.textContent = `Дата рождения: ${yearOfBirth}.${monthOfBirth}.${dayOfBirth} ( Возраст: ${calculatingTime(studentInfo.dateOfBirth)} )`;

    const studentYearOfBeginningOfTraining = templateCopy.querySelector(`#studentYearOfBeginningOfTraining`);
    studentYearOfBeginningOfTraining.textContent = `Годы обучения: ${studentInfo.YearOfBeginningOfTraining}-${Number(studentInfo.YearOfBeginningOfTraining) + 4} ${course <= 4 && course >= 1 ? ` ( ${course} курс )` : `( Закончил(а) )`}`;

    const studentFaculty = templateCopy.querySelector(`#studentFaculty`);
    studentFaculty.textContent = `Факультет: ${studentInfo.Faculty}`;

    return templateCopy;
}