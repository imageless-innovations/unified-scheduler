import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import AlertTitle from '@mui/material/AlertTitle';
export default function AlertComp({id,msg,removeAlert,title=null}) {
  return (
    <Alert variant="outlined" icon={<CheckIcon fontSize="inherit" />} severity={title?title:"info"} onClose={()=>{removeAlert(id)}}>
      {title!=null && <AlertTitle>{title}</AlertTitle>} 
      {msg}
    </Alert>
  );
}