/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Image from 'next/image';

const Loader = () => {
  return (
    <div className='text-slate-gray fixed z-40 bg-white-400  w-screen h-screen top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-60 flex items-center justify-center'>
      <div className=' loader relative w-36 h-36 flex  items-center justify-center'>
        <Image
          className='logo w-24 h-24 bg-blue-50'
          alt='Next.js Logo'
          src='/cow.svg'
          quality={100}
          height={100}
          width={100}
        ></Image>
      </div>
    </div>
  );
};

export default Loader;
