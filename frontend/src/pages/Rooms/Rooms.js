import React , { useEffect ,useState} from 'react'
import Calendar from '../../components/calendar/calendar';
import {getresources} from '../../apis/Api'
import {useAuth} from '../../contexts/AuthContexts'
function Rooms() {
    const {user}=useAuth();
    const [resources, setResources] = useState([]);
    useEffect(() => {
        getresources(user.token).then((data) => {
            console.log(data);
            setResources(data.data)
        })
    }
    , [])

    return (
        <div>
            <Calendar resources={resources} />
        </div>
    )
}


export default Rooms