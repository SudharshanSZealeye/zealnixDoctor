import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from 'squashapps-react-native-uikit';
import AppointmentsScreen from '../modules/AppointmentModule/AppointmentsScreen';
import {RootStackParamList} from './types';
import Header from './Header';
import AppointmentDetailsScreen from '../modules/AppointmentModule/AppointmentDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppointmentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.WHITE},
      }}
      initialRouteName="AppointmentsScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppointmentsScreen"
        component={AppointmentsScreen}
      />
      <Stack.Screen
        options={{
          header: props => Header({props}),
          title: 'Appointment Details',
        }}
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AppointmentStack;
