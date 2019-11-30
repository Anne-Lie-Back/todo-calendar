let listOfTodos = [];

function addTodo(){
    const addTodoButton = document.querySelector(".addTodoButton");
    addTodoButton.addEventListener('click', showAndHideTodoInput);
    initAddTodoToList()
}


/**
 * *************SHOWING AND HIDING INPUT FIELD***************
 */
//PUT IN FUNCTION LATER!!! No locals pls
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

function hideTodoInput(inputButton, inputFieldContainer, inputField){
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

/****** PUT IN FUNCTION! NOT GLOBAL PLS (ONLY GLOBAL FOR TESTING) **/

function gatherTodoInput(){
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    
    let dateTodoValue = dateTodo.value;
    let titleTodoValue = titleTodo.value;
    
//TEACHER ADDED DISS
    //let currentDate = new Date()

    let todoObject = {}
    todoObject.title = titleTodo.value;
    todoObject.date = dateTodo.value;
   
    console.log(todoObject)
    listOfTodos.push(todoObject);
    console.log(listOfTodos)

    addTodoElementToList(titleTodoValue, dateTodoValue);

    titleTodo.value = "";
    dateTodo.value = null;
}

function addTodoElementToList(titleTodoValue, dateTodoValue){
    createTodoElement(titleTodoValue, dateTodoValue)    
}


function createTodoElement(titleTodoValue, dateTodoValue){
    const ul = document.querySelector(".todoList");
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

    ul.append(li);
    li.append(div1, div2);
    div1.append(checkbox, todoText);
    todoText.append(titleTodoValue, todoDate);
    todoDate.append(dateTodoValue, iconEdit, iconRemove);
    div2.append(iconEdit, iconRemove);

    iconRemove.addEventListener('click', removeTodo);
}


function removeTodo(){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
}