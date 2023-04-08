/* eslint-disable no-undef */
import * as HttpService from 'services/http.service';

const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = (email, password) => {
  return HttpService.postWithOutAuth(`${ApiUrl}/login`, { email, password });
};
