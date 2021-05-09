export const disabledFormButton = (inputs, button) => {
    inputs.forEach(item => {
        if (!item.value.trim()) {
            button.setAttribute(`disabled`, `disabled`);
            return;
        }
        button.removeAttribute(`disabled`);
    });
}