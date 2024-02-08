import React, { useState } from 'react';
import './calendar.css';
const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookings, setBookings] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleBooking = () => {
        if (selectedDate && selectedTime) {
            const newBooking = {
                date: selectedDate,
                time: selectedTime,
            };
            setBookings([...bookings, newBooking]);
            setSelectedDate(null);
            setSelectedTime(null);
        }
    };
     // Dummy data for occupancy status (you can replace this with actual data)
  const dummyOccupancyData = {
    RESOURCE_NAME_1: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
    RESOURCE_NAME_2: [false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false, true],
    // Add more dummy data for additional resources
  };

    return (
        <div >
      <h1>Calendar</h1>
      <div className='flex border'>
          
      </div>
      <button onClick={handleBooking}>Book</button>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Resource</th>
           { [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].map((hour) => (
                <th key={hour}>{hour}:00</th>
                ))}

          </tr>
        </thead>
        <tbody>
        {/* Render table rows for each resource */}
        {/* Replace RESOURCE_NAME_1, RESOURCE_NAME_2, etc. with actual resource names */}
        {Object.keys(dummyOccupancyData).map((resourceName, index) => (
          <tr key={index}>
            <td>{resourceName}</td>
            {/* Render occupancy status for each hour */}
            {dummyOccupancyData[resourceName].map((isOccupied, hour) => (
              <td key={hour} className={isOccupied ? 'occupied' : 'available'}>
                {isOccupied ? 'Booked' : 'Available'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    );
};

export default Calendar;
