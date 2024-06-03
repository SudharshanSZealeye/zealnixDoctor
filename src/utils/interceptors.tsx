import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Toast} from 'squashapps-react-native-uikit';
import {AppDispatch} from '../redux/store';
import {logOut} from '../modules/LoginModule/store/loginReducer';
import {API_FAIL} from './constants';

export const useInterceptors = () => {
  const [isService, setService] = useState(false);
  const [isLogout, setLogout] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const handleService = (value?: boolean) => {
    if (value) {
      setService(true);
    } else {
      setService(false);
    }
  };
  const handleLogout = (value: boolean) => {
    if (value) {
      setLogout(true);
    } else {
      setLogout(false);
      AsyncStorage.clear();
      dispatch(logOut(null));
    }
  };
  axios.interceptors.response.use(
    response => {
      // if (response?.data === 'logout') {
      //   handleLogout(true);
      // }

      return response;
    },
    error => {
      if (
        typeof error.response === 'undefined' ||
        error.response?.status === 502 ||
        error.response?.status === 0
      ) {
        handleService(true);
        Toast.danger({message: API_FAIL, duration: 'LONG'});
      }

      return error;
    },
  );
  return {isService, handleService, isLogout, handleLogout};
};
