window.addEventListener('load', init);

function init(){
    calendarStart();
    loadTodos();
    addTodo();
    resizesTodoList();

    //
    window.addEventListener('resize', resizesTodoList);
    
    //Listens for clicks on calendar days.
    document.querySelector('.calendar-container').addEventListener('click', event => {calendarDayClicked(event);});

    //Listens for events on todo list, for when to update number of todos in calendar.
    document.querySelector('.todoContainer').addEventListener('click', event => {todoClick(event);});
 }