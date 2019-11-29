let currentViewYear;
let currentViewMonth;
let clickedDayObject = {year: 0, month:0, day:0};

function calendarStart(){
    console.log('Calendar Start2.')
    currentViewYear = new Date().getFullYear();
    currentViewMonth = new Date().getMonth();
    console.log(currentViewYear,currentViewMonth);
    addDaysToCalendar(currentViewYear,currentViewMonth);
    //addDaysToCalendar(2020,1);
    document.querySelector('.calendar-container').addEventListener('click', event => {calendarDayClicked(event);});
}

function addDaysToCalendar(setYear,setMonth){
    removeAllDays();//clear old month view.
    console.log(setYear,setMonth);
    fillEmptyDays(getFirstWeekdayOfMonth(setYear,setMonth));
    for(let i = 0; i < getDaysInMonth(setYear,setMonth); i++){
        let makeDiv = document.createElement("div");
        makeDiv.className = "calendar-day";
        makeDiv.id = (i + 1 );
        let makeText = document.createTextNode("abc  " + (i +1 ));
        makeDiv.appendChild(makeText);
        document.querySelector('.calendar-container').append(makeDiv);
    }
    console.log("done days ");
    //removeAllDays();
    //getDaysInMonth();
}

//Fill empty days if month does not start on a monday.
function fillEmptyDays(nrOfEmptyDays){
    if(nrOfEmptyDays === 0){ //sunday is zero so set to 7.
        nrOfEmptyDays = 7;
    }
    console.log('nr days '+nrOfEmptyDays);
    for(let i = 0; i < (nrOfEmptyDays-1); i++){
        let makeDiv = document.createElement('div');
        makeDiv.className = "empty-day";
        document.querySelector('.calendar-container').appendChild(makeDiv);
    }
}

//Remove all calendar days for next month.
function removeAllDays(){
    const allDaysList = document.querySelectorAll('.calendar-day');
    const emptyDaysList = document.querySelectorAll('.empty-day')
    //console.log(allDaysList , emptyDaysList);
    for(let day of allDaysList){
        day.remove();
    }

    for(let emptyDay of emptyDaysList){
        emptyDay.remove();
    }
    //console.log(allDaysList , emptyDaysList);
}

//what day of week to start adding calendar days.
function getFirstWeekdayOfMonth(setYear,setMonth){
    let firstWeekday = new Date(setYear,setMonth, 1).getDay();
    console.log(' first week day: '+firstWeekday);
    return firstWeekday;//0 is sunday, 1 is monday.
}

//How many days in current month to add to calendar.
function getDaysInMonth(setYear,setMonth){
    let nrDaysInMonth = new Date(setYear, (setMonth+1), 0).getDate();//zero is last day of previous month
    console.log('days ' + nrDaysInMonth);
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
    
    console.log('current year month view: '+currentViewYear + currentViewMonth);
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
    console.log('current year month view: '+currentViewYear + currentViewMonth);
    addDaysToCalendar(currentViewYear,currentViewMonth);
}

//print day of month number when clicked. send to todo list.
function calendarDayClicked(event){
    if(event.target.className === 'calendar-day'){
        console.log(event.target.id);
        clickedDayObject.year = currentViewYear;
        clickedDayObject.month = currentViewMonth; // zero is january, 11 is december.
        clickedDayObject.day = Number(event.target.id); //day of month.
        console.log(clickedDayObject);
    }
    else{
        console.log(event.target.className);
    }
    
}