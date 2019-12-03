let listOfTodos = [getTodosFromLocalStorage];
console.log(listOfTodos)

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
    
    if (inputShown){
        hideTodoInput(inputButton, inputFieldContainer, inputField)
        inputShown = false;
    }
    else{
        showTodoInput(inputButton, inputFieldContainer, inputField);
        inputShown = true;
    }
}

function hideTodoInput(inputButton, inputFieldContainer){
    inputButton.className = "fas fa-plus";
    inputFieldContainer.style.height = "2.5rem";
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
    
//TEACHER ADDED DISS
    //let currentDate = new Date()

    let todoObject = {
        "title": titleTodo.value,
        "date": dateTodo.value
        }
/*     let todoObject = {};
    todoObject.title = titleTodo.value;
    todoObject.date = dateTodo.value; */
   
    //console.log(todoObject);
    //listOfTodos.push(todoObject);
    //console.log(listOfTodos);

    const todos = getTodosFromLocalStorage();
    if(!editTodoChosen){

    listOfTodos.push(todoObject);
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



function editTodo(todoObject){
    let index = -1
    searchPositionForTodo(index, todoObject)
    showAndHideTodoInput()
    editTodoChosen = true;
    console.log
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    titleTodo.value = todoObject.title;
    dateTodo.value = todoObject.date;
}

function searchPositionForTodo(i, todoObject){
    const todos = getTodosFromLocalStorage()
    console.log(todoObject)
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


function addTodoElementToList(todoObject){
    //createTodoElement(titleTodoValue, dateTodoValue);
    const li = createTodoElement(todoObject);
    document.querySelector('.todoList').append(li); 
}


function createTodoElement(todoObject){
    
    const li = document.createElement('li');
    li.setAttribute("class", ".todoListItem")
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute("class", "fas fa-ellipsis-h editTodoIcon");
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

function removeTodo(todoObject){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
    removeTodoFromLocalStorage(todoObject)
}

function removeTodoFromLocalStorage(todoObject){
    // Get all saved todos from storage
   
    const todos = getTodosFromLocalStorage()
    console.log(todoObject)
    // Remove the todo from the list
    let index = -1
    for (let i = 0; i < todos.length; i++) {
        const storedTodo = todos[i];
        if(storedTodo.title == todoObject.title){
            index = i;
            break
        }
    }

    console.log(index);
    //DOESN*T SPLICE AS WANTED!
    todos.splice(index, 1)
    console.log(todos)
    // Save the update todos list to storage
    saveTodosToLocalStorage(todos)
}

/****** EDIT TODO FUNCTIONS ****/





/*     const editDiv = document.createElement('div');
    const lineBreak = document.createElement('br');
    editDiv.setAttribute("class", "editDiv");
    const divTitle = document.createElement('div');
    const divDateAndConfirm = document.createElement('div');
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    const inputDate = document.createElement('input');
    inputDate.type = 'date';

    const iconConfirm = document.createElement('i');
    iconConfirm.setAttribute("class", "fas fa-check");
    li.append(lineBreak);
    lineBreak.append(editDiv);
    editDiv.append(divTitle, divDateAndConfirm);
    divTitle.append(inputTitle);
    divDateAndConfirm.append(inputDate, iconConfirm);
    console.log('show editable inputfield')
    showEditDiv()

    if (showEditTodo){
        editDiv.style.height = 'none';
        showEditTodo = false;
        console.log(showEditTodo)
    }

    else{
        editDiv.style.display = 'flex';
        showEditTodo = true;
        console.log(showEditTodo)
    }
    return li; */

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



