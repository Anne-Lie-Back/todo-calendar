window.addEventListener('load', init);

function init(){
    calendarStart();
    loadTodos();
    addTodo();
    resizesTodoList();
    window.addEventListener('resize', resizesTodoList);
}