import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from 'squashapps-react-native-uikit';
import ProfileScreen from '../modules/ProfileModule/ProfileScreen';
import {RootStackParamList} from './types';
import EditProfileScreen from '../modules/ProfileModule/EditProfileScreen';
import Header from './Header';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.WHITE},
      }}
      initialRouteName="ProfileScreen">
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          header: props => Header({props}),
          title: 'Profile',
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
