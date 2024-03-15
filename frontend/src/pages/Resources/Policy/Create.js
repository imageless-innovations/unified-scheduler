import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {createpolicy} from '../../../apis/Api'
import {useAuth} from '../../../contexts/AuthContexts'
import {useAlert} from '../../../contexts/AlertsContext'
const weekdays = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const generateRandomId=()=>Math.random().toString(36).substring(7);
function CreatePolicy() {
    const {addAlert}=useAlert()

    const {user}=useAuth();
    const formik = useFormik({
        initialValues: {
            name: '',
            maxReserveTime: '',
            reserveTimeInterval: '',
            availability: {
                0: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                1: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                2: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                3: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                4: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                5: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                6: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                },
                7: {
                    isChecked: false,
                    startTime: '',
                    endTime: '',
                
            },
        }
    },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is Required'),
            maxReserveTime: Yup.number()
                .required('Max Reserve Time is Required'),
            reserveTimeInterval: Yup.number()
                .required('Reserve Time Interval is Required'),
            availability: Yup.object().required('availability is Required'),
        }),
        onSubmit: async (values,{resetForm}) => {
            console.log('values', values.availability);
            const availability={}
            Object.values(values.availability).forEach((day, index) => {
                if (day.isChecked) {
                    availability[index] =  {
                        start: day.startTime,
                        end: day.endTime,
                    };
                }
            });
            const policyData = { ...values, availability };
            const data = await createpolicy(policyData, user.token);
            addAlert({id:generateRandomId(),msg:data.message,title:data.success?"success":"error"})
            resetForm();
        },
    });

    return (
        <div>
            <h1>Create Policy</h1>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center items-center w-1/2 gap-2'>
                    <input type="text" placeholder="Name" {...formik.getFieldProps('name')} className='p-2 border border-gray-300 w-full rounded' />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='bg-red-400 w-full text-center p-2 rounded'>{formik.errors.name}</div>
                    ) : null}
                    <input type="number" placeholder="Max Reserve Time in minutes" {...formik.getFieldProps('maxReserveTime')} className='p-2 border border-gray-300 w-full' />
                    {formik.touched.maxReserveTime && formik.errors.maxReserveTime ? (
                        <div className='bg-red-400 w-full text-center p-2'>{formik.errors.maxReserveTime}</div>
                    ) : null}
                    <input type="number" placeholder="Reserve Time Interval in minutes" {...formik.getFieldProps('reserveTimeInterval')} className='p-2 border border-gray-300 w-full' />
                    {formik.touched.reserveTimeInterval && formik.errors.reserveTimeInterval ? (
                        <div className='bg-red-400 w-full text-center p-2'>{formik.errors.reserveTimeInterval}</div>
                    ) : null}

                    <div className='w-full'>
                        <h1>Availability</h1>
                        <div className='flex flex-wrap'>
                        <div  className='basis-1/2'>
                        <FormControlLabel
                            label="All Days"
                            control={
                                <Checkbox
                                    checked={formik.values.availability[0].isChecked}
                                    onChange={event=>{
                                        const isChecked=event.target.checked;
                                        formik.setFieldValue(`availability[0].isChecked`, isChecked);
                                    }}
                                />
                            }
                        />
                        </div>
                       {formik.values.availability[0].isChecked && <div className='flex gap-2 basis-1/2'>
                                            <input
                                                type="time"
                                                placeholder="Start Time"
                                                {...formik.getFieldProps(`availability[0].startTime`)}
                                                className='p-2 border border-gray-300 w-full'
                                            />
                                            <input
                                                type="time"
                                                placeholder="End Time"
                                                {...formik.getFieldProps(`availability[0].endTime`)}
                                                className='p-2 border border-gray-300 w-full'
                                            />
                        </div>
                        }
                         {formik.touched.availability && formik.values.availability[0].isChecked && formik.errors.availability && formik.errors.availability[0] ? (
                                        <div className='bg-red-400 w-full text-center my-2 p-2'>{formik.errors.availability[0].startTime || formik.errors.availability[0].endTime}</div>
                                    ) : null}
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'column'}} >
                            {!formik.values.availability[0].isChecked && weekdays.map((day, index) => (
                                index !== 0 &&
                                <div key={index} className='flex flex-wrap'>
                                    <div className='basis-1/2'>
                                    <FormControlLabel
                                        label={day}
                                        control={
                                            <Checkbox
                                                checked={formik.values.availability[index].isChecked}
                                                onChange={event => {
                                                    const isChecked = event.target.checked;
                                                    formik.setFieldValue(`availability[${index}].isChecked`, isChecked);
                                                }}
                                            />
                                        }
                                    />
                                    </div>
                                    {formik.values.availability[index].isChecked && (
                                        <div className='flex basis-1/2 gap-2'>
                                            <input
                                                type="time"
                                                placeholder="Start Time"
                                                {...formik.getFieldProps(`availability[${index}].startTime`)}
                                                className='p-2 border border-gray-300 w-full'
                                            />
                                            <input
                                                type="time"
                                                placeholder="End Time"
                                                {...formik.getFieldProps(`availability[${index}].endTime`)}
                                                className='p-2 border border-gray-300 w-full'
                                            />
                                        </div>
                                    )}
                                    {formik.touched.availability && formik.values.availability[index].isChecked && formik.errors.availability && formik.errors.availability[index] ? (
                                        <div className='bg-red-400 w-full text-center my-2 p-2'>{formik.errors.availability[index].startTime || formik.errors.availability[index].endTime}</div>
                                    ) : null}
                                </div>))}
                        </Box>
                    </div>
                    <button onClick={formik.handleSubmit} type='button'>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;
