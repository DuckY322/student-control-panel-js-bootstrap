import { disabledFormButton } from "../modules/disabledFormButton.js";

export const createStudentForm = () => {
    const dateNow = new Date();
    const dateNowYear = dateNow.getFullYear();
    const dateNowMonth = dateNow.getMonth() + 1 < 10 ? `0${dateNow.getMonth() + 1}` : dateNow.getMonth() + 1;
    const dateNowDay = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();

    const formTemplate = document.getElementById(`template__form`).content;

    const formTitle = formTemplate.getElementById(`form__title`);

    const form = formTemplate.getElementById(`form`);

    const inputFirstName = form.querySelector(`#inputFirstName`);
    const inputSurname = form.querySelector(`#inputSurname`);
    const inputMiddleName = form.querySelector(`#inputMiddleName`);

    const inputDateOfBirth = form.querySelector(`#inputDateOfBirth`);
    inputDateOfBirth.max = `${dateNowYear}-${dateNowMonth}-${dateNowDay}`;

    const inputYearOfBeginningOfTraining = form.querySelector(`#inputYearOfBeginningOfTraining`);
    inputYearOfBeginningOfTraining.max = dateNowYear;

    const inputFaculty = form.querySelector(`#inputFaculty`);

    const button = form.querySelector(`#form__button`);
    button.type = `submit`;

    const inputs = form.querySelectorAll(`.form-control`);

    inputs.forEach(item => {
        item.oninput = function () {
            disabledFormButton(inputs, button);
        }
    });

    return {
        formTitle,
        form,
        inputFirstName,
        inputSurname,
        inputMiddleName,
        inputDateOfBirth,
        inputYearOfBeginningOfTraining,
        inputFaculty,
        button,
    };
};