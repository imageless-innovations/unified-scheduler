import React , { useEffect ,useState} from 'react'
import Calendar from '../../components/calendar/calendar';
import {getresources} from '../../apis/Api'
import {useAuth} from '../../contexts/AuthContexts'
import ReservationModal from '../../components/modals/ReservationModal';
function Rooms() {
    const {user}=useAuth();
    const [resources, setResources] = useState([]);
    const [reservation, setReservation] = useState(null);
    useEffect(() => {
        getresources(user.token).then((data) => {
            console.log(data);
            setResources(data.data)
        })
    }
    , [])
    const HandleReservation=(data)=>{
        console.log(data);
        setReservation(data);
    }

    return (
        <div className='h-full'>
            <Calendar resources={resources} HandleReservation={HandleReservation} reservation={reservation}/>
            <div >
                 <ReservationModal titile="Reservation Summary" description="" reservation={reservation}/>
            </div>
        </div>
    )
}


export default Rooms