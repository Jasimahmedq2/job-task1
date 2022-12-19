import React, { useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../firebase.init';

const Login = () => {

  const [email, setEmail] = useState('')


  // login

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, verror] = useSendPasswordResetEmail(
    auth
  );

  const { register, reset, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = data => {
    setEmail(data?.email)
    const email = data?.email;
    const password = data?.password
    signInWithEmailAndPassword(email, password)
    console.log(data)
    reset()
  }

  const handleResetPassword = async () => {
    const success = await sendPasswordResetEmail(
      email
    );
    if (success) {
      alert('Sent email');
    }
  }
  let errorMessage;

  if (loading || sending) {
    return <p className='text-center font-bold text-xl'>Loading...</p>
  }

  let userSingUp;
  if (user) {
    userSingUp = <p className='text-blue-400 font bold'>successfully Login {user.user.email}</p>
  }


  if (error || verror) {
    errorMessage = <p className='text-sm text-red-400'>{error?.message || verror?.message}</p>
  }


  return (
    <div className='sm:w-1/2 w-11/12 mx-auto'>
      <h2 className='font-bold text-xl text-center'>REGISTER</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='enter your email'
          {...register("email", { required: true })}
        />
        {errors.email?.type === 'required' && <p className='text-sm text-red-400'>email is required</p>}

        <input
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
          placeholder='password'
          {...register("password", { required: true })}
        />
        {errors.password?.type === 'required' && <p className='text-sm text-red-400'>password is required</p>}




        {errorMessage}

        <button
          className='text-sm text-blue-300 px-2'
          type='button'
          onClick={handleResetPassword}>reset password?</button>

        <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' value="Login" type="submit" />
      </form>
      {userSingUp}
    </div>
  );
}

export default Login;