import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getAuth = () => {
  const auth = cookies.get('AUTH');
  return auth;
};

export const setAuth = (authObject) => {
  cookies.set('AUTH', JSON.stringify(authObject), { path: '/' }); //sets auth cookie
  return authObject;
};

export const removeAuth = () => {
  cookies.remove('AUTH', { path: '/' }); //removes auth cookie
  return;
};

export const isInRole = (role, user) => {
  return user.role && user.role == role;
};

export const isAuthenticated = (user) => {
  return user && user.role; //checks for a valid role string in auth object, im using this to redirect in a useeffect on login component
};

// export const getMenu = (user) => {}; idk if ill get to use this

const menu = {
  admin: {
    main: [
      { name: 'Dashboard', url: '/dashboard' },
      { name: 'Manage Tasks', url: '/tasks' },
      // { name: 'Manage Users', url: '/users' }, no time for this
    ],
  },
};
