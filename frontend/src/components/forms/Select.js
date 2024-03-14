import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({name,state,key,value,options,handleChange}) {


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={name}>{name}</InputLabel>
        <Select
          labelId={name}
          id={name}
          value={state}
          label={name}
          onChange={(e)=>{handleChange(e.target.value)}}
        >
            {options?.map((i)=>{
                return <MenuItem value={i[value]}>{i[key]}</MenuItem>
            })}
          </Select>
      </FormControl>
    </Box>
  );
}
