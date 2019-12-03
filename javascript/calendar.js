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
    //helgDagarAPI(currentViewYear, currentViewMonth);
}

function addDaysToCalendar(setYear,setMonth){
    removeAllDays();//clear old month view.
    //console.log(setYear,setMonth);

    helgDagarAPI(setYear, setMonth)

    fillEmptyDays(getFirstWeekdayOfMonth(setYear,setMonth));
    for(let i = 0; i < getDaysInMonth(setYear,setMonth); i++){
        let makeDiv = document.createElement("div");
        makeDiv.className = "calendar-day";
        makeDiv.id = (i + 1 );
        let makeText = document.createTextNode(" " + (i +1 ));
        makeDiv.appendChild(makeText);
        document.querySelector('.calendar-container').append(makeDiv);
    }

    //document.querySelector('.calendar-year').innerHTML = currentViewYear;//update year on top of calendar.
    //document.querySelector('.calendar-month').innerHTML = (currentViewMonth+1);//add one so december is month 12
    changeCalendarYearMonthName(setYear,setMonth);
    console.log("done days ");
    fillLastEmptyDays();


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
        clickedDayObject.month = currentViewMonth+1; // zero is january, 11 is december.
        clickedDayObject.day = Number(event.target.id); //day of month.
        document.getElementById(clickedDayObject.day).style.backgroundColor = "#fbed21"; // put color on selected day

        // adds 0 to clickedDayObject so it matches todo
        clickedDayObjectMonth = addZeroToDates(clickedDayObject.month);
        clickedDayObjectDay = addZeroToDates(clickedDayObject.day);
        function addZeroToDates(i) {
            if (i < 10) {i = "0" + i};  
            return i;
          }

        let clickedDay = clickedDayObject.year + "-" + clickedDayObjectMonth + "-" + clickedDayObjectDay;
        filterToClickedDay(clickedDay);
    }
    else{
        console.log(event.target.className);
    }
    
}


//searches for todos on a selected date
function filterToClickedDay(clickedDay){
    console.log(clickedDay);
    var todos = JSON.parse(localStorage.getItem('todos'));
    for (let todo of todos) {
        if(todo.date == clickedDay){
            

            // Get the DOM ul element and list of todos
            const ul = document.querySelector('.todoList');

            // Iterate over each todo and add it to the DOM
            const li = createTodoElement(todo);
            ul.append(li)
        }
    }
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
            console.log(response.json());
            return response.json();
        })
        .then(function(data) {
            console.log(data.dagar);
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
            listOfDays[i].innerHTML += '<br>' + helgMonth.dagar[i].helgdag;
            
        }
    }
}