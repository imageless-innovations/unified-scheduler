import * as React from 'react';
import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { items } from './config';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default  function SideNav(){
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("Home");
  const handleItemClick = (path) => {
    // Navigate to the specified path
    navigate(path);
  };

return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {items.map((text, index) => (
          <ListItem key={text.title} disablePadding onClick={() => handleItemClick(text.path)}  sx={{backgroundColor:text.title===currentPage && "var(--primary-color)"}}>
            <ListItemButton>
              <ListItemIcon >
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} onClick={()=>{setCurrentPage(text.title)}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
)
}