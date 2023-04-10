/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Image from 'next/image';

const PageNotFound = () => {
  return (
    <div>
      <div className='flex justify-center '>
        <img src='/error_404.gif' alt='page not found' />
      </div>
      <div className='text-center'>Page not found</div>
    </div>
  );
};
export default PageNotFound;
