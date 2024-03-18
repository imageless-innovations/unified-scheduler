import React, { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './calendar.css';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Calendar = ({resources}) => {
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
    console.log("uupupu=",updatedHours[resourceName][hour],resourceName);
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
  console.log("hour",hour,start,end,startTime,endTime);
    if (endTime === 0 && hour === 0) {
      return 1; // Special case: midnight is considered within the range
    }
  
    if ((hour >= startTime && hour < endTime) || (hour === startTime && hour === endTime)) {
      return 1; // Hour is within the range
    } else {
      return -1; // Hour is not within the range
    }
  }


  useEffect(() => {
   if(resources){
    const ReservationsData = {};
    resources.map((resource) => {
      const resourceData = [];
      for (let i = 1; i <= totalHours; i++) {
        const date= new Date(selectedDate);
        date.setHours(i);
        const weekDay = date.getDay();
        const availability = resource.resourceavailabilityID?.availability
        console.log("availability",availability);
        if('0' in availability && Object.keys(availability).length===1){
          const weekDayAvailability = availability[weekDay]
          console.log("weekDayAvailability",weekDayAvailability);
          if (weekDayAvailability) {
          const hour=isHourInRange(i, weekDayAvailability.start, weekDayAvailability.end);
          console.log("hour",hour);
          resourceData.push(hour);
          }
        }
        else{
          if(availability[weekDay]===0){
            resourceData.push(-1);
            continue;
          }
        }
    
      }
      ReservationsData[resource.name] = resourceData;
    });
    setSelectedHours(ReservationsData);
    console.log(ReservationsData);
   }
  }, [resources]);




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
        {selectedResource && selectedHours[selectedResource]?.length > 0 && (
          <div className='border border-gray-300 w-1/4 p-2'>
            <div>
              <h1>Book Resource </h1>
              <h2>{selectedResource}</h2>
            </div>
            <div>
              <div>Date: {selectedHours[selectedResource]?.[0]}Hour</div>
              <div>Time: {selectedHours[selectedResource]?.slice(-1)[0]}Hour</div>
              <button>Book</button>
            </div>
          </div>
        )}
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
