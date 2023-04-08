/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Login from 'components/login/Login.js';

library.add(fas);

// eslint-disable-next-line no-unused-vars
export default function Home(props) {
  return (
    <div>
      <Login />
    </div>
  );
}
