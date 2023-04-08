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
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { getAuth } from 'services/identity.service';

import TaskList from '@/components/tasks/TaskList';
import Loader from '@/components/loading/Loader';

const inter = Inter({ subsets: ['latin'] });

const TasksList = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      //api calls here
      setIsLoading(false);
    })();
  }, []);
  const auth_obj = getAuth();
  console.log(auth_obj);
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  return <TaskList auth={auth_obj} />;
};

export default TasksList;
