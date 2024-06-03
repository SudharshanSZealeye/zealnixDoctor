import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {Alert, Text} from 'react-native';
import {useInterceptors} from '../utils/interceptors';
import AlertModal from '../common/AlertModal';
import {API_FAIL} from '../utils/constants';
import MainNavigator from './MainNavigator';

const AppLayout = () => {
  const netInfo = useNetInfo();
  const {isService, handleService, isLogout, handleLogout} = useInterceptors();

  if (netInfo.isConnected === true || netInfo.isConnected === null) {
    return (
      <>
        {isService &&
          Alert.alert('Unavailable services', API_FAIL, [
            {
              text: 'OK',
              onPress: () => handleService(false),
            },
          ])}
        {/* <AlertModal
          message={API_FAIL}
          title="Unavailable services"
          open={isService}
          close={() => handleService(false)}
        /> */}
        <AlertModal
          message="You already login in another device. Please login again"
          title="Alert!"
          open={isLogout}
          close={() => handleLogout(false)}
        />
        <MainNavigator />
      </>
    );
  }

  return <Text>OfflineScreen</Text>;
};

export default AppLayout;
