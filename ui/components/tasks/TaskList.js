/* eslint-disable react/prop-types */
import moment from 'moment';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { openInNewTab } from '@/services/url.service';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
//import Dropdown from '@/atoms/Dropdown'; //this ended up being useless, doesnt work because react 18 & next 13
import Dropdown from 'react-dropdown'; //would take too long to style properly
//import 'react-dropdown/style.css';
import { PrimaryButton, TextField, PasswordField } from 'atoms/index.js';
import Loader from '../loading/Loader';

import {
  getAuth,
  getUserData,
  getAllUsers,
} from 'services/identity.service.js';
import { deleteTask } from '@/services/task.service';

const inter = Inter({ subsets: ['latin'] });

const statusDropDownItems = [
  { label: 'Assigned', value: 'Assigned', key: 'Assigned' },
  { label: 'In-Progress', value: 'In-Progress', key: 'In-Progress' },
  { label: 'Complete', value: 'Complete', key: 'Complete' },
];

const taskTypeDropDownItems = [
  { label: 'Milking', value: 'Milking', key: 1 },
  { label: 'Maintenance', value: 'Maintenance', key: 2 },
  { label: 'Nursing', value: 'Nursing', key: 3 },
];

const TaskTableHeaders = [
  'ID',
  'Assigned To',
  'Type',
  'Status',
  'Created At',
  'Updated At',
  'Actions',
];

const capitalize = (a) => {
  return a ? a.charAt(0).toUpperCase() + a.slice(1) : '';
};

const beautify_role = (r) => {
  if (!r) return '';
  const a = r.split('_')[0].toLowerCase();
  const b = r.split('_')[1].toLowerCase();
  return capitalize(a) + ' ' + capitalize(b);
};

const getUsers = async () => {
  return await getAllUsers;
};

const TaskList = ({
  tasks,
  currentPage,
  totalCount,
  pageCount,
  perPage,
  auth,
  allUsers,
}) => {
  const router = useRouter();
  const isOwner = auth.role == 'FARM_OWNER';
  // console.log({ props: allUsers });
  //console.log({ tasks: tasks });
  // console.log({ props: pageCount });
  // console.log({ props: perPage });
  var current_page = currentPage;
  //var totalCount = totalCount;

  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    //After the component is mounted set router event handlers
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const [taskStatusSelected, setTaskStatusSelected] = useState([]);
  const [taskTypeSelected, setTaskTypeSelected] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [userOptions, setUserOptions] = useState(
    allUsers?.map((user) => {
      user.label = capitalize(user.name) + ' | ' + beautify_role(user.role);
      user.value = user.id;
      user.key = user.id;
      return user;
    }),
  );

  const DeleteTask = async (task_id) => {
    const result = await deleteTask(task_id);
    //trigger reload after deleting
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const [message, setMessage] = useState('');

  const paginationHandler = (page) => {
    var currentPath = router.pathname;
    var currentQuery = { ...router.query }; //Copy current query to avoid wiping it completely
    currentQuery.page = page.selected + 1;
    currentQuery.userId = userSelected;
    currentQuery.status = taskStatusSelected;
    currentQuery.type = taskTypeSelected;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const handleStatusDropdown = (user) => {
    setTaskStatusSelected(user);
  };

  const handleTaskTypeDropdown = (user) => {
    setTaskTypeSelected(user);
  };

  const handleUserSelect = (user) => {
    setUserSelected(user); //set user.id in context
  };

  const handleFilterApply = () => {
    var currentPath = router.pathname;
    var currentQuery = { ...router.query };
    currentQuery.page = 1;
    currentQuery.userId =
      userSelected !== null &&
      typeof userSelected === 'object' &&
      !userSelected.length
        ? userSelected.value
        : '';
    currentQuery.status =
      taskStatusSelected !== null &&
      typeof taskStatusSelected === 'object' &&
      !taskStatusSelected.length
        ? taskStatusSelected.value
        : '';
    currentQuery.type =
      taskTypeSelected !== null &&
      typeof taskTypeSelected === 'object' &&
      !taskTypeSelected.length
        ? taskTypeSelected.value
        : '';
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
    console.log(currentQuery);
  };

  const resetFilters = () => {
    var currentPath = router.pathname;
    var currentQuery = { ...router.query }; //Copy current query to avoid its removing
    currentQuery.page = 1;
    currentQuery.userId = '';
    currentQuery.status = '';
    currentQuery.type = '';
    //re-setting ui params below
    setUserSelected([]);
    setTaskStatusSelected([]);
    setTaskTypeSelected([]);
    //pushing new params
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  let content = null;
  let loading = null;

  if (isLoading) {
    content = (
      <div>
        <Loader />
      </div>
    );
    loading = <Loader />;
  } else {
    //Generating tasks list
    loading = null;
    content = (
      <div className='flex flex-col overflow-hidden bg-white rounded-lg'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 '>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 '>
            <div className='overflow-hidden '>
              <table className='min-w-full divide-y divide-gray-200 border-none '>
                <thead className='border-b-2 whitespace-nowrap'>
                  <tr>
                    {TaskTableHeaders.map((theader) => (
                      <th
                        key={theader}
                        scope='col'
                        className='px-2 py-4 text-center text-base font-medium text-gray-500 '
                      >
                        {theader}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 border-none text-base font-normal text-center whitespace-nowrap'>
                  {tasks.map((trow) => (
                    <tr key={trow.id} className='border-none'>
                      <td className='px-2 py-4  font-normal text-sm text-slate-gray cursor-pointer'>
                        {trow.id.split('-')[0].toUpperCase()}
                      </td>
                      <td className='px-2 py-4 text-sm text-gray-400'>
                        {trow.User.name}
                      </td>
                      <td className='px-2 py-4 font-bold text-sm text-gray-500'>
                        {trow.type}
                      </td>
                      <td className='px-2 py-4 text-sm text-gray-500'>
                        {trow.status}
                      </td>
                      <td className='px-2 py-4 text-sm text-gray-500'>
                        {moment(trow.createdAt).format('YYYY-MM-DD')}
                      </td>
                      <td className='px-2 py-4 text-sm text-gray-500'>
                        {moment(trow.updatedAt).format(
                          'dddd, MMMM Do YYYY, h:mm:ss A',
                        )}
                      </td>
                      <td className='px-2 py-4 text-sm text-gray-500'>
                        <div className='px-2 py-1 w-4/6 align-center justify-between'>
                          {isOwner && (
                            <button
                              title='Edit'
                              className='mx-1 focus:outline-none'
                              onClick={() => {
                                router.push(`tasks/${trow.id}/edit`);
                              }}
                            >
                              <FontAwesomeIcon
                                icon='edit'
                                className='text-lg'
                              />
                            </button>
                          )}
                          <button
                            title='Delete'
                            className={`focus:outline-none ${
                              !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => {
                              if (isOwner) DeleteTask(trow.id);
                            }}
                          >
                            <FontAwesomeIcon icon='trash' className='text-lg' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='w-full relative text-slate-gray rounded-md bg-white p-3'>
        <Head>
          <title>Dairy 2 Do | Tasks</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='title mb-3 flex flex-col sm:flex-row justify-between items-center p-2'>
          <h2 className='text-xl mb-3 sm:mb-0'>Search & Manage Tasks</h2>
          {isOwner && (
            <div
              className='mt-2 sm:mt-0 flex text-center items-center cursor-pointer lg:mr-10 '
              onClick={() => {
                router.push('/tasks/add');
              }}
            >
              <p className='mr-3'>Create New Task</p>
              <button className='border-2 border-slate-gray rounded-lg  px-3 h-9  text-center text-slate-gray bg-white text-xl font-semibold'>
                +
              </button>
            </div>
          )}
        </div>

        <div className='search-filter-container flex flex-col text-center lg:items-stretch'>
          <div className='flex flex-col w-full sm:flex-row'>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Filter by User</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={userOptions}
                onChange={handleUserSelect}
                value={userSelected}
                placeholder='Select a user to search for his/her tasks'
                className='w-full text-left text-zinc'
              />
            </div>
          </div>
          <div className='flex flex-col w-full sm:flex-row'></div>
          <div className='flex flex-col items-center sm:justify-between sm:flex-col sm:px-1 lg:flex-row'></div>
          <div className='flex flex-col w-full sm:flex-row'>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Filter by Task Type</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={taskTypeDropDownItems}
                onChange={handleTaskTypeDropdown}
                value={taskTypeSelected}
                placeholder='Select a task type to filter by'
                className='w-full text-left text-zinc'
              />
            </div>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Filter by Task Status</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={statusDropDownItems}
                onChange={handleStatusDropdown}
                value={taskStatusSelected}
                placeholder='Select a task status to filter by'
                className='w-full text-left text-zinc'
              />
            </div>
          </div>
          <div className='flex flex-col w-full sm:flex-row'></div>

          <div className='flex flex-col items-center sm:justify-between sm:flex-col sm:px-1 lg:flex-row'>
            <div className='flex flex-col sm:flex-row'></div>
            <div className='filter-btn float-right'>
              <button
                type='button'
                className='border border-dark-blue rounded-lg  w-24 my-4 mx-1 text-center text-dark-blue bg-white sm:m-3 lg:m-4'
                onClick={() => {
                  resetFilters();
                }}
              >
                Reset
              </button>
              <button
                type='button'
                className='border rounded-lg w-24 my-2 mx-1 text-center text-white bg-dark-blue sm:m-3 lg:m-4'
                onClick={() => {
                  handleFilterApply();
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <hr className='bg-gray-200 mb-7'></hr>
        <div className=' bg-white w-full text-slate-gray flex justify-between'>
          <h2 className='p-2 text-lg text-center flex w-full  justify-center rounded-t-lg text-dark-blue bg-athens-gray'>
            Viewing Page: {` ${currentPage}`} of {` ${pageCount}`}, Total Tasks
            found for applied search filters: {` ${totalCount}`}
          </h2>
        </div>
        <div className={`bg-athens-gray p-4 rounded-lg`}>{content}</div>
        <div className='w-full rounded-b-full'>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageClassName={
              'z-10 bg-gray-50 border-gray-50 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            }
            previousClassName={
              'z-10 bg-gray-50 border-gray-50 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            }
            nextClassName={
              'z-10 bg-gray-50 border-gray-50 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            }
            breakClassName={'break-me'}
            activeClassName={'active'}
            containerClassName={'pagination inline-flex items-center'}
            subContainerClassName={'pages pagination'}
            initialPage={currentPage - 1}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={paginationHandler}
          />
        </div>
      </div>
    </>
  );
};
export default TaskList;
