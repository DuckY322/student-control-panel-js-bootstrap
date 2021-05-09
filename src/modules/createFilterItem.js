export const createFilterItem = (handlers, parameters) => {

    const filterInputTemplate = document.getElementById(`template__filterItem`).content;
    const templateCopy = document.createElement('div');
    templateCopy.append(filterInputTemplate.cloneNode(true));

    const inputGroup = templateCopy.querySelector(`.input-group`);

    const inputGroupText = inputGroup.querySelector(`.input-group-text`);
    inputGroupText.textContent = parameters.title;

    const input = inputGroup.querySelector(`.form-control`);
    input.oninput = function () {
        handlers.listFiltering(input.value, parameters.value);
    }

    return inputGroup;
};