import axios from 'axios';
import cookie from 'js-cookie';
import { API } from '../config';

console.log(`${API}/signup`);

export const signup = (data) => {
  return axios({
    method: 'post',
    url: `${API}/signup`,
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then((resp) => {
    console.log(resp.data);
    return resp.data;
  })
  .catch((err) => err.response.data);
};

export const signin = data => {
  return axios({
    method: 'post',
    url: `${API}/signin`,
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then((resp) => {
    console.log(resp.data);
    return resp.data;
  })
  .catch((err, response) => {
    console.log(err, response)
    return err.response.data
  });
};

export const signout = next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();

  return fetch(`${API}/signout`, {
      method: 'GET'
  })
  .then(response => {
      console.log('signout success');
  })
  .catch(err => console.log(err));
};

// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};

// get cookie
export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};

// localstorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};

// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};