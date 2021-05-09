export const createSortMenuItem = (handlers, parameters) => {
    const item = document.createElement(`a`);
    item.classList.add(`dropdown-item`);
    item.href = `#`;
    item.textContent = parameters.title;

    item.addEventListener(`click`, handlers[parameters.sortBy]);

    return item;
}