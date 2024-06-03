import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Linking, Platform, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, Flex, Loader, StyleSheet} from 'squashapps-react-native-uikit';
import SvgLight from '../../icons/SvgLight';
import SvgChangeCamera from '../../icons/SvgChangeCamera';
import CircularProgressBarButton from './CircularProgressBarButton';
import SvgGallery from '../../icons/SvgGallery';

const styles = StyleSheet.create({
  overAll: {
    position: 'relative',
  },
  contentView: {
    bottom: 20,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  svgBtn: {
    marginHorizontal: 20,
  },
});

const recordTime = 30;
const ReelsRecord = () => {
  const [changeCamera, setChangeCamera] = useState(false);
  const [torch, setTorch] = useState(false);
  const [isRecord, setRecord] = useState(false);
  const navigation = useNavigation();
  const camera = useRef<any>(null);
  const [isTime, setTime] = useState(0);
  const intervalRef = useRef<any>(null);
  // const devices = useCameraDevices();
  const isFocused = useIsFocused();

  useEffect(() => {
    // eslint-disable-next-line
    setChangeCamera(pre => (pre === true ? false : true));
  }, [isFocused, !isFocused]);

  // useEffect(() => {
  //   async function getPermission() {
  //     // const permission = await Camera.requestCameraPermission();
  //     // await Camera.requestMicrophonePermission();
  //     if (permission === 'denied') await Linking.openSettings();
  //   }
  //   getPermission();
  // }, []);

  const hanldeChangeCamera = () => {
    setChangeCamera(!changeCamera);
  };

  const hanldeTorch = () => {
    setTorch(!torch);
  };

  // const device = changeCamera ? devices.back : devices.front;

  const torchLight = torch ? 'on' : 'off';

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(prevTimer => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const handleStartRecord = () => {
    startTimer();
    // camera.current.getAvailableVideoCodecs('mp4');
    camera.current.startRecording({
      onRecordingFinished: (video: any) => {
        navigation.navigate('NewShortsScreen', {
          video,
        });
      },
      onRecordingError: (error: any) => console.error(error),
    });
    setRecord(true);
  };

  const hanldeStopRecord = async () => {
    stopTimer();
    setTorch(false);
    setRecord(false);
    setTime(0);
    await camera.current.stopRecording();
  };

  useEffect(() => {
    if (isTime === recordTime) {
      hanldeStopRecord();
    }
  }, [isTime]);

  useEffect(() => {
    if (isFocused) {
      hanldeStopRecord();
    }
  }, [isFocused]);

  const handleGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        navigation.navigate('NewShortsScreen', {
          video,
        });
      })
      .catch(() => {
        if (Platform.OS === 'ios') {
          Alert.alert(
            'Permission',
            'Device video permission blocked. Enable the video permission manually',
            [
              {
                text: 'Cancel',
                onPress: () => {},
              },
              {
                text: 'Enable',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
        }
      });
  };
  // const formats = useMemo(() => {
  //   if (device?.formats == null) return [];
  //   return device.formats;
  // }, [device]);

  // const format = useMemo(() => {    
  //   return formats[80]; // its like 1280 * 960
  // }, [formats]);

  // if (device == null) return <Loader />;

  return (
    <Flex flex={1}>
      {/* <Camera
        ref={camera}
        enableZoomGesture
        torch={torchLight}
        video
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        audio
        preset="cif-352x288"
        format={{...format}}
      /> */}

      <View style={styles.contentView}>
        <Button
          onClick={handleGallery}
          type="link"
          overrideStyle={{marginRight: 16}}>
          <SvgGallery />
        </Button>
        <Button disabled={!changeCamera} type="link" onClick={hanldeTorch}>
          <SvgLight />
        </Button>

        <CircularProgressBarButton
          style={styles.svgBtn}
          progress={isTime / recordTime}
          onPress={() => {
            if (!isRecord) {
              handleStartRecord();
            } else {
              hanldeStopRecord();
            }
          }}
        />
        <Button
          disabled={isTime !== 0}
          onClick={hanldeChangeCamera}
          type="link">
          <SvgChangeCamera />
        </Button>
        <View style={{width: 30, marginLeft: 16}} />
      </View>
    </Flex>
  );
};

export default ReelsRecord;
