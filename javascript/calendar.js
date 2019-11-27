function calendarStart(){
    console.log('Calendar Start2.')
    addDaysToCalendar();
}

function addDaysToCalendar(){

    for(let i = 0; i < 31; i++){
        let makeDiv = document.createElement("div");
        let makeText = document.createTextNode("abc  " + i);
        makeDiv.appendChild(makeText);
        document.querySelector('.calendar-container').append(makeDiv);
    }
}