/* eslint-disable react/prop-types */
import React from 'react';

export const PrimaryButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className='bg-dark-blue relative text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
      type='button'
    >
      {props.loading == true && (
        <div className='absolute left-4 animate-spin inline-block rounded-full h-4 w-4 border-b-2 border-white'></div>
      )}
      {props.title}
    </button>
  );
};

export default PrimaryButton;
