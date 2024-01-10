
function setCurrentMonth() {
    let date = new Date();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let year = date.getFullYear();
    document.getElementById("month").value = `${year}-${month}`
}

function monthCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDay.getDate();
  
    let dayCount = 1;
    const calendarArray = [];
  
    // Create a 2D array representing the calendar
    for (let i = 0; i < 6; i++) {
      calendarArray[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDayOfWeek) {
          // Add empty cells for days before the first day of the month
          calendarArray[i][j] = 0;
        } else if (dayCount <= totalDaysInMonth) {
          // Add days of the month
          calendarArray[i][j] = dayCount;
          dayCount++;
        } else {
          // Add empty cells for days after the last day of the month
          calendarArray[i][j] = 0;
        }
      }
    }
  
    return calendarArray;
  }
  

(function main() {
    setCurrentMonth();
    document.querySelector("#caledar").innerHTML = monthCalendar(2022,3);

})();