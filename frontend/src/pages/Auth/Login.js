import React, { useEffect ,useState} from 'react'
import { useAuth } from "../../contexts/AuthContexts";
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {loginApi} from '../../apis/Api'
function Login() {
const navigate = useNavigate();
const { login,user } = useAuth();
const handleLogin = async () => {
    login({ userName: 'sjahjksh',password: 'sjahjksh',role:"admin"});
}

useEffect(() => {
  if(user){
    navigate('/');
  }
},[user,navigate])
  return (
    <div className='flex justify-center items-center h-screen'>
      <Formik
       initialValues={{ userName: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.userName) {
           errors.userName = 'Required';
         } else if (
           values.userName.length < 4
         ) {
           errors.userName = 'Invalid userName address';
         }
         return errors;
       }}
       onSubmit={async (values, { setSubmitting }) => {
        const data=await loginApi(values.userName,values.password);
        if(data.success){
          login(data.data);
        }
       }}
     >
       {({ isSubmitting }) => (
         <Form className='flex flex-col w-1/3 h-1/3 border border-gray-400 justify-between p-5 '>
           <Field type="text" name="userName" className='border border-gray-400 rounded p-2' />
           <ErrorMessage name="userName" component="div"  />
           <Field type="password" name="password" className='border border-gray-400 rounded p-2'/>
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting} className='bg-gray-400 p-2 rounded'>
            Submit
           </button>
         </Form>
       )}
     </Formik>
  </div>
  )
}

export default Login