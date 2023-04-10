/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Cookies from 'universal-cookie';
import AddTask from '@/components/tasks/AddTask';
import Loader from '@/components/loading/Loader';
import dynamic from 'next/dynamic';
import { getAuth, setAuth, getAllUsers } from 'services/identity.service';
import {
  getTasksPaginated,
  getOneTask,
  updateTask,
} from '@/services/task.service';
import Router from 'next/router';

const DynamicAddTaskWithNoSSR = dynamic(
  () => import('@/components/tasks/AddTask'),
  {
    ssr: false,
  },
);

const AddTaskIndex = ({ auth, users }) => {
  return <DynamicAddTaskWithNoSSR auth={auth} users={users} />;
};

export default AddTaskIndex;

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req.headers.cookie);
  if (cookies.cookies.AUTH) {
    const auth = JSON.parse(cookies.cookies.AUTH);
    setAuth(auth);
    // if (auth.role !== 'FARM_OWNER') Router.replace('/'); //should only be used on client side
    const users_response = await getAllUsers();
    const users = users_response;
    // console.log(users);
    return {
      props: {
        auth,
        users,
      },
    };
  } else {
    return { props: {} };
  }
};
