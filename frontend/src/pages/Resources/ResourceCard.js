import React from 'react'

function ResourceCard({resource}) {
  return (
    <div className='flex m-2'>
        <div className='flex gap-2'>
            <div>
            <img 
                src={resource.pictures?.length?"http://localhost:8080/"+resource.pictures[0].url:"https://via.placeholder.com/150"}
                className='w-60 h-40 rounded' 
                alt="resource"
            />
            </div>
            <div className='max-w-80'>
                <div className='flex'>
                <h3 className='basis-1/3'>Resource Name</h3>
                <p className='basis-2/3'>{resource.name}</p>
                </div>
                <div className='flex'>
                <p className='basis-1/3'>Location</p>
                <p className='basis-2/3'>{resource.location}</p>
                </div>
                <div className='flex'>
                <p className='basis-1/3'>Capacity</p>
                <p className='basis-2/3'>{resource.capacity}</p>
                </div>
                <div className='flex'>
                <p className='basis-1/3'>Type</p>
                <p className='basis-2/3'>{resource.type}</p>
                </div>
                <div className='flex'>  
                <p className='basis-1/3'>Description</p>
                <p className='basis-2/3'>{resource.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ResourceCard