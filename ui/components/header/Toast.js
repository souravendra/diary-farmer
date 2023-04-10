/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const Toast = forwardRef((props, ref) => {
  const [message, setMessage] = useState(null);
  useImperativeHandle(ref, () => ({
    setToast(newMessage) {
      setMessage(newMessage);
    },
  }));
  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => setMessage(null), 4000);
    }
    return () => {
      message && clearTimeout(timer);
    };
  }, [message]);
  return (
    message && (
      <div className='fixed bottom-3 right-3 flex -flex-col items-end z-10'>
        <div className='py-5 px-10 m-4 text-active-green bg-dark-blue rounded-md relative text-left pr-20'>
          {message}
          <button
            className=' absolute top-0 right-0 mx-2 my-1 text-white font-bold'
            onClick={() => {
              setMessage(null);
            }}
          >
            X
          </button>
        </div>
      </div>
    )
  );
});

export default Toast;
