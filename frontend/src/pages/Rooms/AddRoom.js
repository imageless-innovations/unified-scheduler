import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContexts'
import {createresource} from '../../apis/Api'
import { getminpolicy } from '../../apis/Api'
import { useState , useEffect} from 'react'
function AddRoom() {
  const [policy, setPolicy] = useState([]);
  const fetchMinPolicy = async () => {
    const policy = await getminpolicy(user.token);
    console.log('policy', policy);
    setPolicy(policy.data);
  };
  useEffect(() => {
    fetchMinPolicy();
  }, []);

  const { user } = useAuth();
  const validationSchema = yup.object({
    resourceName: yup
      .string('Enter Resource Name')
      .required('Resource Name is required'),
    type: yup
      .string('Enter Resource type')
      .required('Resource type is required'),
    capacity: yup
      .number('Enter capacity')
      .required('capacity is required')
      .positive(),
    location: yup
      .string('Enter location')
      .required('location is required'),
    description: yup
      .string('Enter description')
  });
  const formik = useFormik({
    initialValues: {
      resourceName: '',
      type: 'room',
      location: '',
      capacity: 1,
      description: '',
      pictures: null,
      policy:''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      const formData = new FormData();
      formData.append('name', values.resourceName);
      formData.append('type', values.type);
      formData.append('location', values.location);
      formData.append('capacity', values.capacity);
      formData.append('description', values.description);
      formData.append('files', values.pictures);
      formData.append('policyId', values.policy);
      const res= await createresource(formData, user.token);
      console.log('res', res);
    },
  });

  return (
    <div>
      <h2>Add Room</h2>
     <form  className="flex flex-col w-1/2 gap-4 mx-auto mt-4 p-4 border border-gray-300 rounded-md bg-gray-100"
            onSubmit={formik.handleSubmit}>
    {/* Bind input fields directly */}
    <input
      type="text"
      name="resourceName"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="Resource Name"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.resourceName}
    />
    {formik.touched.resourceName && formik.errors.resourceName ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.resourceName}</div>
    ) : null}

    <select
      name="location"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="Select Location"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.location}
      error={formik.touched.email && Boolean(formik.errors.resourceName)}

    >
      <option value="" label="Select Location" />
      <option value="location1" label="Location 1" />
      <option value="location2" label="Location 2" />
    </select>
    {formik.touched.location && formik.errors.location ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.location}</div>
    ) : null}
    <select
      name="policy"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="Select Policy"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.policy}
      error={formik.touched.email && Boolean(formik.errors.resourceName)}
    >
      <option value="" label="Select Policy" />
      {policy.map((policy)=>{
        return <option value={policy._id} label={policy.name} />
      })}
    </select>
    {formik.touched.policy && formik.errors.policy ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.policy}</div>
    ) : null}
    <select
      name="type"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="Select Type"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.type}
    >
      <option value="" label="Select Type" />
      <option value="1" label="room" />
      <option value="2" label="device" />
    </select>
    {formik.touched.type && formik.errors.type ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.type}</div>
    ) : null}

    <input
      type="number"
      name="capacity"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="capacity"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.capacity}
      error={formik.touched.email && Boolean(formik.errors.resourceName)}
    />
    {formik.touched.capacity && formik.errors.capacity ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.capacity}</div>
    ) : null}

    <textarea
      name="description"
      className="p-2 border border-gray-300 rounded-md"
      placeholder="description"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.description}
      error={formik.touched.email && Boolean(formik.errors.resourceName)}

    />
    {formik.touched.description && formik.errors.description ? (
      <div className='border border-red-400 rounded p-2'>{formik.errors.description}</div>
    ) : null}
    <input
      type="file"
      name="pictures"
      className="p-2 border border-gray-300 rounded-md"
      onChange={(event) => {
        formik.setFieldValue('pictures', event.currentTarget.files[0]);
      }}
      error={formik.touched.email && Boolean(formik.errors.resourceName)}
    />

    <button  type='submit' className="p-2 border border-gray-300 rounded-md bg-gray-400" >Submit</button>
  </form>
    </div>
  );
}

export default AddRoom;
