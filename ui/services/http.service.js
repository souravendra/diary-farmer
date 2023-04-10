import axios from 'axios';

import { getAuth } from './identity.service';

export const postWithOutAuth = (url, entity) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, entity)
      .then((response) => {
        resolve(response);
        // console.log(response);
        // if (response.status == 200) {
        // add response status error handling here if time
        //   resolve(response);
        // }
      })
      .catch((ex) => {
        resolve(ex);
        console.log(ex);
        reject(ex);
      });
  });
};

export const postWithAuth = (url, entity, headers) => {
  //going to use this one the most
  return new Promise((resolve, reject) => {
    console.log(entity);
    const auth = getAuth();
    if (!headers) {
      headers = {
        headers: {
          authorization: `${auth.role}`,
        },
      };
    }
    axios
      .post(url, entity, headers)
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });
};

export const getWithAuth = (url, params = {}, headers) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    // console.log({ getWithAuth: auth });
    if (headers) params['headers'] = headers;
    else
      params['headers'] = {
        authorization: `${auth.role}`,
      };
    axios
      .get(url, params)
      .then((response) => {
        // console.log(response);
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });
};

export const putWithAuth = (url, entity, headers) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    if (!headers) {
      headers = {
        headers: {
          authorization: `${auth.role}`,
        },
      };
    }
    axios
      .put(url, entity, headers)
      .then((response) => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch((ex) => {
        reject(ex);
      });
  });
};
