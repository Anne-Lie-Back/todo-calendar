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
    const inputField = document.querySelector(".slideInputText");
    const inputDates = document.querySelector(".hideInputText");
    const inputButton = document.querySelector(".addTodoButton i");
    
    if (inputShown){
        hideTodoInput(inputButton, inputField, inputDates)
        inputShown = false;
    }

    else{
        showTodoInput(inputButton, inputField, inputDates);
        inputShown = true;
    }
}

function hideTodoInput(inputButton, inputField, inputDates){
    inputButton.className = "fas fa-plus";
    inputField.style.height = "2.5rem";

}

function showTodoInput (inputButton, inputField, inputDates){

    inputButton.className = "fas fa-times";
    inputField.style.height = "15rem";
    inputDates.style.display = "flex";
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
    const monthTodo = document.querySelector("#inputMonth");
    const titleTodo = document.querySelector("#titleTodo");
    const dateTodo = document.querySelector("#inputDate");
    
    let dateTodoValue = dateTodo.value;
    let titleTodoValue = titleTodo.value;
    let monthTodoValue = monthTodo.value;
    
//TEACHER ADDED DISS
    //let currentDate = new Date()


    let todoObject = {}
    todoObject.title = titleTodo.value;
    todoObject.day = dateTodo.value;
    todoObject.month = monthTodo.value;
    console.log(todoObject)
    listOfTodos.push(todoObject);
    console.log(listOfTodos)
    //console.log(titleTodoValue, dateTodoValue, monthTodoValue);
    addTodoElementToList(titleTodoValue, dateTodoValue, monthTodoValue);

    titleTodo.value = "";
    //Why not reseted to 1?
    dateTodo.value = "1";
    monthTodo.value ="Januari";
}

function addTodoElementToList(titleTodoValue, dateTodoValue, monthTodoValue){
    createTodoElement(titleTodoValue, dateTodoValue, monthTodoValue)    
}


function createTodoElement(titleTodoValue, dateTodoValue, monthTodoValue){
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
    todoDate.append(dateTodoValue, monthTodoValue, iconEdit, iconRemove);
    div2.append(iconEdit, iconRemove);

   iconRemove.addEventListener('click', removeTodo);
}


function removeTodo(){
    let doneTodo = event.target.closest('li');
    doneTodo.remove();
 
}

/**SHOWING RIGHT DATE - INPUT VALUES IN SELECTION **/





