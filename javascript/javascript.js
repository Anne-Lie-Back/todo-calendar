/**
 * triggers init-function when window is loaded
 */
window.addEventListener('load', init);

/**
 * initiates functions when window is loaded.
 */
function init(){
    calendarStart();
    loadTodos();
    addTodo();
    resizesTodoList();
    window.addEventListener('resize', resizesTodoList);
}

