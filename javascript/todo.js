/**
 * Handles the add-todo-button
 */
function addTodo(){
    const addTodoButton = document.querySelector(".addTodoButton");
    addTodoButton.addEventListener('click', showAndHideTodoInput);
    initAddTodoToList();
}

/**
 * *************SHOWING AND HIDING INPUT FIELD***************
 */

/**
 * @type {Boolean} inputShown - If inputShown is true, the inputfield is visable.
 */
let inputShown = false;

/**
 * Handles what happens when the add-todo-button is clicked, depending on of input-field is shown or not. 
 * It also gets some HTMLelement and declares them to a variable.
 */
function showAndHideTodoInput(){
    const inputFieldContainer = document.querySelector(".slideInputText");
    const inputField = document.querySelector(".hideInputText");
    const inputButton = document.querySelector(".addTodoButton i");
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    
    if (inputShown){
        hideTodoInput(inputButton, inputFieldContainer, inputField);
        inputShown = false;
    }
    else{
        showTodoInput(inputButton, inputFieldContainer, inputField);
        inputShown = true;
        if(!editTodoChosen){
            titleTodo.value = "";
            dateTodo.value = null;
        }
    }
}

/**
 * Hides input field
 * @param {Element} inputButton - submits input
 * @param {Element} inputFieldContainer - the container of input-elements
 */
function hideTodoInput(inputButton, inputFieldContainer){
    inputButton.className = "fas fa-plus";
    inputFieldContainer.style.height = "2.5rem";
    editTodoChosen = false;
}

/**
 * Makes the input-field visible and changes add-todo button-icon
 * @param {Element} inputButton  - submits input
 * @param {Element} inputFieldContainer - the container of input elements
 * @param {Element} inputField - input elements
 */
function showTodoInput (inputButton, inputFieldContainer, inputField){
    inputButton.className = "fas fa-times";
    inputFieldContainer.style.height = "15rem";
    inputField.style.display = "flex";
    
}

/***
 * ************ ACTUALLY ADDING TODO ********
 */

/**
 * @type {Boolean} editTodoChosen - if true, user has clicked the edit-icon and chosen to edit todo.
 */
let editTodoChosen = false;

/**
 * Sets an eventlistener to butten that gathers the user input.
 */
function initAddTodoToList(){
    const addWrittenTodo = document.querySelector("#addWrittenTodo");
    addWrittenTodo.addEventListener('click', gatherTodoInput);

}

/**
 * Declares the todoObject. Gathers and handles the user input in todo-field. 
 * Handles if the user has chosen to edit or to add todo and resets input fields after the user has submitted input.
 * if editTodoIsCHosen is true, then it updates the targeted todo, removes all the li-elements and loads a new updated todo-list.
 */
function gatherTodoInput(){
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");

    let todoObject = {
        "title": titleTodo.value,
        "date": dateTodo.value
        }

    const todos = getTodosFromLocalStorage();
    if(!editTodoChosen){

    todos.push(todoObject);
    addTodoElementToList(todoObject);
    saveTodosToLocalStorage(todos);
    }

    else{
        updateEditTodo(todoObject)
        editTodoChosen = false;
        const inputFieldContainer = document.querySelector(".slideInputText");
        inputFieldContainer.style.height = "2.5rem";
        const inputButton = document.querySelector(".addTodoButton i");
        inputButton.className = "fas fa-plus";
        inputShown = false;
        
        let ul = document.querySelector('ul');

        while( ul.firstChild ){
            ul.removeChild(ul.firstChild );
        }
        
        loadTodos();
    }
    
    titleTodo.value = "";
    dateTodo.value = null;
}

/**
 * send todoObject to function that creates li-elements and appends the created li to todo-ul.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input.
 */
function addTodoElementToList(todoObject){
    const li = createTodoElement(todoObject);
    document.querySelector('.todoList').append(li); 
}

/**
 * Creates li-element with user's input.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input.
 * @returns{HTMLLIElement} li - the created li-element.
 */
function createTodoElement(todoObject){
    
    const li = document.createElement('li');
    li.setAttribute("class", ".todoListItem");
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute("class", "fas fa-pen editTodoIcon");
    const iconRemove = document.createElement('i');
    iconRemove.setAttribute("class", "fas fa-minus-circle removeTodoIcon")
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const todoText = document.createElement('p');
    const todoDate = document.createElement('span');

    li.append(div1, div2);
    div1.append(checkbox, todoText);
    todoText.setAttribute("class", "maximizeTextInTodo");
    todoText.append(todoObject.title, todoDate);
    todoDate.append(todoObject.date, iconEdit, iconRemove);
    div2.append(iconEdit, iconRemove);
    
    iconRemove.addEventListener('click', function() { removeTodo(todoObject) });
    iconEdit.addEventListener('click', function(){editTodo(todoObject)});
    
    return li;
}

/****** EDIT TODO FUNCTIONS ****/

/**
 * Calls function that find position for selected "old" todo, shows input-field with old todo-values.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input. 
 */

function editTodo(todoObject){
    let index = -1;
    searchPositionForTodo(index, todoObject);
    showAndHideTodoInput();
    editTodoChosen = true;
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    titleTodo.value = todoObject.title;
    dateTodo.value = todoObject.date;
}

/**
 * Finds the position of the todo and returns it
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input. 
 * @returns {number} i - index
 */
function searchPositionForTodo(i, todoObject){
    const todos = getTodosFromLocalStorage();
    
    for (let i = 0; i < todos.length; i++) {
        const storedTodo = todos[i];
        if(storedTodo.title == todoObject.title){
            index = i;
            break;
        }
    }
    return i
}

/**
 * Changes the old todo to the new one and sends it to be saved in local storage.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input.  
 */
function updateEditTodo(todoObject){
    const todos = getTodosFromLocalStorage();
    todos.splice(index, 1, todoObject);
    saveTodosToLocalStorage(todos);
}


/*** REMOVE TODO FUNCTIONS */

/**
 * removes the targeted li-element and triggers remove targeted todo from local storage.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input. 
 */
function removeTodo(todoObject){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
    removeTodoFromLocalStorage(todoObject);
}

/**
 * removes the selected todo from local storage and sends the new list to be saved in local storage.
 * @param {Object} todoObject - contains TITLE of todo-input and DATE of todo-input. 
 */
function removeTodoFromLocalStorage(todoObject){
   
    const todos = getTodosFromLocalStorage();
    let index = -1;
    for (let i = 0; i < todos.length; i++) {
        const storedTodo = todos[i];
        if(storedTodo.title == todoObject.title && todoObject.date){
            index = i;
            break;
        }
    }
    todos.splice(index, 1);
    saveTodosToLocalStorage(todos);
}

/***LOCAL STORAGE FUNCTIONS ***/

/**
 * loads the todo from local storage, iterates needed li-elements and appends them to the ul-element todoList.
 */
function loadTodos() {
    const ul = document.querySelector('.todoList');
    const todos = getTodosFromLocalStorage();

    for (const todo of todos) {
        const li = createTodoElement(todo);
        ul.append(li);
    }
}

/**
 * Access the todos from local storage
 * @returns {Array<String>} todoObject with title and date
 */
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

/**
 * Saves all todos to local storage
 * @param {Array<String>} todos list of todoObjects to be stored
 */

function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * Resizes todolist.
 */
function resizesTodoList() {
    const todoList = document.querySelector(".todoList");
    if(window.innerWidth > 720){
        let setTodoListHeight = String(window.innerHeight - 325) + "px";
        todoList.style.height = setTodoListHeight;
    } else {
        let setTodoListHeight = String(window.innerHeight - 232) + "px";
        todoList.style.height = setTodoListHeight;
    }
}