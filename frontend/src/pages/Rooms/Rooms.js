import React , { useEffect ,useState} from 'react'
import Calendar from '../../components/calendar/calendar';
import {getresources,createreservation,getreservations} from '../../apis/Api'
import {useAuth} from '../../contexts/AuthContexts'
import { useAlert } from '../../contexts/AlertsContext';
import ReservationModal from '../../components/modals/ReservationModal';
function Rooms() {
    const {user}=useAuth();
    const {addAlert} = useAlert();
    const [resources, setResources] = useState([]);
    const [reservation, setReservation] = useState(null);
    const [reservations,setReservations]=useState([]); 
    useEffect(() => {
        getresources(user.token).then((data) => {
            console.log(data);
            setResources(data.data)
        })
    }
    , [])
    const fetchReservations=(date)=>{
        getreservations(user.token,date).then((data)=>{
            setReservations(data.data);
        })
    }
    
    const generateRandomId=()=>Math.random().toString(36).substring(7);
    const HandleReservation=(data)=>{
        console.log(data);
        setReservation(data);
    }
    const HandleReservationSubmit=()=>{
        const reservationObj={}
        reservationObj.resourceID = reservation.resourceId;
        reservationObj.startDateTime = `${reservation.date}T${reservation.startTime.padStart(5, '0')}:00`;
        reservationObj.endDateTime = `${reservation.date}T${reservation.endTime.padStart(5, '0')}:00`;

        console.log(reservationObj);
        createreservation(reservationObj,user.token).then((data)=>{
            if(!data.success){
                if (data.errors){
                    data.errors.map((error)=>{
                        addAlert({id:generateRandomId(),msg:error,title:data.success?"success":"error"})
                    })
                }
                else{
                    addAlert({id:generateRandomId(),msg:data.message,title:data.success?"success":"error"})
                }
            }
            else{
                addAlert({id:generateRandomId(),msg:data.message,title:data.success?"success":"error"})
                fetchReservations()
            }
        })
    }

    return (
        <div className='h-full'>
            <Calendar resources={resources} HandleReservation={HandleReservation} reservation={reservation} reservations={reservations} fetchReservations={fetchReservations}/>
            <div >
                 <ReservationModal titile="Reservation Summary" description="" reservation={reservation} HandleCreateReserv={HandleReservationSubmit} />
            </div>
        </div>
    )
}


export default Rooms