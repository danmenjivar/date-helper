
let weeks = [];
let daysOfTheWeek = [];

const month_list = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function calcZeroLastDay(week, day = -1) {
    if (day === -1) {
        day = week.length - 1;
    }

    const numbersToFill = Array.from({ length: week.length }, (_, i) => i + 1);
    for (let n = 0; n < week.length; n++) {
        if (week[n] === 0) {
            week[n] = numbersToFill.shift();
        }
    }
    return week[day];
}

document.querySelector("#month").addEventListener("change", (event) => {
    //   result.textContent = `You like ${event.target.value}`;
    getDate();
});


function setCurrentMonth() {
    let date = new Date();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let year = date.getFullYear();
    document.getElementById("month").value = `${year}-${month}`
}

function getDate() {
    weeks = [];
    let [year, month] = (document.getElementById("month").value).split('-');
    month = parseInt(month);
    let calendar = monthCalendar(parseInt(year), month - 1);
    calendar = calendar.filter(row => row[0] != 0);
    // console.log(calendar);
    for (let week = 0; week < calendar.length; week++) {

        if (daysOfTheWeek.length <= 0) { // format week of with startingDate - endDate
            startDate = `${month_list[month - 1]} ${calendar[week][0]}`


            endDate = calendar[week][6]

            if (endDate == 0) {
                endDate = `${month_list[month]} ${calcZeroLastDay(calendar[week])}`
            }
            else {
                endDate = `${endDate}`
            }

            date = startDate + " - " + endDate

            // dt = Week(week + 1, date)
            weeks.push(date)

        } else { // format inidivual days

            // for day in daysOfTheWeek:

            //     date = calendar[week][day - 1]

            // if date == 0:
            //     date = f'{date_list[day-1]}, {month_list[month]} {calcZeroLastDay(calendar[week][:], day - 1)}'
            // else:
            // date = f'{date_list[day-1]}, {month_list[month - 1]} {date}'

            // dt = Week(week + 1, date)
            // weeks.append(dt)
        }
    }
    console.log(weeks);
}

function monthCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    let startingDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Adjust startingDayOfWeek to make Monday the first day
    startingDayOfWeek = (startingDayOfWeek + 6) % 7;

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
    getDate()
})();