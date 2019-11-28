function addTodo(){
    const showInput = document.querySelector(".addTodoButton");
    showInput.addEventListener('click', showTodoInput);
    console.log('todo is STARTED');
    
}

function showTodoInput (){

    const inputField = document.querySelector(".slideInputText");
    const inputDates = document.querySelector(".hideInputText");
    //inputField.style.display = "flex";
    inputField.style.height = "80%";
    inputDates.style.display = "flex";


    
    console.log('input showed!');

}