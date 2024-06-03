import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from 'squashapps-react-native-uikit';
import MessageScreen from '../modules/MessageModule/MessageScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MessageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.WHITE},
      }}
      initialRouteName="MessageScreen">
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MessageStack;
