import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import AlertTitle from '@mui/material/AlertTitle';
export default function AlertComp({id,msg,removeAlert,title=null}) {
  return (
    <Alert variant="filled" icon={title==='success'?<CheckIcon fontSize='inherit'/>:<ErrorIcon fontSize="inherit" />} severity={title?title:"info"} onClose={()=>{removeAlert(id)}}>
      {title!=null && <AlertTitle>{title}</AlertTitle>} 
      {msg}
    </Alert>
  );
}