/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { getAuth } from '@/services/identity.service';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSidebarConfig } from './SideBarConfiguration';

const Sidebar = (props) => {
  const router = useRouter();
  const [sidebarItems, setSidebarItems] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    if (auth) {
      const role = auth.role;
      setSidebarItems(getSidebarConfig(role));
    }
  }, []);

  return (
    <div
      className={`sidebar ${
        props.menuOpen ? 'left-0' : '-left-96'
      } z-30 bg-white fixed top-10  border h-full block  lg:flex lg:left-0 lg:flex-col lg:fixed  lg:h-full lg:top-10 lg:border-none ease-in-out transition-all `}
    >
      <div className='text-center'>
        <Image
          className='logo'
          alt='cow pic'
          src='/cow.svg'
          quality={100}
          height={180}
          width={180}
        ></Image>
      </div>

      {sidebarItems.map((items) => (
        <div
          key={items.url}
          className={`sidebar-element ${
            router.pathname.startsWith(items.url) && 'sidebar-element-active'
          }`}
          onClick={() => {
            router.push(items.url);
            props.handleMenu();
          }}
        >
          <p className='w-full h-full'>{items.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Sidebar;
