import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useNavigate } from 'react-router';

const SingUp = () => {

  const [value, setValue] = useState()

// register

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [sendEmailVerification, sending, verror] = useSendEmailVerification(
    auth
  );

  const { register, reset, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async(data) => {
    const email = data?.email;
    const password = data?.password
    createUserWithEmailAndPassword(email, password)

    const success = await sendEmailVerification();
    if (success) {
      alert('Sent email');
    }

    console.log(data)
    reset()
    setValue('')
  }
  let errorMessage;

  if(loading || sending){
    return <p className='text-center font-bold text-xl'>Loading...</p>
  }

  let userSingUp;
  if(user){
   userSingUp = <p className='text-blue-400 font bold'>successfully register {user.user.email}</p>
  }


  if (error || verror) {
    errorMessage = <p className='text-sm text-red-400'>{error.message || verror?.message}</p>
  }

  return (
    <div className='sm:w-1/2 w-11/12 mx-auto'>
      <h2 className='font-bold text-xl text-center'>REGISTER</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='enter your name'
          {...register("name", { required: true })}
        />
        {errors.name?.type === 'required' && <p className='text-sm text-red-400'>First name is required</p>}

        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='enter your email'
          required
          {...register("email", { required: true })}
        />
        {errors.email?.type === 'required' && <p className='text-sm text-red-400'>email is required</p>}

        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='password'
          {...register("password", { required: true })}
        />
        {errors.password?.type === 'required' && <p className='text-sm text-red-400'>password is required</p>}


        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='enter your address'
          {...register("address", { required: true })}
        />
        {errors.address?.type === 'required' && <p className='text-sm text-red-400'>address is required</p>}

        <PhoneInput
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          {...register("phone", { required: true })}
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
        />
        {errors.phone?.type === 'required' && <p className='text-sm text-red-400'>phone number is required</p>}


        {errorMessage}
        <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' value="register" type="submit" />
      </form>
    {userSingUp}
    </div>
  );
}

export default SingUp;