/* eslint-disable */
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {CHANEL_ID, IS_ANDROID} from './constants';
import {FCM_TOKEN} from './asyncStorageConstants';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  if (IS_ANDROID) {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  notifee.requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  } else {
    getFcmToken();
  }
}

export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
  // console.log('new fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const getToken = await messaging().getToken();
      if (getToken) {
        // console.log('new fcmToken', getToken);
        await AsyncStorage.setItem(FCM_TOKEN, getToken);
      }
    } catch (error) {
      // console.log('fcmToken error:', error);
    }
  }
};

export const createLocalNotification = async ({
  title,
  body,
}: {
  title?: string;
  body?: string;
}) => {
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: CHANEL_ID,
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_launcher',
    },
  });
};

export const useNotifee = () => {
  // @ts-ignore
  notifee.onBackgroundEvent(async message => {
    // console.log('background', message);
    return true;
  });
  const createChanelId = async () => {
    await notifee.createChannel({
      id: CHANEL_ID,
      name: 'Garuda Channel',
      importance: AndroidImportance.HIGH,
    });
  };

  messaging().onMessage(remoteMessage => {
    createLocalNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
    });
  });

  messaging().onNotificationOpenedApp(() => {
    // console.log('BackGround state', remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // console.log('getInitialNotification', remoteMessage.notification);
      }
    });

  useEffect(() => {
    createChanelId();
    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          if (pressAction?.id === 'mark-as-read') {
            // @ts-ignore

            await notifee.cancelAllNotifications(notification?.id);
          }
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
};
