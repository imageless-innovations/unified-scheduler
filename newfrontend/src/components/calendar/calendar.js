import React, { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedHours, setSelectedHours] = useState({});

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleDateChange = (type) => {
    const date = new Date(selectedDate);
    type === 'decrement' ? date.setDate(date.getDate() - 1) : date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleCellClick = (resourceName, hour) => {
    if (!dummyOccupancyData[resourceName][hour]) {
      const currHours = selectedHours[resourceName] || [];
      const updatedSelectedHours = {
        ...selectedHours,
        [resourceName]: currHours.includes(hour)
          ? currHours.filter((h) => h !== hour)
          : [...currHours, hour],
      };
      setSelectedResource(resourceName);
      setSelectedHours(updatedSelectedHours);
      console.log(`Hour ${hour} for ${resourceName} is now selected.`, updatedSelectedHours);
    } else {
      console.log(`Hour ${hour} for ${resourceName} is already booked.`);
    }
  };

  const dummyOccupancyData = {
    RESOURCE_NAME_1: [true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true],
    RESOURCE_NAME_2: [true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true],
    // Add more dummy data for additional resources
  };

  return (
    <div>
      <h1>Calendar</h1>
      <div className='flex border py-2 justify-between'>
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
            {[...Array(20).keys()].map((hour) => (
              <th key={hour}>{hour}:00</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(dummyOccupancyData).map((resourceName, index) => (
            <tr key={index}>
              <td>{resourceName}</td>
              {dummyOccupancyData[resourceName].map((isOccupied, hour) => (
                <td
                  key={hour}
                  className={isOccupied ? 'occupied' : selectedHours[resourceName]?.includes(hour) ? 'selected' : 'available'}
                  onClick={() => handleCellClick(resourceName, hour)}
                  style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
                >
                  {isOccupied ? 'Booked' : selectedHours[resourceName]?.includes(hour) ? 'selected' : 'available'}
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
