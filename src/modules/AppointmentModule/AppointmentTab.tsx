import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import UpcomingTab from './UpcomingTab';
import {AppDispatch} from '../../redux/store';
import {
  appoinmentsListHistoryMiddleWare,
  appoinmentsListMiddleWare,
} from './store/appoinmentMiddleware';
import {getCurentMini} from '../../utils/helpers';
import HistoryTab from './HistoryTab';
import {tabStyles, containerStyle, labelStyle} from '../MessageModule/tabStyle';

const Tab = createMaterialTopTabNavigator();

const AppointmentTab = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleUpcoming = () => {
    dispatch(
      appoinmentsListMiddleWare({
        where: {
          $or: [
            {
              $and: [
                {
                  appointmentDate: {
                    $eq: moment().startOf('date'),
                  },
                  'appointmentSchedule.appointmentRangeEnd': {
                    $gte: getCurentMini(),
                  },
                },
              ],
            },
            {
              appointmentDate: {
                $gt: moment().startOf('date'),
              },
            },
          ],
        },
        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
  };

  const handleHistory = () => {
    dispatch(
      appoinmentsListHistoryMiddleWare({
        where: {
          $or: [
            {
              $and: [
                {
                  appointmentDate: {
                    $eq: moment().startOf('date'),
                  },
                  'appointmentSchedule.appointmentRangeStart': {
                    $lt: getCurentMini(),
                  },
                },
              ],
            },
            {
              appointmentDate: {
                $lt: moment().startOf('date'),
              },
            },
          ],
        },

        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Upcoming"
      screenOptions={tabStyles}
      sceneContainerStyle={containerStyle}>
      <Tab.Screen
        listeners={() => ({
          tabPress: handleUpcoming,
        })}
        name="Upcoming"
        options={{
          swipeEnabled: false,
          tabBarLabelStyle: labelStyle,
        }}
        component={UpcomingTab}
      />
      <Tab.Screen
        listeners={() => ({
          tabPress: handleHistory,
        })}
        name="History"
        options={{
          swipeEnabled: false,
          tabBarLabelStyle: labelStyle,
        }}
        component={HistoryTab}
      />
    </Tab.Navigator>
  );
};

export default AppointmentTab;
