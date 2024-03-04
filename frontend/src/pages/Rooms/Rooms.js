import React from 'react'
import Calendar from '../../components/calendar/calendar';
import Menu from '../../components/menu'
function Rooms() {
    const menuItems=[
        {name:"Add Room",href:"/rooms/add"},
        {name:"Edit Room",href:"/rooms/edit"},
        {name:"Delete Room",href:"/rooms/delete"}]
    return (
        <div>
            <div className='flex justify-between'>
                <h2>Rooms</h2>
                <Menu title={"manage"} menuItems={menuItems}/>
            </div>
            <Calendar />
        </div>
    )
}


export default Rooms