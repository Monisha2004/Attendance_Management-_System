import React from 'react';
import './calender.css'
function Calendar() {
  // Generate the calendar dates for 2023
  const calendarDates = generateCalendarDates(2023);

  // Mock student attendance data
  const studentAttendance = {
    '2023-07-01': 'absent',
    '2023-06-05': 'absent',
    '2023-04-10': 'absent',
    '2023-04-11': 'absent',
    '2023-03-22': 'absent',
    '2023-02-06': 'absent',
    '2023-02-07':'absent',
    '2023-01-17':'absent',
    '2023-06-14': 'absent',
    // Add more attendance data as needed
  };

  // Function to generate calendar dates for a given year
  function generateCalendarDates(year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const calendarDates = [];

    while (startDate <= endDate) {
      calendarDates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    return calendarDates;
  }

  // Function to group calendar dates by month
  function groupDatesByMonth(dates) {
    const groupedDates = {};
    dates.forEach((date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      if (groupedDates[month]) {
        groupedDates[month].push(date);
      } else {
        groupedDates[month] = [date];
      }
    });
    return groupedDates;
  }

  const groupedDates = groupDatesByMonth(calendarDates);

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="month-group">
          {Object.keys(groupedDates).map((month, index) => {
            const dates = groupedDates[month];

            return (
              <div key={index} className="month-card">
                <h2 className="month-title">{month}</h2>
                <div className="dates-container">
                  {dates.map((date) => {
                    const dateString = date.toISOString().split('T')[0];
                    const attendanceStatus = studentAttendance[dateString];

                    return (
                      <div
                        key={dateString}
                        className={`calendar-date ${
                          attendanceStatus === 'absent' ? 'absent' : 'present'
                        }`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
