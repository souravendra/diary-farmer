/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { getAuth, isAuthenticated } from '@/services/identity.service';
import * as ProtectedRoutes from './ProtectedRoutes';
import PageNotFound from './PageNotFound';

const isBrowser = () => typeof window !== 'undefined';
//^ the above line works perfectly fine on older versions of React & Next, but this causes a hydration error in the latest version
// that is because of a ui div mismatch post render

const WithAuth = ({ router, children }) => {
  const auth = getAuth();
  if (isBrowser() && !isAuthenticated(auth)) {
    router.replace('/');
  }

  //also add logic here to redirect worker users from dashboard or to show 404
  if (isAuthenticated(auth) && !ProtectedRoutes[auth.role](router.pathname)) {
    return <PageNotFound />;
  }

  return children;
};

export default WithAuth;
