import React,{useState,useEffect} from 'react'
import {useAuth} from '../../../contexts/AuthContexts'
import {getpolicy} from '../../../apis/Api'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {useNavigate} from 'react-router-dom'
function ResourcePolicy() {
    const navigate=useNavigate();
    const {user}=useAuth();
    const [policys,setPolicys]=useState(null);
    const [selectedPolicy,setSelectedPolicy]=useState([]);
    useEffect(() => {
        getpolicy(user.token).then((data) => {
            if(data.success){
                console.log(data);
                setPolicys(data.data);
            }
        })
    }
    , [])
    const handlePolicyDropdown=(id)=>{
        if(selectedPolicy.includes(id)){
            setSelectedPolicy(selectedPolicy.filter((policy)=>policy!==id));
            return;
        }
        else{
            setSelectedPolicy([...selectedPolicy,id]);
        }
    }
const handleAddPolicy=()=>{
    console.log('add policy');
    navigate("/resources/policy/create");
}
  return (
    <div>
        <div className='flex items-center justify-between py-2'>
            <h1>Resource Policy</h1>
            <button style={{backgroundColor:'var(--button-color)'}} className='p-2 rounded' onClick={handleAddPolicy}>Add</button>
        </div>
        <div>
            {policys?.map((policy)=>{
                return (
                <div key={policy._id} style={{backgroundColor:'var(--text-color)' }}
                    className='p-2 rounded'>
                    <div className='flex '>
                    <h3>{policy.name}</h3>
                    <ArrowDropDownOutlinedIcon onClick={()=>{handlePolicyDropdown(policy._id)}}/>
                    </div>
                    {selectedPolicy?.includes(policy._id)&&
                    <div>
                        <div>
                            <h3>Max Reserve Time</h3>
                            <p>{policy.maxReserveTime}</p>
                        </div>
                        <div>
                            <h3>Reserve Time Interval</h3>
                            <p>{policy.reserveTimeInterval}</p>
                        </div>
                        <div>
                            <h3>Availablility Time</h3>
                            <p>{policy.availableTime.map((i)=>{
                                return i.day+" "+i.start+" - "+i.end
                            })}</p>
                        </div>
                        <div>
                            <h3>Max Reserve Time</h3>
                            <p>{policy.maxReserveTime}</p>
                        </div>
                        <div>
                            <h3>Created By</h3>
                            <p>{policy.createdBy.email}</p>
                        </div>

                    </div>
                    }
                    <p>{policy.description}</p>
                </div>
                )
                
            }
            )}
        </div>
    </div>
  )
}

export default ResourcePolicy