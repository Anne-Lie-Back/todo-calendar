//TEACHER ADDED THIS
//let currentTime = new Date()

 setInterval(setTime, 1000);

  function setTime() {

    //TEACHER ADDED THIS
    //currentTime.setSeconds(currentTime.getSeconds() + 1)

    //Collects the time
    let timeAndDateNow = new Date();
    let date = timeAndDateNow.getDate();
    let weekday = timeAndDateNow.getDay();
    let month = timeAndDateNow.getMonth();
    let hour = timeAndDateNow.getHours();
    let minute = timeAndDateNow.getMinutes();
    

    

    //Convert month number to it's name
    const monthName = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    month = monthName[month];

    //Convert weekweekday number to it's name, had to fix that sunday is 0
    let fixWeekday = [6, 0, 1, 2, 3, 4, 5];
    weekday = fixWeekday[weekday];
    let weekdayName = ["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"];
    weekday = weekdayName[weekday];

    // Zero to clock when the number is under 10

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
