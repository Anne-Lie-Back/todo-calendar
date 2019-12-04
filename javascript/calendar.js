let currentViewYear;
let currentViewMonth;
let clickedDayObject = {year: 0, month:0, day:0};

function calendarStart(){
    currentViewYear = new Date().getFullYear();
    currentViewMonth = new Date().getMonth();
    //console.log(currentViewYear,currentViewMonth);
    addDaysToCalendar(currentViewYear,currentViewMonth);
    //addDaysToCalendar(2020,1);
    // document.querySelector('.calendar-container').addEventListener('click', event => {calendarDayClicked(event);});
    //helgDagarAPI(currentViewYear, currentViewMonth);
    document.querySelector('.todoContainer').addEventListener('click', event => {todoClick(event);});
}

function addDaysToCalendar(setYear,setMonth){
    removeAllDays();//clear old month view.
    //console.log(setYear,setMonth);

    helgDagarAPI(setYear, setMonth)

    fillEmptyDays(getFirstWeekdayOfMonth(setYear,setMonth));

    addDayDivsToMonth(setYear, setMonth);

    changeCalendarYearMonthName(setYear,setMonth);
    //console.log("done days ");
    fillLastEmptyDays();

    //console.log(getTodosFromLocalStorage())
    //console.log('local ')

    updateCalendarTodo();

}

//fill day divs in calendar-container.
function addDayDivsToMonth(setYear, setMonth){
    for(let i = 0; i < getDaysInMonth(setYear,setMonth); i++){
        let makeDiv = document.createElement("div");
        let makeDayNrDiv = document.createElement("div"); //new
        let makeDayTodoDiv = document.createElement("div"); //new
        let makeHolidayDiv = document.createElement("div"); //new
        makeDiv.className = "calendar-day";
        makeDayNrDiv.className = "dayNrDiv"; //new
        makeDayTodoDiv.className = "dayTodoDiv"; //new
        makeHolidayDiv.className = "dayHolidayDiv"; //new
        makeDiv.id = (i + 1 );
        let makeText = document.createTextNode(" " + (i +1 ));
        makeDayNrDiv.appendChild(makeText); //new
        makeDiv.appendChild(makeDayNrDiv);
        makeDiv.appendChild(makeDayTodoDiv);
        makeDiv.appendChild(makeHolidayDiv);
        document.querySelector('.calendar-container').append(makeDiv);
    }
}

//Fill empty days if month does not start on a monday.
function fillEmptyDays(nrOfEmptyDays){
    if(nrOfEmptyDays === 0){ //sunday is zero so set to 7.
        nrOfEmptyDays = 7;
    }
    //console.log('nr days '+nrOfEmptyDays);
    for(let i = 0; i < (nrOfEmptyDays-1); i++){
        let makeDiv = document.createElement('div');
        makeDiv.className = "empty-day";
        document.querySelector('.calendar-container').appendChild(makeDiv);
    }
}

//fill rest of calendar empty days.
function fillLastEmptyDays(){
    let restDays = (document.querySelectorAll('.calendar-day').length + document.querySelectorAll('.empty-day').length) % 7;

    restDays = 7 - restDays;
    //console.log(restDays);
    if(restDays < 7){
        for(let i = 0; i < (restDays); i++){
            //console.log(' loop ' +  i);
            let makeDiv = document.createElement('div');
            makeDiv.className = "empty-day";
            document.querySelector('.calendar-container').appendChild(makeDiv);
        }        
    }
}

//Remove all calendar days for next month.
function removeAllDays(){
    const allDaysList = document.querySelectorAll('.calendar-day');
    const emptyDaysList = document.querySelectorAll('.empty-day');
    //console.log(allDaysList , emptyDaysList);
    for(let day of allDaysList){
        day.remove();
    }

    for(let emptyDay of emptyDaysList){
        emptyDay.remove();
    }
    //console.log(allDaysList , emptyDaysList);
}

function changeCalendarYearMonthName(setYear,setMonth){

    const monthName = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    document.querySelector('.calendar-year').innerHTML = setYear;//update year on top of calendar.
    document.querySelector('.calendar-month').innerHTML = monthName[setMonth];//add one so december is month 12
}

//what day of week to start adding calendar days.
function getFirstWeekdayOfMonth(setYear,setMonth){
    let firstWeekday = new Date(setYear,setMonth, 1).getDay();
    //console.log(' first week day: '+firstWeekday);
    return firstWeekday;//0 is sunday, 1 is monday.
}

//How many days in current month to add to calendar.
function getDaysInMonth(setYear,setMonth){
    let nrDaysInMonth = new Date(setYear, (setMonth+1), 0).getDate();//zero is last day of previous month
    //console.log('days ' + nrDaysInMonth);
    return nrDaysInMonth;
}

//change month view, add one month.
function nextMonth(){
    if(currentViewMonth === 11){ //if december
        currentViewMonth = 0;
        currentViewYear++;
    }
    else{
        currentViewMonth++;
    }
    
    //console.log('current year month view: '+currentViewYear + currentViewMonth);
    addDaysToCalendar(currentViewYear,currentViewMonth);
}

//change month view, back one month.
function prevMonth(){
    if(currentViewMonth === 0){ //if january;
        currentViewMonth = 11;
        currentViewYear--;
    }
    else{
        currentViewMonth--;
    }
    //console.log('current year month view: '+currentViewYear + currentViewMonth);
    addDaysToCalendar(currentViewYear,currentViewMonth);
}

//API for holidays. month 1 is january and 12 is december.
async function helgDagarAPI(getYear,getMonth){
    //add try catch later. TODO.
    //new brach calendar-helgdagar.
    try {
        const response = await fetch('https://api.dryg.net/dagar/v2.1/' + getYear+'/'+(getMonth+1)); //add one to month for js date starts at zero.
        const jsonResponse = await response.json();
        //console.log(jsonResponse);
        //return jsonResponse;
        addHelgAPIToCalendar(jsonResponse);
    }
    catch (error){
        console.log(error);
    }
    
}

function helgAPI(getYear,getMonth){
    fetch('https://api.dryg.net/dagar/v2.1/' + getYear+'/'+(getMonth+1)) //add one to month for js date starts at zero.
        .then (function (response){
            //console.log(response.json());
            return response.json();
        })
        .then(function(data) {
            //console.log(data.dagar);
            return data.dagar;
        })
}

//Add holiday text to calendar day div.
function addHelgAPIToCalendar(helgMonth){
    //console.log(helgMonth.dagar);
    let listOfDays = document.querySelectorAll('.calendar-day');
    for(let i = 0; i < Object.keys(helgMonth.dagar).length ; i++){
        if(helgMonth.dagar[i].helgdag){

            //console.log('day in month '+ i + ' ' + helgMonth.dagar[i].helgdag);
            //listOfDays[i].style.backgroundColor = 'red';
            listOfDays[i].classList.add('holiday');

            //listOfDays[i].innerHTML += '<br>' + helgMonth.dagar[i].helgdag;
            listOfDays[i].querySelector(".dayHolidayDiv").innerHTML = helgMonth.dagar[i].helgdag;
        }
    }
}


//Get todo's saved in local storage from todo.js and adds them to calendar days as a number.
function updateCalendarTodo(){
    let listOfDays = document.querySelectorAll('.calendar-day');
    let todoList = getTodosFromLocalStorage();
    
    //loop over all days in calendar.
    //add a zero to month or day if less then 9 becomes 09.
    for(let dayDiv of listOfDays){
        let paddedMonth;
        let paddedDay;
        let todoNrOnDay = 0;
        if(currentViewMonth <= 8){
            paddedMonth = '0' + (currentViewMonth+1);//from month 11 is dec to month 12.
        }
        else{
            paddedMonth = (currentViewMonth+1);
        }

        if(dayDiv.id <= 9){
            paddedDay = '0' + dayDiv.id;
        }
        else{
            paddedDay = dayDiv.id;
        }
        let paddedDate = currentViewYear + '-' + paddedMonth + '-' + paddedDay;
        //console.log(paddedDate + ' padded');
        
        //loop over all days in local storage todo to see how many there are in a day.
        for(let todo of todoList){
            if(todo.date == paddedDate){
                todoNrOnDay ++;
            }
        }

        //Add number of todo's in todoDiv.
        if(todoNrOnDay != 0){
            //console.log(todoNrOnDay + ' todoNr ' + paddedDate);
            dayDiv.querySelector(".dayTodoDiv").innerHTML = todoNrOnDay;
        }
        else{
            dayDiv.querySelector(".dayTodoDiv").innerHTML = "";
        }
    }

}

//Event listeners from todo.js when remove, add buttons are clicked.
//Updates calendar todo number. 
function todoClick(event){
    //console.log(event.target.className);
    //console.log(event.target.id);
    if(event.target.className == 'fas fa-minus-circle removeTodoIcon'){
        //console.log('remove button clicked');
        updateCalendarTodo();
    }

    if(event.target.className == 'fas fa-check' || event.target.id == "addWrittenTodo"){
        //console.log('add clicked');
        updateCalendarTodo();
    }
}