document.querySelector('.calendar-container').addEventListener('click', event => {calendarDayClicked(event);});

//clicked. send to todo list.
function calendarDayClicked(event){
    if(event.target.className === 'calendar-day' || event.target.className === 'calendar-day holiday'){
        //console.log(event.target.id);
        addZeroDateFunc(event.target.id);

    }
    else{
        //console.log(event.target.className);
        //console.log(event.target.parentElement.id + ' parent');
    }

    if(event.target.parentElement.className === 'calendar-day' || event.target.parentElement.className === 'calendar-day holiday'){
        //console.log(event.target.parentElement.id + 'parent')
        addZeroDateFunc(event.target.parentElement.id);
    }
    else{
        //console.log(event.target.parentElement.id);
    }

}

function addZeroDateFunc(eventID){
    clickedDayObject.year = currentViewYear;
    clickedDayObject.month = currentViewMonth+1; // zero is january, 11 is december.
    clickedDayObject.day = Number(eventID); //day of month.
    let clickedDayStyling = document.getElementById(clickedDayObject.day);
    const calendarContainer = document.querySelector('.calendar-container');
    var calendarDay = document.querySelectorAll('.calendar-day');
    var holiday = document.querySelectorAll('.holiday'); 



    // adds 0 to clickedDayObject so it matches todo
    clickedDayObjectMonth = addZeroToDates(clickedDayObject.month);
    clickedDayObjectDay = addZeroToDates(clickedDayObject.day);
    function addZeroToDates(i) {
        if (i < 10) {i = "0" + i};  
        return i;
      }
    let clickedDay = clickedDayObject.year + "-" + clickedDayObjectMonth + "-" + clickedDayObjectDay;



    if(calendarContainer.style.backgroundColor == "white"){
        calendarContainer.style.backgroundColor = "#c2c0c0"; // put color on calendar
        clickedDayStyling.style.backgroundColor = "#fbed21"; // put color on selected day

        filterToClickedDay(clickedDay);
    } else {
        calendarContainer.style.backgroundColor = "white"; // put color on calendar

        for(i=0 ; i < calendarDay.length; i++){
            calendarDay[i].style.backgroundColor = "transparent";
        }

        for(i=0 ; i < holiday.length; i++){
            holiday[i].style.backgroundColor = "#fa7575";
        }

        let ul = document.querySelector('ul')
        while( ul.firstChild ){
            ul.removeChild(ul.firstChild );
          }
        loadTodos();
    }

    
}

//Searches for todos on a selected date
function filterToClickedDay(clickedDay){
    let todos = JSON.parse(localStorage.getItem('todos'));
    const ul = document.querySelector('.todoList');
    //Resets the todo-list
    while( ul.firstChild ){
        ul.removeChild(ul.firstChild );
      }
    
    for (let todo of todos) {
        
        if(todo.date == clickedDay){
            // Iterate over each todo and add it to the DOM
            const li = createTodoElement(todo);
            ul.append(li)
        }
    }
}