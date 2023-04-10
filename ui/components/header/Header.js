/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { getAuth, removeAuth } from '@/services/identity.service';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Toast from './Toast';

library.add(fas);

const Header = (props) => {
  const toastRef = useRef();
  const router = useRouter();
  const [profileClicked, setProfileClicked] = useState(false);
  const [auth, setAuth] = useState();
  const wrapperRef = useRef(null);
  const [caret, setCaret] = useState('caret-up');

  const capitalize = (a) => {
    return a ? a.charAt(0).toUpperCase() + a.slice(1) : '';
  };

  const beautify_role = (r) => {
    if (!r) return '';
    const a = r.split('_')[0].toLowerCase();
    const b = r.split('_')[1].toLowerCase();
    return capitalize(a) + ' ' + capitalize(b);
  };

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      setAuth(auth);
    }
  }, []);

  useEffect(() => {
    if (profileClicked) setCaret('caret-down');
    else setCaret('caret-up');
  }, [profileClicked]);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setProfileClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  return (
    <>
      <Toast ref={toastRef}></Toast>
      <div className='w-full h-10 p-2  flex text-center justify-between lg:justify-between items-center fixed z-30 top-0 bg-white border'>
        <div className='flex'>
          <button
            className='cursor-pointer text-xl leading-none px-3 py-1  border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => props.handleMenu()}
          >
            <span
              className={`block relative w-6 h-px rounded-sm bg-dark-blue`}
            ></span>
            <span
              className={`block relative w-6 h-px rounded-sm bg-dark-blue mt-1`}
            ></span>
            <span
              className={`block relative w-6 h-px rounded-sm bg-dark-blue mt-1`}
            ></span>
          </button>
          <div className='text-black'>
            {router.pathname.split('/')[1].toUpperCase()}
          </div>
        </div>
        <div className='text-center block lg:hidden'>
          <Image
            className='logo'
            alt='cow pic'
            src='/cow.svg'
            quality={100}
            height={40}
            width={40}
          ></Image>
        </div>
        <div
          className='text-right pr-1 sm:pr-10 flex flex-col items-center justify-center '
          ref={wrapperRef}
        >
          <div
            className='cursor-pointer'
            onClick={() => {
              setProfileClicked(!profileClicked);
            }}
          >
            <span>
              {auth &&
                `${
                  capitalize(auth?.name) +
                    ' | ' +
                    `${beautify_role(auth?.role)}` || 'N/A'
                }`}
            </span>
            <FontAwesomeIcon icon={caret} className='font-thin text-sm mx-2' />
          </div>
        </div>
        {profileClicked && (
          <div className='absolute flex flex-col top-9 right-12 bg-white border rounded-md px-2'>
            <button
              className='text-center p-1 '
              onClick={() => {
                removeAuth();
                router.push('/');
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
