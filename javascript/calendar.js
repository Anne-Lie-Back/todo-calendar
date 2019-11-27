function calendarStart(){
    console.log('Calendar Start2.')
    addDaysToCalendar();
}

function addDaysToCalendar(){

    fillEmptyDays(3);

    for(let i = 0; i < 31; i++){
        let makeDiv = document.createElement("div");
        makeDiv.className = "calendar-day";
        makeDiv.id = "2019-11-" + i;
        let makeText = document.createTextNode("abc  " + i);
        makeDiv.appendChild(makeText);
        document.querySelector('.calendar-container').append(makeDiv);
    }
}

function fillEmptyDays(nrOfEmptyDays){
    for(let i = 0; i < nrOfEmptyDays; i++){
        let makeDiv = document.createElement('div');
        makeDiv.className = "empty-day";
        document.querySelector('.calendar-container').appendChild(makeDiv);
    }
}