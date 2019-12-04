
function addTodo(){
    const addTodoButton = document.querySelector(".addTodoButton");
    addTodoButton.addEventListener('click', showAndHideTodoInput);
    initAddTodoToList()
}

/**
 * *************SHOWING AND HIDING INPUT FIELD***************
 */

let inputShown = false;

function showAndHideTodoInput(){
    const inputFieldContainer = document.querySelector(".slideInputText");
    const inputField = document.querySelector(".hideInputText");
    const inputButton = document.querySelector(".addTodoButton i");
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    
    if (inputShown){
        hideTodoInput(inputButton, inputFieldContainer, inputField)
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

function hideTodoInput(inputButton, inputFieldContainer){
    inputButton.className = "fas fa-plus";
    inputFieldContainer.style.height = "2.5rem";
    editTodoChosen = false;
}

function showTodoInput (inputButton, inputFieldContainer, inputField){
    inputButton.className = "fas fa-times";
    inputFieldContainer.style.height = "15rem";
    inputField.style.display = "flex";
    
}

/***
 * ************ ACTUALLY ADDING TODO ********
 */
let editTodoChosen = false;

function initAddTodoToList(){
    const addWrittenTodo = document.querySelector("#addWrittenTodo");
    addWrittenTodo.addEventListener('click', gatherTodoInput);

}

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
        
        let ul = document.querySelector('ul')
        while( ul.firstChild ){
            ul.removeChild(ul.firstChild );
        }
        
        loadTodos();
    }
    
    titleTodo.value = "";
    dateTodo.value = null;
}

function addTodoElementToList(todoObject){
    const li = createTodoElement(todoObject);
    document.querySelector('.todoList').append(li); 
}


function createTodoElement(todoObject){
    
    const li = document.createElement('li');
    li.setAttribute("class", ".todoListItem")
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute("class", "fas fa-pen editTodoIcon");
    const iconRemove = document.createElement('i')
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
    
    iconRemove.addEventListener('click', function() { removeTodo(todoObject) })
    iconEdit.addEventListener('click', function(){editTodo(todoObject)})
    
    return li;
}

/****** EDIT TODO FUNCTIONS ****/

function editTodo(todoObject){
    let index = -1
    searchPositionForTodo(index, todoObject)
    showAndHideTodoInput()
    editTodoChosen = true;
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    titleTodo.value = todoObject.title;
    dateTodo.value = todoObject.date;
}

function searchPositionForTodo(i, todoObject){
    const todos = getTodosFromLocalStorage()
    // Remove the todo from the list 
    for (let i = 0; i < todos.length; i++) {
        const storedTodo = todos[i];
        if(storedTodo.title == todoObject.title){
            index = i;
            break
        }
    }
    return i
}

function updateEditTodo(todoObject){
    const todos = getTodosFromLocalStorage()
    todos.splice(index, 1, todoObject)
    console.log(todos)
    // Save the update todos list to storage
    saveTodosToLocalStorage(todos);
}


/*** REMOVE TODO FUNCTIONS */

function removeTodo(todoObject){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
    removeTodoFromLocalStorage(todoObject)
}

function removeTodoFromLocalStorage(todoObject){
    // Get all saved todos from storage
   
    const todos = getTodosFromLocalStorage()
    // Remove the todo from the list
    let index = -1
    for (let i = 0; i < todos.length; i++) {
        const storedTodo = todos[i];
        if(storedTodo.title == todoObject.title && todoObject.date){
            index = i;
            break
        }
    }

    //DOESN*T SPLICE AS WANTED!
    todos.splice(index, 1)
    
    // Save the update todos list to storage
    saveTodosToLocalStorage(todos)
}

/***LOCAL STORAGE FUNCTIONS ***/

function loadTodos() {
    // Get the DOM ul element and list of todos
    const ul = document.querySelector('.todoList')
    const todos = getTodosFromLocalStorage()

    // Iterate over each todo and add it to the DOM
    for (const todo of todos) {
        const li = createTodoElement(todo)
        ul.append(li)
    }
}

/**
 * Access the todos from local storage
 * @returns {Array<String>} list of todos
 */
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || []
    
}

/**
 * Save all todos to local storage
 * @param {Array<String>} todos list of todos to be stored
 */

function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}



//resizes todo list
window.addEventListener('resize', resizesTodoList)

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