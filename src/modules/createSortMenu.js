export const createSortMenu = () => {

    const sortMenu = document.getElementById(`template__sort`).content;
    const dropDown = sortMenu.querySelector(`.dropdown`);
    const dropDownMenu = sortMenu.querySelector(`.dropdown-menu`);

    return {
        dropDown,
        dropDownMenu
    }
}