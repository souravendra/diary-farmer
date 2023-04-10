import React from 'react';
//TODO use portal for proper to avoid popup being child of some divs that can change the view
const Modal = (props) => {
  return (
    <div className='min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-30 '>
      <div className='absolute bg-black opacity-50 inset-0 z-0'></div>
      {props.children || ''}
    </div>
  );
};

export default Modal;
