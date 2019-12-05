/** The current year the calendar is displaying.
 * @type {number}
 */
let currentViewYear;

/**The current month the calendar is displaying.
 * @type {number}
 */
let currentViewMonth;

/**An object containing numbers of year,month,day of the calendar day box that was clicked
 * from calendarClickedHandler.js.
 * @type {{year: number, month: number, day: number}}
 */
let clickedDayObject = {year: 0, month:0, day:0};


/**
 * Start function called from javascript.js load event.
 */
function calendarStart(){
    currentViewYear = new Date().getFullYear(); //get todays date.
    currentViewMonth = new Date().getMonth();
    addDaysToCalendar(currentViewYear,currentViewMonth); // fills empty container with day boxes.

    //listens for events on todo list, for when to update number of todos in calendar.
    document.querySelector('.todoContainer').addEventListener('click', event => {todoClick(event);});
}


/**Holds smaller functions that fills the calendar with day boxes, holidays, number of todos
 * and updates month/year , then clears the old boxes when called again.
 * @param {number} setYear 
 * @param {number} setMonth 
 */
function addDaysToCalendar(setYear,setMonth){
    removeAllDays();//clear old month view.

    helgDagarAPI(setYear, setMonth)

    fillEmptyDays(getFirstWeekdayOfMonth(setYear,setMonth));//

    addDayDivsToMonth(setYear, setMonth);

    changeCalendarYearMonthName(setYear,setMonth);

    fillLastEmptyDays();

    updateCalendarTodo();

}


/**fill day divs in calendar-container.
 * 
 * @param {number} setYear 
 * @param {number} setMonth 
 */
function addDayDivsToMonth(setYear, setMonth){
    for(let i = 0; i < getDaysInMonth(setYear,setMonth); i++){
        let makeDiv = document.createElement("div");
        let makeDayNrDiv = document.createElement("div");
        let makeDayTodoDiv = document.createElement("div");
        let makeHolidayDiv = document.createElement("div");
        makeDiv.className = "calendar-day";
        makeDayNrDiv.className = "dayNrDiv";
        makeDayTodoDiv.className = "dayTodoDiv";
        makeHolidayDiv.className = "dayHolidayDiv";
        makeDiv.id = (i + 1 );
        let makeText = document.createTextNode(" " + (i +1 ));
        makeDayNrDiv.appendChild(makeText);
        makeDiv.appendChild(makeDayNrDiv);
        makeDiv.appendChild(makeDayTodoDiv);
        makeDiv.appendChild(makeHolidayDiv);
        document.querySelector('.calendar-container').append(makeDiv);
    }
}

/**Fill empty days if month does not start on a monday.
 * 
 * @param {number} nrOfEmptyDays 
 */
function fillEmptyDays(nrOfEmptyDays){
    if(nrOfEmptyDays === 0){ //sunday is zero so set to 7.
        nrOfEmptyDays = 7;
    }

    for(let i = 0; i < (nrOfEmptyDays-1); i++){
        let makeDiv = document.createElement('div');
        makeDiv.className = "empty-day";
        document.querySelector('.calendar-container').appendChild(makeDiv);
    }
}


/**
 * Fill rest of calendar empty days at last week of month to have a full grid.
 */
function fillLastEmptyDays(){
    //how many days are left after all day boxes modulus 7 days for a week.
    let restDays = (document.querySelectorAll('.calendar-day').length + document.querySelectorAll('.empty-day').length) % 7;

    restDays = 7 - restDays;

    if(restDays < 7){
        for(let i = 0; i < (restDays); i++){
            let makeDiv = document.createElement('div');
            makeDiv.className = "empty-day";
            document.querySelector('.calendar-container').appendChild(makeDiv);
        }        
    }
}


/**
 * Remove all calendar days for next month to be filled with new days.
 */
function removeAllDays(){
    const allDaysList = document.querySelectorAll('.calendar-day');
    const emptyDaysList = document.querySelectorAll('.empty-day');

    for(let day of allDaysList){
        day.remove();
    }

    for(let emptyDay of emptyDaysList){
        emptyDay.remove();
    }
}


/**Sets month text name at top of calendar.
 * 
 * @param {number} setYear 
 * @param {number} setMonth 
 */
function changeCalendarYearMonthName(setYear,setMonth){

    const monthName = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    document.querySelector('.calendar-year').innerHTML = setYear;//update year on top of calendar.
    document.querySelector('.calendar-month').innerHTML = monthName[setMonth];//add one so december is month 12
}


/**what day of week to start adding calendar days.
 * 
 * @param {number} setYear 
 * @param {number} setMonth 
 */
function getFirstWeekdayOfMonth(setYear,setMonth){
    let firstWeekday = new Date(setYear,setMonth, 1).getDay();
    return firstWeekday;    //0 is sunday, 1 is monday.
}


/**How many days are there in current month to add to calendar.
 * 
 * @param {number} setYear 
 * @param {number} setMonth 
 */
function getDaysInMonth(setYear,setMonth){
    //zero is last day of previous month
    let nrDaysInMonth = new Date(setYear, (setMonth+1), 0).getDate();
    return nrDaysInMonth;
}


/**
 * Change month view, add one month and then add the new month to calendar.
 */
function nextMonth(){
    if(currentViewMonth === 11){ //if december
        currentViewMonth = 0;
        currentViewYear++;
    }
    else{
        currentViewMonth++;
    }
    
    addDaysToCalendar(currentViewYear,currentViewMonth);
}

/**
 * Change month view, remove one month and then add the new month to calendar.
 */
function prevMonth(){
    if(currentViewMonth === 0){ //if january;
        currentViewMonth = 11;
        currentViewYear--;
    }
    else{
        currentViewMonth--;
    }

    addDaysToCalendar(currentViewYear,currentViewMonth);
}


/**API for holidays. month 1 is january and 12 is december.
 * When response is received, addHelgAPIToCalendar is called.
 * @param {number} getYear 
 * @param {number} getMonth 
 */
async function helgDagarAPI(getYear,getMonth){

    try {
        const response = await fetch('https://api.dryg.net/dagar/v2.1/' + getYear+'/'+(getMonth+1)); //add one to month for js date starts at zero.
        const jsonResponse = await response.json();
        addHelgAPIToCalendar(jsonResponse);
    }
    catch (error){
        console.log(error);
    }
    
}

/**
 * 
 * @typedef {{helgdag: string}} dagar
 */

/**Add holiday text to calendar day div.
 * 
 * @param {Array<dagar>} helgMonth 
 */
function addHelgAPIToCalendar(helgMonth){

    let listOfDays = document.querySelectorAll('.calendar-day');
    
    for(let i = 0; i < Object.keys(helgMonth.dagar).length ; i++){
        if(helgMonth.dagar[i].helgdag){
            listOfDays[i].classList.add('holiday');
            listOfDays[i].querySelector(".dayHolidayDiv").innerHTML = helgMonth.dagar[i].helgdag;
        }
    }
}


/**
 * Get todo's saved in local storage from function in todo.js and adds them to calendar days as a number.
 */
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
        
        //loop over all days in local storage todo to see how many there are in a day.
        for(let todo of todoList){
            if(todo.date == paddedDate){
                todoNrOnDay ++;
            }
        }

        //Add number of todo's in todoDiv.
        if(todoNrOnDay != 0){
            dayDiv.querySelector(".dayTodoDiv").innerHTML = todoNrOnDay;
        }
        else{
            dayDiv.querySelector(".dayTodoDiv").innerHTML = "";
        }
    }

}
/**
 * 
 * @typedef {{className: string}} target
 */

 /**Event listeners from todo aside, when remove or add buttons are clicked.
 *Updates calendar todo number. 
 * @param {target} event 
 */
function todoClick(event){

    if(event.target.className == 'fas fa-minus-circle removeTodoIcon'){
        updateCalendarTodo();
    }

    if(event.target.className == 'fas fa-check' || event.target.id == "addWrittenTodo"){
        updateCalendarTodo();
    }
}