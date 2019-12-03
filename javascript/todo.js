//let listOfTodos = [];

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
    todos.push(todoObject);

    addTodoElementToList(todoObject);
    saveTodosToLocalStorage(todos);
    
    titleTodo.value = "";
    dateTodo.value = null;
}

function addTodoElementToList(todoObject){
    //createTodoElement(titleTodoValue, dateTodoValue);
    const li = createTodoElement(todoObject);
    document.querySelector('.todoList').append(li); 
}


function createTodoElement(todoObject){
    
    const li = document.createElement('li');
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
    
    return li;
}

function removeTodo(todoObject){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
    
    //How do i make the spliceing work? SADNESSSSS!

    //todoObject = event.target.nextSibling.textContent
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

/***LOCAL STORAGE FUNCTIONS ***/

/* ------LOCAL STORAGE HELPER FUNCTIONS------ */

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