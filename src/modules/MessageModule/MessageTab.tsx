import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DoctorTab from './DoctorTab';
import {containerStyle, labelStyle, tabStyles} from './tabStyle';

const Tab = createMaterialTopTabNavigator();

const MessageTab = () => {
  return (
    <Tab.Navigator
      screenOptions={tabStyles}
      sceneContainerStyle={containerStyle}>
      <Tab.Screen
        name="Doctors"
        options={{
          tabBarLabelStyle: labelStyle,
        }}
        component={DoctorTab}
      />
      <Tab.Screen
        name="Patients"
        options={{
          tabBarLabelStyle: labelStyle,
        }}
        component={DoctorTab}
      />
    </Tab.Navigator>
  );
};

export default MessageTab;
