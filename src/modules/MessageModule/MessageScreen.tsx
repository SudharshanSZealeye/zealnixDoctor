import * as React from 'react';
import {Flex} from 'squashapps-react-native-uikit';
import CustomStatusBar from '../../common/CustomStatusBar';
import LogoHeader from '../../common/LogoHeader';
import MessageTab from './MessageTab';

const MessageScreen = () => {
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <Flex flex={1}>
        <LogoHeader title="Messages" />
        <MessageTab />
      </Flex>
    </>
  );
};

export default MessageScreen;
