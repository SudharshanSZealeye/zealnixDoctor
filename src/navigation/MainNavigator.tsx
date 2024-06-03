import React, {createContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Loader} from 'squashapps-react-native-uikit';
import {useSelector} from 'react-redux';
import {AuthStackParamList, RootStackParamList} from './types';
import {useAuth} from '../utils/authCheck';
import {RootState} from '../redux/store';
import LoginScreen from '../modules/LoginModule/LoginScreen';
import BottomTab from './BottomTab';
import ChatScreen from '../modules/ChatModule/ChatScreen';
import PrescribeMedicineScreen from '../modules/PrescribeModule/PrescribeMedicineScreen';
import Header from './Header';
import AllMedicineListScreen from '../modules/PrescribeModule/AllMedicineListScreen';
import SignUpScreen from '../modules/LoginModule/SignUpScreen';
import OTPVerificationScreen from '../modules/LoginModule/OTPVerificationScreen';
import VideoCallScreen from '../modules/VideoCallModule/VideoCallScreen';
import {setAuthorization} from '../utils/apiConfig';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

type ContextPropsType = {
  logOut?: any;
  logIn?: any;
};

const AuthContext = createContext<ContextPropsType>({});

const MainNavigator = () => {
  const [isLoading, setLoading] = useState(false);
  const {userData, isLoader} = useSelector(({userReducers}: RootState) => {
    return {
      userData: userReducers.data,
      isLoader: userReducers.isLoader,
    };
  });

  const {authContext} = useAuth(setLoading);
  // console.log('userData?.token', userData?.token);

  if (userData?.token) {
    setAuthorization(userData?.token);
  }

  if (isLoader || isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      {userData?.isLogin ? (
        <Stack.Navigator initialRouteName="BottomTab">
          <Stack.Screen
            options={{headerShown: false}}
            name="BottomTab"
            component={ BottomTab}
          />
          <Stack.Screen
            options={{header: props => Header({props})}}
            name="ChatScreen"
            component={ChatScreen}
          />
          <Stack.Screen
            options={{
              header: props => Header({props}),
              title: 'Prescribe Medicine',
            }}
            name="PrescribeMedicineScreen"
            component={PrescribeMedicineScreen}
          />
          <Stack.Screen
            options={{
              header: props => Header({props}),
              title: 'Prescribe Medicine',
            }}
            name="AllMedicineListScreen"
            component={AllMedicineListScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="VideoCallScreen"
            component={VideoCallScreen}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="LoginScreen">
          <AuthStack.Screen
            options={{headerShown: false}}
            name="LoginScreen"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{headerShown: false}}
            name="SignUpScreen"
            component={SignUpScreen}
          />
          <AuthStack.Screen
            options={{headerShown: false}}
            name="OTPVerificationScreen"
            component={OTPVerificationScreen}
          />
        </AuthStack.Navigator>
      )}
    </AuthContext.Provider>
  );
};

export default MainNavigator;
