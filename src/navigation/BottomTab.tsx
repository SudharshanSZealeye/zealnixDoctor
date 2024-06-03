/* eslint-disable */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';
import {getColors, Icons} from 'squashapps-react-native-uikit';
import {APP_THEME, USER_PROFILE} from '../utils/constants';
import AppointmentStack from './AppointmentStack';
import HomeStack from './HomeStack';
// import MessageStack from './MessageStack';
import ProfileStack from './ProfileStack';
import TabBarIcon from './TabBarIcon';
import {RootTabParamList} from './types';
import ReelsStack from './ReelsStack';
import SvgReelsBold from '../icons/SvgReelsBold';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const {SvgHome, SvgAppointments, SvgAppointmentsBold, SvgMessage, SvgReels} =
  Icons;
const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTab = () => {
  const {PRIMARY_COLOR_500, NEUTRAL_500, WHITE} = getColors(APP_THEME);
  const {data} = useSelector(({profileReducers}: RootState) => {
    return {
      isLoading: profileReducers.isLoading,
      data: profileReducers.data,
    };
  });

  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        listeners={({navigation}) => ({
          tabPress: () =>
            navigation.navigate('BottomTab', {screen: 'HomeScreen'}),
        })}
        options={{
          title: '',
          tabBarIcon: ({focused}: any) => (
            <TabBarIcon
              icon={
                <SvgHome
                  height={24}
                  width={24}
                  stroke={focused ? WHITE : NEUTRAL_500}
                  strokeOne={focused ? WHITE : NEUTRAL_500}
                  fill={focused ? PRIMARY_COLOR_500 : WHITE}
                />
              }
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="MessageTab"
        component={MessageStack}
        options={{
          title: '',
          tabBarIcon: ({focused}: any) => (
            <TabBarIcon
              icon={
                <SvgMessage
                  strokeFill={focused ? PRIMARY_COLOR_500 : NEUTRAL_500}
                  fill={focused ? PRIMARY_COLOR_500 : WHITE}
                  strokeFillOne={focused ? WHITE : NEUTRAL_500}
                />
              }
            />
          ),
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="ReelsTab"
        component={ReelsStack}
        listeners={({navigation}) => ({
          tabPress: () =>
            navigation.navigate('BottomTab', {screen: 'ReelsScreen'}),
        })}
        options={{
          title: '',
          tabBarIcon: ({focused}: any) => (
            <TabBarIcon icon={focused ? <SvgReelsBold /> : <SvgReels />} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AppointmentTab"
        component={AppointmentStack}
        listeners={({navigation}) => ({
          tabPress: () =>
            navigation.navigate('BottomTab', {screen: 'AppointmentsScreen'}),
        })}
        options={{
          title: '',
          tabBarIcon: ({focused}: any) => (
            <TabBarIcon
              icon={
                focused ? (
                  <SvgAppointmentsBold fill={PRIMARY_COLOR_500} />
                ) : (
                  <SvgAppointments />
                )
              }
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        listeners={({navigation}) => ({
          tabPress: () =>
            navigation.navigate('BottomTab', {screen: 'ProfileScreen'}),
        })}
        options={{
          title: '',
          tabBarIcon: ({focused}: any) => (
            <TabBarIcon
              icon={
                <View
                  style={{
                    borderColor: focused ? PRIMARY_COLOR_500 : WHITE,
                    borderWidth: focused ? 3 : 0,
                    borderRadius: 100,
                  }}>
                  <Image
                    style={{
                      width: focused ? 21 : 24,
                      height: focused ? 21 : 24,
                      borderRadius: 100,
                    }}
                    source={{
                      uri: data?.profileImageUrl
                        ? data?.profileImageUrl
                        : USER_PROFILE,
                    }}
                  />
                </View>
              }
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
