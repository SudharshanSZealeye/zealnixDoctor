/* eslint-disable */
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import AgoraUIKit, {AgoraUIKitProps } from 'agora-rn-uikit';
import {useNavigation} from '@react-navigation/native';
import {getColors} from 'squashapps-react-native-uikit';
import {AGORA_TOKEN, APP_ID, APP_THEME, CHANEL_ID} from '../../utils/constants';

const VideoCallScreen = () => {
  const navigation = useNavigation();
  const {GREEN_50, PRIMARY_COLOR_500, ERROR_500} = getColors(APP_THEME);
  const {
    data
  } = useSelector(
    ({
      patchAppoinmentTokenReducers
    }: RootState) => {
      return {
        data: patchAppoinmentTokenReducers.data,
      };
    },
  );
  const connectionData = {
    appId: APP_ID,
    channel: "Garuda Squash",
    token: data,
  };

  const agoraData: AgoraUIKitProps = {
    connectionData: {
      appId: APP_ID,
      channel: "Garuda Squash",
    },
    // settings: {
    //   displayUsername: true,
    //   layout: 0,
    //   dual: true,
    //   mode: 4,
    //   role: 2,
    // },
    styleProps: {
      iconSize: 30,
      theme: GREEN_50,
      localBtnStyles: {
        muteLocalVideo: {
          backgroundColor: PRIMARY_COLOR_500,
          borderColor: PRIMARY_COLOR_500,
        },
        muteLocalAudio: {
          backgroundColor: PRIMARY_COLOR_500,
          borderColor: PRIMARY_COLOR_500,
        },
        switchCamera: {
          backgroundColor: PRIMARY_COLOR_500,
          borderColor: PRIMARY_COLOR_500,
        },
        endCall: {
          width: 50,
          height: 50,
          borderWidth: 0,
          backgroundColor: ERROR_500,
          borderColor: ERROR_500,
        },
      },
      localBtnContainer: {
        bottom: 20,
      },
      maxViewRemoteBtnContainer: {
        top: 0,
        alignSelf: 'flex-end',
      },
      remoteBtnStyles: {
        // muteRemoteAudio: remoteBtnStyle,
        // muteRemoteVideo: remoteBtnStyle,
        // remoteSwap: remoteBtnStyle,
        // minCloseBtnStyles: remoteBtnStyle,
      },
      minViewContainer: {
        top: 20,
        height: '20%',
      },
      minViewStyles: {
        height: '100%',
      },
      maxViewStyles: {
        height: '100%',
      },
      UIKitContainer: {height: '100%'},
    },
    rtcCallbacks: {
      EndCall: () => navigation.navigate('HomeScreen', {}),
    },
  };
  return (
    <AgoraUIKit
      styleProps={agoraData.styleProps}
      connectionData={connectionData}
      rtcCallbacks={agoraData.rtcCallbacks}
    />
  );
};

export default VideoCallScreen;
