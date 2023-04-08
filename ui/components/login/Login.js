/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PrimaryButton, TextField, PasswordField } from 'atoms/index.js';
import { login } from 'services/session.service.js';
import {
  getAuth,
  isAuthenticated,
  setAuth,
} from 'services/identity.service.js';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log(process.env.NEXT_PUBLIC_S3_BUCKET_NAME);
  // console.log('S3 BUCKET NAME');

  const loginUser = async () => {
    if (!email || !password) set;
    setLoading(true);
    const response = await login(email, password);
    console.log('logging response');
    console.log(response);
    if (response.status == 200) {
      const user = response.data.user;
      setAuth(user);
      const userdata = getAuth();
      console.log(userdata);
      router.push('/tasks');
    } else {
      try {
        setMessage(response.response.data.error.message);
      } catch (e) {
        setMessage('Error, please check & try again');
      }
    }
    setLoading(false);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      loginUser();
    }
  };

  useEffect(() => {
    const auth = getAuth();
    if (isAuthenticated(auth)) {
      router.push('/tasks');
    } else {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress, false);
    return () => {
      document.removeEventListener('keydown', handleKeypress, false);
    };
  });

  return (
    <div className='relative w-full h-full py-40 min-h-screen bg-white'>
      <Head>
        <title>Dairy 2 Do | Login</title>
      </Head>

      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h5 className='text-slate-gray text-base font-semibold'>
                    Sign In
                  </h5>
                  {message != '' && (
                    <div className='text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500'>
                      <span className='text-xl inline-block mr-5 align-middle'>
                        <i className='fas fa-bell'></i>
                      </span>
                      <span className='inline-block align-middle mr-8'>
                        {message}
                      </span>

                      <button className='absolute bg-transparent text-2xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none'>
                        <span>×</span>
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <form>
                    <div className='relative w-full mb-3'>
                      <TextField
                        label='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                      ></TextField>
                    </div>

                    <div className='relative w-full mb-3'>
                      <PasswordField
                        placeholder='Password'
                        label='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></PasswordField>
                    </div>

                    <div className='text-center mt-6'>
                      <PrimaryButton
                        onClick={loginUser}
                        loading={loading}
                        title={'SignIn'}
                      ></PrimaryButton>
                    </div>
                    {/* <span
                      className='text-dark-blue cursor-pointer text-sm'
                      // onClick={() => router.push('/some link')} add some functionality here if there's time
                    >
                      Forgot password?
                    </span> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='flex items-center justify-center w-full h-12'>
        <a
          className='flex items-center justify-center font-bold text-slate-gray'
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Dairy 2 Do |{' '}
          <Image
            src='/cow.svg'
            alt='Logo'
            className='h-7 ml-1'
            quality={100}
            height={50}
            width={50}
          />
        </a>
      </footer>
    </div>
  );
};
export default Login;
