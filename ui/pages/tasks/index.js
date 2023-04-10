// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ task_type: 'Feed', cattle_type: 'Cow' });
// }

// export default function handler(req, res) {
//   res.status(200).json({ farmer: 'Atul', cattle_health: '86%' });
// }

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import moment from 'moment';
import Cookies from 'universal-cookie';

import dynamic from 'next/dynamic';

const DynamicTasksWithNoSSR = dynamic(
  () => import('@/components/tasks/TaskList'),
  {
    ssr: false,
  },
);
import TaskList from '@/components/tasks/TaskList';
import Loader from '@/components/loading/Loader';

import { getAuth, setAuth, getAllUsers } from 'services/identity.service';
import { getTasksPaginated } from '@/services/task.service';

// const TasksList = async (context) => {
//   const [isLoading, setIsLoading] = useState(true);
//   let AllTasks = '';
//   let totalCount = '';
//   let pageCount = '';
//   let currentPage = '';
//   let perPage = '';
//   let users = '';
//   useEffect(() => {
//     (async () => {
//       // const auth_obj = getAuth();
//       context.query.page = context.query.page ? context.query.page : 1; //setting page number
//       context.query.status =
//         context.query.status && context.query.status.length > 0
//           ? context.query.status
//           : ''; //setting task status (Assigned/Pending/Complete)
//       context.query.type =
//         context.query.type && context.query.type.length > 0
//           ? context.query.type
//           : ''; //setting task type (Nursing/Maintenance/Milking)
//       context.query.userId =
//         context.query.userId && context.query.userId.length > 0
//           ? context.query.userId
//           : ''; //setting userId
//       const tasks_response = await getTasksPaginated(context.query); //task + pagination info
//       AllTasks = tasks_response.rows;
//       //console.log({ tasks_on_ui_index: AllTasks });
//       totalCount = parseInt(tasks_response.meta.totalCount);
//       pageCount = parseInt(tasks_response.meta.pageCount);
//       currentPage = parseInt(tasks_response.meta.currentPage);
//       perPage = parseInt(tasks_response.meta.perPage);
//       const users_response = await getAllUsers();
//       let users = users_response;
//       console.log(users);
//       setIsLoading(false);
//     })();
//   }, []);
//   const auth_obj = getAuth();
//   console.log(auth_obj);
//   if (isLoading)
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   return (
//     <TaskList
//       tasks={AllTasks}
//       currentPage={currentPage}
//       totalCount={totalCount}
//       pageCount={pageCount}
//       perPage={perPage}
//       auth={auth_obj}
//       allUsers={users}
//     />
//   );
// };

const TasksList = ({
  AllTasks,
  currentPage,
  totalCount,
  pageCount,
  perPage,
  auth,
  users,
}) => {
  return (
    <DynamicTasksWithNoSSR
      tasks={AllTasks}
      currentPage={currentPage}
      totalCount={totalCount}
      pageCount={pageCount}
      perPage={perPage}
      auth={auth}
      allUsers={users}
    />
  );
};

export default TasksList;

export const getServerSideProps = async (context) => {
  const cookies = new Cookies(context.req.headers.cookie);
  if (cookies.cookies.AUTH) {
    const auth = JSON.parse(cookies.cookies.AUTH);
    setAuth(auth);
    // console.log(context.query);
    context.query.page = context.query.page ? context.query.page : 1; //setting page number
    context.query.status =
      context.query.status && context.query.status.length > 0
        ? context.query.status
        : ''; //setting task status (Assigned/Pending/Complete)
    context.query.type =
      context.query.type && context.query.type.length > 0
        ? context.query.type
        : ''; //setting task type (Nursing/Maintenance/Milking)
    context.query.userId =
      context.query.userId && context.query.userId.length > 0
        ? context.query.userId
        : ''; //setting userId
    const tasks_response = await getTasksPaginated(context.query); //task + pagination info
    const AllTasks = tasks_response.rows;
    // console.log({ tasks_on_ui_index: AllTasks });
    const totalCount = parseInt(tasks_response.meta.totalCount);
    // console.log(totalCount);
    const pageCount = parseInt(tasks_response.meta.pageCount);
    const currentPage = parseInt(tasks_response.meta.currentPage);
    const perPage = parseInt(tasks_response.meta.perPage);
    const users_response = await getAllUsers();
    const users = users_response;
    // console.log(users);
    return {
      props: {
        AllTasks,
        currentPage,
        totalCount,
        pageCount,
        perPage,
        auth,
        users,
      },
    };
  } else {
    return { props: {} };
  }
};
