function calendarStart(){
    console.log('Calendar Start2.')
    addDaysToCalendar();
}

function addDaysToCalendar(){

    fillEmptyDays(3);

    for(let i = 0; i < getDaysInMonth(); i++){
        let makeDiv = document.createElement("div");
        makeDiv.className = "calendar-day";
        makeDiv.id = "2019-11-" + i;
        let makeText = document.createTextNode("abc  " + i);
        makeDiv.appendChild(makeText);
        document.querySelector('.calendar-container').append(makeDiv);
    }
    console.log("done days ");
    //removeAllDays();
    //getDaysInMonth();
}

function fillEmptyDays(nrOfEmptyDays){
    for(let i = 0; i < nrOfEmptyDays; i++){
        let makeDiv = document.createElement('div');
        makeDiv.className = "empty-day";
        document.querySelector('.calendar-container').appendChild(makeDiv);
    }
}

function removeAllDays(){
    const allDaysList = document.querySelectorAll('.calendar-day');
    const emptyDaysList = document.querySelectorAll('.empty-day')
    console.log(allDaysList , emptyDaysList);
    for(let days of allDaysList){
        days.remove();
    }

    for(let emptyDay of emptyDaysList){
        emptyDay.remove();
    }
    console.log(allDaysList , emptyDaysList);
}

function getDaysInMonth(){
    let nrDaysInMonth = new Date(2019, 11, 0).getDate();
    console.log('days ' + nrDaysInMonth);
    return nrDaysInMonth;
}