window.addEventListener('load', init);

/**
 * The fist starter function that starts all other script starter functions.
 */
function init(){
    calendarStart();
    loadTodos();
    addTodo();
    resizesTodoList();

    //Listens for resize event to calculate height of todo list.
    window.addEventListener('resize', resizesTodoList);
    
    //Listens for clicks on calendar days.
    document.querySelector('.calendar-container').addEventListener('click', event => {calendarDayClicked(event);});

    //Listens for events on todo list, for when to update number of todos in calendar.
    document.querySelector('.todoContainer').addEventListener('click', event => {todoClick(event);});
 }