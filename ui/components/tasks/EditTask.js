/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Head from 'next/head';
import {
  getTasksPaginated,
  getOneTask,
  updateTask,
  createTask,
} from '@/services/task.service';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import BasicModal from '@/atoms/BasicModal';
import Loader from '../loading/Loader';

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

const initialValues = {
  description: '',
  status: '',
  type: '',
  userId: '',
  createdBy: '',
};

const capitalize = (a) => {
  return a ? a.charAt(0).toUpperCase() + a.slice(1) : '';
};

const beautify_role = (r) => {
  if (!r) return '';
  const a = r.split('_')[0].toLowerCase();
  const b = r.split('_')[1].toLowerCase();
  return capitalize(a) + ' ' + capitalize(b);
};

const EditTask = ({ auth, users, task }) => {
  //console.log(task);
  const router = useRouter();
  const [taskDetails, setTaskDetails] = useState(initialValues);
  const [currentUser, setCurrentUser] = useState(auth.id);
  const [assignedToUser, setAssignedToUser] = useState(task.userId);
  const [taskTypeSelected, setTaskTypeSelected] = useState(
    taskTypeDropDownItems.find((t) => t.value == task.type),
  );
  const [taskStatus, setTaskStatus] = useState(
    statusDropDownItems.find((s) => s.value == task.status),
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('unsaved');
  const [responseMessage, setResponseMessage] = useState('');
  const [userOptions, setUserOptions] = useState(
    users?.map((user) => {
      user.label = capitalize(user.name) + ' | ' + beautify_role(user.role);
      user.value = user.id;
      user.key = user.id;
      return user;
    }),
  );
  const [userSelected, setUserSelected] = useState(
    userOptions?.find((u) => u.value == task.userId),
  );

  useEffect(() => {
    setTaskDetails({
      description: task.description,
    });
  }, []);

  const handleStatusDropdown = (user) => {
    setTaskStatus(user);
  };

  const handleTaskTypeDropdown = (user) => {
    setTaskTypeSelected(user);
  };

  const handleUserSelect = (user) => {
    setUserSelected(user); //set user.id in context
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [name]: value,
    });
  };

  // userSelected !== null &&
  //   typeof userSelected === 'object' &&
  //   !userSelected.length;

  const SubmitTask = async () => {
    setStatus('saving');
    setErrorMessage('');
    setResponseMessage('');
    if (!taskDetails.description.length) {
      setErrorMessage('Enter description');
      setStatus('unsaved');
    } else if (
      userSelected == null ||
      typeof userSelected !== 'object' ||
      userSelected.length
    ) {
      setErrorMessage('Please select a user');
      setStatus('unsaved');
    } else if (
      taskStatus == null ||
      typeof taskStatus !== 'object' ||
      taskStatus.length
    ) {
      setErrorMessage('Please select a status from the dropdown');
      setStatus('unsaved');
    } else if (
      taskTypeSelected == null ||
      typeof taskTypeSelected !== 'object' ||
      taskTypeSelected.length
    ) {
      setErrorMessage('Please select a task type');
      setStatus('unsaved');
    } else {
      const task_to_update = {};
      task_to_update.status = taskStatus.value;
      task_to_update.userId = userSelected.value;
      task_to_update.type = taskTypeSelected.value;
      task_to_update.createdBy = auth.id;
      task_to_update.description = taskDetails.description;
      task_to_update.id = task.id;
      try {
        const response = await updateTask(task_to_update);
        if (!response.status == 200) {
          setStatus('error');
          setErrorMessage(response.message);
          setResponseMessage(response.message);
        } else {
          setErrorMessage('');
          router.push('/tasks');
        }
      } catch (e) {
        setStatus('error');
        setErrorMessage('Encountered an Error');
        setResponseMessage('Encountered an Error');
      }
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      createTask();
    } else if (e.keyCode === 27) {
      setErrorMessage('');
      const path = '/';
      router.push(path);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress, false);
    return () => {
      document.removeEventListener('keydown', handleKeypress, false);
    };
  });

  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    router.events.on('routeChangeStart', startLoading);
    router.events.on('routeChangeComplete', stopLoading);
    return () => {
      router.events.off('routeChangeStart', startLoading);
      router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);
  let loading = null;

  if (isLoading) loading = <Loader />;
  else loading = null;
  return (
    <>
      <div className='w-full text-slate-gray rounded-md bg-white p-3 h-auto flex flex-col'>
        <Head>
          <title>Dairy 2 Do | Edit Task</title>
        </Head>
        {loading}
        <div className='title mb-3'>
          <div className='flex justify-between'>
            <h2 className='text-xl mb-4'>Edit Task</h2>
          </div>
          <hr className='bg-gray-200'></hr>
        </div>

        <div className='search-filter-container flex flex-col text-center lg:items-stretch'>
          <div className='flex flex-col w-full sm:flex-row'>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Select User</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={userOptions}
                onChange={handleUserSelect}
                value={userSelected}
                placeholder='Select a user to assign a task'
                className='w-full text-left text-zinc'
              />
            </div>
          </div>
          <div className='flex flex-col w-full sm:flex-row'></div>
          <div className='flex flex-col items-center sm:justify-between sm:flex-col sm:px-1 lg:flex-row'></div>
          <div className='flex flex-col w-full sm:flex-row'>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Select Task Type</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={taskTypeDropDownItems}
                onChange={handleTaskTypeDropdown}
                value={taskTypeSelected}
                placeholder='Select a task type'
                className='w-full text-left text-zinc'
              />
            </div>
            <div className='relative flex flex-col  m-2 sm:m-3 sm:mb-4 items-start w-96'>
              <label>Select Task Status</label>
              <Select
                controlShouldRenderValue={true}
                isClearable={true} //value is null when removed
                backspaceRemovesValue={true}
                options={statusDropDownItems}
                onChange={handleStatusDropdown}
                value={taskStatus}
                placeholder='Select current task status (Assigned)'
                className='w-full text-left text-zinc'
              />
            </div>
          </div>
          <div className='flex flex-col w-full sm:flex-row'></div>

          <div className='relative flex flex-col  m-2 sm:m-3 sm:w-72 sm:mb-4 items-start lg:w-11/12'>
            <label>Task Description</label>
            <input
              type='text'
              placeholder='Type the Description here!'
              className=' w-full px-2 py-0.5 pb-10 placeholder-gray-500 text-gray-600 relative bg-white rounded-lg text-base border shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
              value={taskDetails.description}
              name='description'
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col items-center sm:justify-between sm:flex-col sm:px-1 lg:flex-row'>
            <div className='flex flex-col sm:flex-row'></div>
          </div>
        </div>
        {status == 'saving' && errorMessage == '' && <Loader />}
        {status == 'error' && (
          <BasicModal
            title='Failed!'
            cancelBtnText='Go Back'
            description={responseMessage}
            okBtnText='Stay Here'
            onCancel={() => {
              router.replace('/tasks');
            }}
            onOk={() => {
              setStatus('unsaved');
            }}
            toggleModal={() => {
              setStatus('unsaved');
            }}
          />
        )}

        <div className='btn-pair self-center my-8'>
          <button
            type='button'
            className='border border-dark-blue rounded-lg  w-24 my-4 mx-1 text-center text-dark-blue bg-white sm:m-3 lg:m-4'
            onClick={() => {
              setErrorMessage('');
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            type='button'
            disabled={status == 'saving'}
            className='border rounded-lg w-24 my-2 mx-1 text-center text-white bg-dark-blue sm:m-3 lg:m-4'
            onClick={(e) => {
              e.preventDefault();
              SubmitTask();
            }}
          >
            Save
          </button>
        </div>
        <span className='self-center text-red-700 font-light'>
          {errorMessage}
        </span>
      </div>
    </>
  );
};

export default EditTask;
