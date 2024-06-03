import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Logger, {startNetworkLogging} from 'react-native-network-logger';
import Config from 'react-native-config';
import {Platform, TouchableOpacity} from 'react-native';
import {Text} from 'squashapps-react-native-uikit';
import AppProvider from './src/navigation/AppProvider';
import AppLayout from './src/navigation/AppLayout';
import {
  requestUserPermission,
  useNotifee,
} from './src/utils/notificationService';
import CustomStatusBar from './src/common/CustomStatusBar';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const checkDev = Config.REACT_APP_ENV === 'development';

const App = () => {
  const [showLogger, setShowLogger] = useState(false);
  const handleToggleLogger = () => setShowLogger(!showLogger);

  useNotifee();
  useEffect(() => {
    if (checkDev) {
      startNetworkLogging();
    }
    requestUserPermission();
  }, []);

  if (checkDev) {
    return (
      <SafeAreaProvider>
        <AppProvider>
          {Platform.OS === 'ios' && <CustomStatusBar />}
          <TouchableOpacity onPress={handleToggleLogger}>
            <Text
              color='link'
              overrideStyle={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}>
              {showLogger ? 'Hide Logger' : 'Show Logger'}
            </Text>
          </TouchableOpacity>
          {showLogger ? <Logger /> : <AppLayout />}
        </AppProvider>
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;
