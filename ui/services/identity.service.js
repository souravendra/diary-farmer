import Cookies from 'universal-cookie';
import * as HttpService from 'services/http.service';
const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

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

export const getUserData = () => {
  const auth = getAuth();
  const user_id = auth.id;
  return HttpService.getWithAuth(`${ApiUrl}/user/${user_id}`);
};

export const getAllUsers = () => {
  return HttpService.getWithAuth(`${ApiUrl}/user`);
};

export const isInRole = (role, user) => {
  return user.role && user.role == role;
};

export const isAuthenticated = (user) => {
  return user && user.role; //checks for a valid role string in auth object, im using this to redirect in a useeffect on login component
};
