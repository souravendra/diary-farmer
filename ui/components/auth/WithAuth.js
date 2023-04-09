/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { getAuth, isAuthenticated } from '@/services/identity.service';

const isBrowser = () => typeof window !== 'undefined';

const WithAuth = ({ router, children }) => {
  const auth = getAuth();
  if (isBrowser() && !isAuthenticated(auth)) {
    router.replace('/');
  }

  //also add logic here to redirect worker users from dashboard or to show 404

  return children;
};

export default WithAuth;
