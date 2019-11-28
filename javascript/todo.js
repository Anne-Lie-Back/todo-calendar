function addTodo(){
    const addTodoButton = document.querySelector(".addTodoButton");
    addTodoButton.addEventListener('click', showAndHideTodoInput);
    console.log('todo is STARTED');
    initAddTodoToList()
}


/**
 * *************SHOWING AND HIDEING INPUT FIELD***************
 */
//PUT IN FUNCTION LATER!!!
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
    //inputField.style.display = "flex";
    inputField.style.height = "0";
    inputDates.style.display = "none";
    console.log('closed');
}

function showTodoInput (inputButton, inputField, inputDates){

    inputButton.className = "fas fa-times";
    //inputField.style.display = "flex";
    inputField.style.height = "30rem";
    inputDates.style.display = "flex";
    console.log('visable');
}

/***
 * ************ ACTUALLY ADDING TODO ********
 */

function initAddTodoToList(){
    const addWrittenTodo = document.querySelector("#addWrittenTodo");
    addWrittenTodo.addEventListener('click', gatherTodoInput);
}

function gatherTodoInput(){
 
    let titleTodo = document.querySelector("#titleTodo");
    let dateTodo = document.querySelector("#inputDate");
    let monthTodo = document.querySelector("#inputMonth");
    let titleTodoValue = titleTodo.value + "";
    let dateTodoValue = dateTodo.value;
    let monthTodoValue = monthTodo.value;
    console.log(titleTodo.value, dateTodo.value, monthTodo.value);
    addTodoElementToList(titleTodoValue, dateTodoValue, monthTodoValue)
    showAndHideTodoInput()
}

function addTodoElementToList(titleTodoValue, dateTodoValue, monthTodoValue){
    createTodoElement(titleTodoValue, dateTodoValue, monthTodoValue)
    
}


function createTodoElement(titleTodoValue, dateTodoValue, monthTodoValue){
    console.log(titleTodoValue, dateTodoValue)

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
