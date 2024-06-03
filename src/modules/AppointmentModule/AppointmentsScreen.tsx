import React from 'react';
import {Flex} from 'squashapps-react-native-uikit';
import CustomStatusBar from '../../common/CustomStatusBar';
import LogoHeader from '../../common/LogoHeader';
import AppointmentTab from './AppointmentTab';

const AppointmentsScreen = () => {
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <Flex flex={1}>
        <LogoHeader title="Appointments" />
        <AppointmentTab />
      </Flex>
    </>
  );
};

export default AppointmentsScreen;
