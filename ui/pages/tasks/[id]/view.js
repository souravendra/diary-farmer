/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Cookies from 'universal-cookie';
import EditTask from '@/components/tasks/EditTask';
import Loader from '@/components/loading/Loader';
import dynamic from 'next/dynamic';
import { getAuth, setAuth, getAllUsers } from 'services/identity.service';
import {
  getTasksPaginated,
  getOneTask,
  updateTask,
} from '@/services/task.service';
import Router from 'next/router';

const DynamicEditTaskWithNoSSR = dynamic(
  () => import('@/components/tasks/EditTask'),
  {
    ssr: false,
  },
);

const EditTaskIndex = ({ auth, users, task }) => {
  return <DynamicEditTaskWithNoSSR auth={auth} users={users} task={task} />;
};

export default EditTaskIndex;

export const getServerSideProps = async ({ params, req, res }) => {
  const cookies = new Cookies(req.headers.cookie);
  if (cookies.cookies.AUTH) {
    const auth = JSON.parse(cookies.cookies.AUTH);
    setAuth(auth);
    const task = await getOneTask(params.id);
    const users_response = await getAllUsers();
    const users = users_response;
    return {
      props: {
        auth,
        users,
        task,
      },
    };
  } else {
    return { props: {} };
  }
};
