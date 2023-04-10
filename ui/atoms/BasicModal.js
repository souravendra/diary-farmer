import React from 'react';
import Modal from './Modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BasicModal = (props) => {
  const {
    isVisible = true,
    customHeader = '',
    title = '',
    description = '',
    onCancel,
    onOk,
    cancelBtnText = 'Cancel',
    showCancelButton = true,
    showOkButton = true,
    okBtnText = 'Ok',
    toggleModal,
  } = props;
  if (!isVisible) return <></>;
  return (
    <Modal>
      <div className='max-w-lg p-5 relative mx-10  rounded-xl shadow-lg  bg-white '>
        <div className=''>
          <div className=' -mt-3 -mr-2 float-right'>
            <div onClick={toggleModal}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className='text-center p-5 py-2 flex-auto justify-center'>
            <div className='text-center'>{customHeader}</div>
            <h2 className='text-xl font-bold py-4 '>{title}</h2>
            <p className='text-sm text-gray-500 px-4'>{description}</p>
          </div>
          <div className='p-3  mt-2 text-center space-x-4 md:block'>
            {showCancelButton && (
              <button
                className='mb-2 md:mb-0  border border-sky-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider  rounded-full hover:shadow-lg hover:bg-dark-blue-100 focus:outline-none'
                onClick={onCancel}
              >
                {cancelBtnText}
              </button>
            )}
            {showOkButton && (
              <button
                className='mb-2 md:mb-0 bg-dark-blue border border-sky-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-dark-blue-100 focus:outline-none'
                onClick={onOk}
              >
                {okBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BasicModal;
