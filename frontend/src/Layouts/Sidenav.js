// SideNav.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { items } from './config'; // Make sure this import is correct
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
const SideNav = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("Home");
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {items.map((item, index) => (
          <ListItem disablePadding className='flex flex-col justify-start items-start' key={index}>
            <div className="w-full">
              <ListItemButton sx={{ backgroundColor: item.title === currentPage && "var(--primary-color)" }} onClick={() => handleClick(item.path)}>
                <ListItemIcon >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} onClick={()=>{setCurrentPage(item.title)}}/>
                {item.children?.length > 0 && <ArrowDropDownOutlinedIcon />}
              </ListItemButton>
            </div>
            {(currentPage === item.title || (item.children !== undefined && item.children.filter((i) => i.title === currentPage).length > 0)) && <div>
              {item.children?.map((child, index) => (
                <ListItem key={child.title} disablePadding onClick={() => handleClick(child.path)}>
                  <ListItemButton sx={{ backgroundColor: child.title === currentPage && "var(--primary-color)" }} onClick={() => handleClick(item.path)}>
                    <ListItemIcon>
                      {child.icon}
                    </ListItemIcon>
                    <ListItemText primary={child.title} onClick={()=>{setCurrentPage(child.title)}}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </div>}
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default SideNav;
