import React, { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './calendar.css';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Calendar = ({resources,HandleReservation,Reservation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedHours, setSelectedHours] = useState({});
  const [totalHours, setTotalHours] = useState(23);
  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleDateChange = (type) => {
    const date = new Date(selectedDate);
    type === 'decrement' ? date.setDate(date.getDate() - 1) : date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleCellClick = (resourceName, hour) => {
    const updatedHours = { ...selectedHours };
    if(updatedHours[resourceName][hour]===0) return alert('This slot is already booked');
    if(updatedHours[resourceName][hour]===-1) return alert('This slot is Not available for booking');
    if (updatedHours[resourceName][hour] === 2) {
      updatedHours[resourceName][hour] = 1;
    } else {
      updatedHours[resourceName][hour] = 2;
    }
    setSelectedHours(updatedHours);
    setSelectedResource(resourceName);
  }
  function isHourInRange(hour, start, end) {
    const startTime = parseInt(start.split(':')[0]);
    const endTime = parseInt(end.split(':')[0]);
  
    hour = parseInt(hour);
    if (endTime === 0 && hour === 0) {
      return 1; // Special case: midnight is considered within the range
    }
  
    if ((hour >= startTime && hour < endTime) || (hour === startTime && hour === endTime)) {
      return 1; // Hour is within the range
    } else {
      return -1; // Hour is not within the range
    }
  }
  const CalendarView = () => { 
    const ReservationsData = {};
    resources.map((resource) => {
      const resourceData = [];
      for (let i = 1; i <= totalHours; i++) {
        const date= new Date(selectedDate);
        date.setHours(i);
        const weekDay = date.getDay()+1;
        const availability = resource.resourceavailabilityID?.availability
        if('0' in availability){
          const weekDayAvailability = availability[0]
          if (weekDayAvailability) {
          const hour=isHourInRange(i, weekDayAvailability.start, weekDayAvailability.end);
          resourceData.push(hour);
          }
        }
        else if (weekDay in availability) {
            const weekDayAvailability = availability[weekDay]
            if (weekDayAvailability) {
            const hour=isHourInRange(i, weekDayAvailability.start, weekDayAvailability.end);
            resourceData.push(hour);
            }
          }
          else{
            resourceData.push(-1);
          }
        }
      ReservationsData[resource.name] = resourceData;
    });
    setSelectedHours(ReservationsData);
  }

  useEffect(() => {
   if(resources){
    CalendarView();
   }
  }, [resources,selectedDate]);


useEffect(() => {
  console.log(selectedResource);
  const reservationData = {
    resourceName: selectedResource,
    date: selectedDate,
    startTime: null,
    endTime: null,
    duration: null,
  };
  if(selectedHours[selectedResource]!==undefined){ 
  const hours = selectedHours[selectedResource];
  let start = null;
  let end = null;
  for (let i = 0; i < hours.length; i++) {
    if (hours[i] === 2) {
      if (start === null) {
        start = i;
      }
      end = i;
    }
  }
  if (start !== null && end !== null) {
    reservationData.startTime = `${start}:00`;
    reservationData.endTime = `${end+1}:00`;
    reservationData.duration = `${end+1 - start} hours`;

  }
}
  HandleReservation(reservationData);
}, [selectedResource,selectedHours]);
  return (
    <div className='p-4 my-2 border border-gray-400'>
      <div className='flex  justify-between'>
        <div className='flex-shrink-0 flex items-center gap-4'>
          <div className='flex gap-4'>
            <button onClick={() => handleDateChange("decrement")}>❮</button>
            <TextField
              label="Start Date"
              type="date"
              value={selectedDate}
              color="success"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <button onClick={() => handleDateChange("increment")}>❯</button>
          </div>
          <div className='flex gap-4'>
            <div className='notAvailable p-2'>Not Available</div>
            <div className='occupied p-2 text-white'>Booked</div>
            <div className='selected p-2 text-white'>Selected</div>
            <div className='available p-2 text-white'>Available</div>
          </div>
        </div>
      </div>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Resource</th>
            {[...Array(totalHours).keys()].map((hour) => (
              <th key={hour}>{hour+1}:00</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedHours).map((resourceName, index) => (
            <tr key={index}>
              <td>{resourceName}</td>
              {selectedHours[resourceName].map((isOccupied, hour) => (
                <td
                  key={hour}
                  className={isOccupied===0 ? 'occupied' : isOccupied===1 ? 'available':isOccupied===-1?"notAvailable":'selected'}
                  onClick={() => handleCellClick(resourceName, hour)}
                  style={{ cursor: isOccupied===1 ? 'pointer' : 'not-allowed',fontSize: '10px'}}
                >
                  {isOccupied===0 ? 'Booked' : isOccupied===2 ? 'selected' : isOccupied===-1?"Not Available" :'available'}
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
