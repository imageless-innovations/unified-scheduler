import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function AddRoom() {
  return (
    <div>
      <h2>Add Room</h2>
      <div>
<Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }}
  onSubmit={(values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }}
>
  {({ isSubmitting }) => (
    <Form className='flex flex-col w-1/4 gap-4 mx-auto mt-4 p-4 border border-gray-300 rounded-md bg-gray-100'>
      <Field type="email" name="email" className='p-2 border border-gray-300 rounded-md'/>
      <ErrorMessage name="email" component="div" className='border border-red-600 p-2 rounded-md' />
      <Field type="password" name="password" />
      <ErrorMessage name="password" component="div" />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>

  )}

</Formik>

</div>
    </div>
  )
}

export default AddRoom