import React from 'react'

function ReservationModal({title,description,reservation,HandleCreateReserv}) {
  return (
    <div className='absolute right-10 bottom-10 w-80 '>
        {
            reservation!==null && <div  className="p-4 border border-gray-300  bg-white rounded-lg shadow-lg ">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-gray-600">{description}</p>
                    <div>
                    <h3>Resource Name</h3>
                    <p>{reservation.resourceName}</p>
                    </div>
                    <div>
                    <h3>Date</h3>
                    <p>{reservation.date}</p>
                    </div>
                    <div>
                    <h3>From</h3>
                    <p>{reservation.startTime}</p>
                    </div>
                    <div>
                    <h3>To</h3>
                    <p>{reservation.endTime}</p>
                    </div>
                    <div>
                    <h3>Duration</h3>
                    <p>{reservation.duration}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg" onClick={HandleCreateReserv} disabled={reservation.resourceName===null || reservation.startTime===null || reservation.endTime===null}>Reserve</button>
            </div>
            
        }
    </div>
  )
}

export default ReservationModal