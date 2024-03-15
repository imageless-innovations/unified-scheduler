import React, { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './calendar.css';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const Calendar = ({resources}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedHours, setSelectedHours] = useState({});
  const [totalHours, setTotalHours] = useState(20);
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
      updatedHours[resourceName][hour] = 0;
    } else {
      updatedHours[resourceName][hour] = 2;
    }
    setSelectedHours(updatedHours);
    setSelectedResource(resourceName);
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
        console.log("weekDay",weekDay);
        console.log("resource.resourceavailabilityID",resource);
        const weekDayAvailability = resource.resourceavailabilityID?.availability?.find(i=>i.day===days[weekDay]);
        console.log("weekDayAvailability",weekDayAvailability);
        resourceData.push(1);
      }
      ReservationsData[resource.name] = resourceData;
    });
    setSelectedHours(ReservationsData);
    console.log(ReservationsData);
   }
  }, [resources]);




  return (
    <div className='p-4 my-2 border border-gray-400'>
      <div className='flex border justify-between'>
        <div className='flex-shrink-0'>
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
                  className={isOccupied===0 ? 'occupied' : isOccupied===1 ? 'available':'selected'}
                  onClick={() => handleCellClick(resourceName, hour)}
                  style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
                >
                  {isOccupied===0 ? 'Booked' : isOccupied===2 ? 'selected' : 'available'}
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
