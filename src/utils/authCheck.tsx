import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useMemo} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {USER_DATA} from './asyncStorageConstants';
import {setAuthorization} from './apiConfig';
import {logIn, logOut} from '../modules/LoginModule/store/loginReducer';
/* eslint-disable */

export const useAuth = (setLoading: (a: boolean) => void) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const bootstrapAsync = async () => {
      setLoading(true);
      await AsyncStorage.getItem(USER_DATA)
        .then((res: any) => {
          dispatch(logIn(JSON.parse(res)));
          const apiToken = JSON.parse(res)?.token;
          setAuthorization(apiToken);
          setLoading(false);
          SplashScreen.hide();
        })
        .catch(() => {
          AsyncStorage.removeItem(USER_DATA);
          setAuthorization('');
          dispatch(logOut(null));
          setLoading(false);
          SplashScreen.hide();
        });
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      logIn: async () => {
        setLoading(true);
        await AsyncStorage.getItem(USER_DATA)
          .then((res: any) => {
            dispatch(logIn(JSON.parse(res)));
            const apiToken = JSON.parse(res)?.token;
            setAuthorization(apiToken);
            setLoading(false);
            SplashScreen.hide();
          })
          .catch(() => {
            AsyncStorage.removeItem(USER_DATA);
            setAuthorization('');
            dispatch(logOut(null));
            setLoading(false);
            SplashScreen.hide();
          });
      },
      logOut: () => {
        AsyncStorage.removeItem(USER_DATA);
        setAuthorization('');
        dispatch(logOut(null));
        SplashScreen.hide();
      },
    }),
    [],
  );

  return {authContext};
};
