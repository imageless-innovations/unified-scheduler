import React from 'react'
import Pagination from '../../components/forms/pagination'
import ResourceCard from './ResourceCard'
import { getresources } from '../../apis/Api'
import { useState,useEffect } from 'react'
import Menu from '../../components/menu'
import { useAuth } from '../../contexts/AuthContexts'
import { useNavigate } from 'react-router-dom'
function Resources() {
  const navigate=useNavigate();
  const [resources, setResources] = useState([]);
  const {user}=useAuth();
  const fetchResources = async () => {
    const resources = await getresources(user.token);
    console.log('resources', resources);
    setResources(resources.data);
  };

  useEffect(() => {
    fetchResources();
  }, []); 
  const handleNavigate=(path)=>{
    navigate(path);
  }
  return (
    <div>
      <div>
     
      </div>
      <div className='flex flex-col'>
      <h3>Filter</h3>
      <div className='flex justify-between flex-wrap gap-2'>
      <input type="text" placeholder="name" className="p-1 border border-gray-400 rounded-md basis-1/4"/>  
      <input type="text" placeholder="location" className="p-1 border border-gray-400 rounded-md basis-1/4"/>
      <input type="text" placeholder="type" className="p-1 border border-gray-400 rounded-md basis-1/4"/>
      <input type="text" placeholder="Minimum capacity" className="p-1 border border-gray-400 rounded-md basis-1/4"/>
      </div>
      <div className='py-4  flex gap-4'>
        <button className="px-4 py-2 rounded" style={{backgroundColor:'var(--secondary-color)'}}>Filter</button>
        <button className="px-4 py-2 rounded bg-gray-300">Reset</button>
        <div className='flex flex-row-reverse w-full'>
            {/* <Menu title={"manage"} menuItems={menuItems}/> */}
            <button style={{backgroundColor:'var(--primary-color)'}} className='p-2 rounded' onClick={()=>{handleNavigate('/rooms/add')}}>Add Resource</button>
      </div>
      </div>
      </div>
      <div className='py-2'>
        <p>Rows 1- 10 (50) <span style={{color:'var(--primary-color)'}}>ViewAll</span></p>
      </div>
      <Pagination  itemsPerPage={10} totalItems={10}/>
      <h3>Resources</h3>
      <div className='w-full flex flex-wrap gap-2'>
      {resources?.map((resource)=><ResourceCard  key={resource._id} resource={resource}/>)}
      </div>
      <Pagination  itemsPerPage={10} totalItems={10}/>

    </div>
  )
}

export default Resources