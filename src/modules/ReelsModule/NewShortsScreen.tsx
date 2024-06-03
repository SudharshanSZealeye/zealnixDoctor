import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Flex,
  InputText,
  Button,
  StyleSheet,
  Loader,
  Image,
  Text,
  Colors,
  Icons,
  DocumentPicker,
} from 'squashapps-react-native-uikit';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {AppDispatch} from '../../redux/store';
import {
  feedsPostMiddleWare,
  fileUploadMiddleWare,
} from './store/reelsMiddleware';
import {COVER_IMAGE, IS_ANDROID} from '../../utils/constants';

const {SvgPlay, SvgPass} = Icons;

const styles = StyleSheet.create({
  cancel: {
    marginVertical: 12,
  },
  overAll: {
    margin: 12,
  },
  inputFlex: {
    marginLeft: 8,
  },
  svgPlay: {
    position: 'absolute',
    zIndex: 99,
    top: '44%',
    left: '40%',
  },
  cover: {
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.BLACK + 20,
    height: 30,
    justifyContent: 'center',
  },
});

const NewShortsScreen = () => {
  const {params} = useRoute();
  const [caption, setCaption] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const navigation = useNavigation();
  const [isPlay, setPlay] = useState(false);
  const [isCoverImage, setCoverImage] = useState<any>(COVER_IMAGE);
  const [isDoc, setDoc] = useState(false);

  const handleOpenDoc = () => {
    setDoc(true);
  };

  const handleCloseDoc = () => {
    setDoc(false);
  };
  const getParams: any = params;

  const handleUpload = () => {
    setLoader(true);
    const formData: any = new FormData();
    formData.append('file', {
      type: 'video/mp4',
      name: 'video.mp4',
      uri: getParams.video?.path,
    });
    dispatch(fileUploadMiddleWare({formData}))
      .then(res => {
        if (
          Array.isArray(res.payload) &&
          res.payload.length > 0 &&
          res.payload[0]
        ) {
          dispatch(
            feedsPostMiddleWare({
              description: caption,
              coverImageUrl: isCoverImage,
              videoUrl: res.payload[0],
            }),
          )
            .then(feedRes => {
              if (feedRes.payload) {
                navigation.navigate('ReelsScreen');
              }
              setLoader(false);
            })
            .catch(() => {
              setLoader(false);
            });
        } else {
          setLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const textAlignVertical: any = {textAlignVertical: 'top'};

  const handlePlay = () => {
    setPlay(true);
  };
  const handlePass = () => {
    setPlay(false);
  };

  const handleCoverUpload = (image: any) => {
    const formData: any = new FormData();
    formData.append('file', {
      type: 'image/jpeg',
      name: 'photo.jpg',
      uri: image?.path,
    });
    dispatch(fileUploadMiddleWare({formData}))
      .then(res => {
        if (
          Array.isArray(res.payload) &&
          res.payload.length > 0 &&
          res.payload[0]
        ) {
          setCoverImage(res.payload[0]);
        } else {
          setLoader(false);
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const handleClose = () => {
    navigation.navigate('ReelsRecord');
  };
  const behavior: any = IS_ANDROID ? '' : 'padding';

  return (
    <>
      {isLoader && <Loader />}
      <DocumentPicker
        open={isDoc}
        close={handleCloseDoc}
        onChange={handleCoverUpload}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={behavior}>
          <Flex flex={1} between overrideStyle={styles.overAll}>
            <Flex row>
              <Flex flex={4}>
                <Flex overrideStyle={{position: 'relative'}}>
                  {isPlay ? (
                    <Video
                      repeat
                      ignoreSilentSwitch="ignore"
                      posterResizeMode="cover"
                      resizeMode="cover"
                      source={{uri: getParams.video?.path}}
                      style={{height: 184, width: '100%', borderRadius: 10}}
                      poster={isCoverImage}
                    />
                  ) : (
                    <Image
                      resizeMode="cover"
                      overrideStyle={{
                        height: 184,
                        width: '100%',
                        borderRadius: 10,
                      }}
                      src={isCoverImage}
                    />
                  )}

                  {!isPlay ? (
                    <>
                      <TouchableOpacity
                        onPress={handlePlay}
                        style={styles.svgPlay}>
                        <SvgPlay fill="#FEFEFE" width={24} height={24} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleOpenDoc}
                        style={styles.cover}>
                        <Text bold align="center" color="white">
                          Cover
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={handlePass}
                      style={styles.svgPlay}>
                      <SvgPass fill="#FEFEFE" width={24} height={24} />
                    </TouchableOpacity>
                  )}
                </Flex>
              </Flex>
              <Flex flex={8} overrideStyle={styles.inputFlex}>
                <InputText
                  overrideStyle={textAlignVertical}
                  align="top"
                  numberOfLines={8}
                  multiline
                  value={caption}
                  onChange={setCaption}
                />
              </Flex>
            </Flex>

            <Flex>
              <Button onClick={handleUpload}>Post</Button>
              <Button
                onClick={handleClose}
                overrideStyle={styles.cancel}
                type="secondary">
                Cancel
              </Button>
            </Flex>
          </Flex>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};
export default NewShortsScreen;
