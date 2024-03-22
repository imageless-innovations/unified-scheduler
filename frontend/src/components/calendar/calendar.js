import React, { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import './calendar.css';
const Calendar = ({resources,HandleReservation,Reservation,reservations,fetchReservations}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedHours, setSelectedHours] = useState({});
  const [totalHours, setTotalHours] = useState(23);


  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    fetchReservations(new Date().toISOString().split('T')[0])
  }, []);

  useEffect(() => {
    populateReservedHours();
  }, [reservations]);


  
  const populateReservedHours = () => {
    reservations.forEach((reservation) => {
      const startdate = new Date(reservation.startDateTime);
      const enddate = new Date(reservation.endDateTime);
      const date = startdate.getUTCDate();
      console.log("date==",date);
      const currdate=new Date(selectedDate).getUTCDate();
      if (date !== currdate) return;
      const starthour = startdate.getUTCHours();
      const endhour = enddate.getUTCHours();
      console.log("starthour==",starthour,endhour,reservation);
      console.log("selectedHours==",selectedHours);
      const resource = reservation.resourceID;
      setSelectedHours(prevSelectedHours => {
        const updatedHours = { ...prevSelectedHours };
        if(updatedHours){
                updatedHours[resource.name]?.fill(0,starthour,endhour);
        }
        return updatedHours;
      });
    });
  };
  

  const handleDateChange = (type) => {
    const date = new Date(selectedDate);
    type === 'decrement' ? date.setDate(date.getDate() - 1) : date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleCellClick = (resource, hour) => {
    const updatedHours = { ...selectedHours };
    if(updatedHours[resource.name][hour]===0) return alert('This slot is already booked');
    if(updatedHours[resource.name][hour]===-1) return alert('This slot is Not available for booking');
    if (updatedHours[resource.name][hour] === 2) {
      updatedHours[resource.name][hour] = 1;
    } else {
      updatedHours[resource.name][hour] = 2;
    }
    setSelectedHours(updatedHours);
    setSelectedResource(resource);
  }
  const updateSelectedHours = (resources, selectedDate) => {
    const selectedHours = {};
  
    resources.forEach(resource => {
      const resourceData = [];
      const { availability } = resource.resourceavailabilityID || {};
  
      for (let i = 1; i <= totalHours; i++) {
        const date = new Date(selectedDate);
        date.setHours(i);
        const weekDay = date.getDay() + 1;
  
        let hour = -1;
        if (availability) {
          if ('0' in availability) {
            const weekDayAvailability = availability['0'];
            hour = getHourAvailability(i, weekDayAvailability.start, weekDayAvailability.end);
          } else if (weekDay in availability) {
            const weekDayAvailability = availability[weekDay];
            hour = getHourAvailability(i, weekDayAvailability.start, weekDayAvailability.end);
          }
        }
        resourceData.push(hour);
      }
  
      selectedHours[resource.name] = resourceData;
    });
  
    return selectedHours;
  };
  
  const getHourAvailability = (hour, start, end) => {
    return isHourInRange(hour, start, end) ? 1 : -1;
  };
  
  const isHourInRange = (hour, start, end) => {
    const startTime = parseInt(start.split(':')[0]);
    const endTime = parseInt(end.split(':')[0]);
  
    hour = parseInt(hour);
    if (endTime === 0 && hour === 0) {
      return true; // Special case: midnight is considered within the range
    }
  
    if ((hour >= startTime && hour < endTime) || (hour === startTime && hour === endTime)) {
      return true; // Hour is within the range
    } else {
      return false; // Hour is not within the range
    }
  };
  
  const updateSelectedHoursAndHandle = () => {
    if (resources) {
      const selectedHours = updateSelectedHours(resources, selectedDate);
      setSelectedHours(selectedHours);
      populateReservedHours();

    }
  };
  useEffect(() => {
    updateSelectedHoursAndHandle()
   
  }, [resources,selectedDate]);

const handleReservationChange=()=>{
  if(selectedResource!==null && selectedHours[selectedResource.name]!==undefined){
  const hours = selectedHours[selectedResource.name];
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
  const reservationData = {
    resourceName: selectedResource?.name,
    date: selectedDate,
    startTime: null,
    endTime: null,
    duration: null,
    resourceId:selectedResource?._id
  };
  if (start !== null && end !== null) {
    reservationData.startTime = `${start}:00`;
    reservationData.endTime = `${end+1}:00`;
    reservationData.duration = `${end+1 - start} hours`;
  }
  HandleReservation(reservationData);
}
}
useEffect(() => {
  handleReservationChange()
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
            <div className='occupied p-2'>Booked</div>
            <div className='selected p-2'>Selected</div>
            <div className='available p-2'>Available</div>
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
          {resources.map((resource, index) => (
            <tr key={index}>
              <td>{resource.name}</td>
              {selectedHours[resource?.name]?.map((isOccupied, hour) => (
                <td
                  key={hour}
                  className={isOccupied===0 ? 'occupied' : isOccupied===1 ? 'available':isOccupied===-1?"notAvailable":'selected'}
                  onClick={() => handleCellClick(resource, hour)}
                  style={{ cursor: isOccupied===1 ? 'pointer' : 'not-allowed',fontSize: '10px'}}
                >
                 
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
