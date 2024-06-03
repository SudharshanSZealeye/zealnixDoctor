import axios from 'axios';
import Config from 'react-native-config';
import {validators} from 'squashapps-react-native-uikit';

const {isEmpty} = validators;

export const fetchUrl = (url: string) => {
  const baseUrl = `${Config.BASE_URL}${url}`;
  return baseUrl;
};
/* eslint-disable */

export const setAuthorization = (token: string) => {
  if (!isEmpty(token)) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
