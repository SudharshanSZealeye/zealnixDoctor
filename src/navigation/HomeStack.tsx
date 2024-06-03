import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Colors} from 'squashapps-react-native-uikit';
import HomeScreen from '../modules/HomeModule/HomeScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: Colors.WHITE},
      }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
