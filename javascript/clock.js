
 setInterval(setTime, 500);

  function setTime() {
    //Collects the time
    let timeAndDateNow = new Date();
    let date = timeAndDateNow.getDate();
    let month = timeAndDateNow.getMonth();
    let hour = timeAndDateNow.getHours();
    let minute = timeAndDateNow.getMinutes();

    hour = addZeroToClock(hour);
    minute = addZeroToClock(minute);

    //Convert month number to it's name
    const monthName = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    month = monthName[month];

    // Zero to clock when the number is under 10
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

    displayMonth.innerHTML = month;
    displayDate.innerHTML = date;
    displayClock.innerHTML = time;

    displayMonthAside.innerHTML = month;
    displayDateAside.innerHTML = date;
    displayClockAside.innerHTML = time;
  }
