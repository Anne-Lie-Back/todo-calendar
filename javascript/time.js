/** timeAndDateNow sets the time. The other divide it
* @param {number} timeAndDateNow - The current time and date
* @param {string} weekday - The day of the week - number to string in weekdayName
* @param {number} date - The date
* @param {string} month - The month - number to string in monthName
* @param {number} hour - Hour of the day
* @param {number} minute - Minute of the hour
*/
 
/** 
* @param {string} monthName - Convert month number to it's name
*/

/** 
* @param {string} fixWeekday - fix that the week start with sunday
* @param {string} weekdayName - Convert month number to it's name
*/

/**
 * @param {HTMLElement} displayClock - Display clock in mobile
 * @param {HTMLElement} displayDate - Display date in mobile
 * @param {HTMLElement} displayMonth - Display weekday and month in mobile
 * @param {HTMLElement} displayClockAside - Display weekday and clock
 * @param {HTMLElement} displayDateAside - Display date
 * @param {HTMLElement} displayMonthAside - Display month 
*/

 setInterval(setTime, 1000);

  function setTime() {
    //timeAndDateNow sets the time. The other divide it
    let timeAndDateNow = new Date();
    let date = timeAndDateNow.getDate();
    let weekday = timeAndDateNow.getDay();
    let month = timeAndDateNow.getMonth();
    let hour = timeAndDateNow.getHours();
    let minute = timeAndDateNow.getMinutes();
    
    //Convert month number to it's name
    const monthName = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    month = monthName[month];

    //Convert weekday number to it's weekname
    let fixWeekday = [6, 0, 1, 2, 3, 4, 5];
    weekday = fixWeekday[weekday];
    let weekdayName = ["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"];
    weekday = weekdayName[weekday];

    // Adds zero to clock when the number is under 10
    hour = addZeroToClock(hour);
    minute = addZeroToClock(minute);
    function addZeroToClock(i) {
        if (i < 10) {i = "0" + i};  
        return i;
      }

    let time = hour + ":" + minute;
    let displayClock = document.querySelector('.display-clock');
    let displayDate = document.querySelector('.display-date');
    let displayMonth = document.querySelector('.display-month');
    
    let displayClockAside = document.querySelector('.display-clock-aside');
    let displayDateAside = document.querySelector('.display-date-aside');
    let displayMonthAside = document.querySelector('.display-month-aside');

    
    displayDate.innerHTML =  date;
    displayMonth.innerHTML = weekday + " " + month;
    displayClock.innerHTML = time;

    displayMonthAside.innerHTML = month;
    displayDateAside.innerHTML = date;
    displayClockAside.innerHTML = weekday + " " +time;
  }
