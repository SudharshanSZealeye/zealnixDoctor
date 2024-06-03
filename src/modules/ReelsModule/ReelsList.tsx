import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {useDispatch} from 'react-redux';
import {Button, Colors, Flex, Icons, Text} from 'squashapps-react-native-uikit';
import {IS_ANDROID, USER_PROFILE} from '../../utils/constants';
import SvgSave from '../../icons/SvgSave';
import {FeedList} from './store/reels.types';
import {AppDispatch} from '../../redux/store';
import {
  feedsReactionsMiddleWare,
  feedsListMiddleWare,
} from './store/reelsMiddleware';

const {SvgPlay, SvgLike, SvgMyProfile} = Icons;

type Props = {
  item: FeedList;
  isCurrentIndex: number;
  handleProfileNavigate: (a: any) => void;
  index: number;
};

const styles = StyleSheet.create({
  svgPlay: {
    position: 'absolute',
    zIndex: 99,
    top: '46%',
    left: '44%',
  },
  actionContainer: {
    position: 'absolute',
    zIndex: 99,
    bottom: 60,
    right: 8,
  },
  profileNameContainer: {
    position: 'absolute',
    zIndex: 99,
    bottom: 20,
    paddingHorizontal: 16,
  },
});

const ReelsList = ({
  item,
  handleProfileNavigate,
  index,
  isCurrentIndex,
}: Props) => {
  const {height, width} = useSafeAreaFrame();
  const {bottom, top} = useSafeAreaInsets();
  const [isPass, setPass] = useState(false);
  const [isLike, setLike] = useState(false);
  const [isSave, setSave] = useState(false);
  const [isLoad, setLoad] = useState(false);

  const videoRef = useRef<any>(null);
  const isFocused = useIsFocused();
  const dispatch: AppDispatch = useDispatch();

  const handlePass = () => {
    setPass(!isPass);
  };

  const handleLike = () => {
    dispatch(
      feedsReactionsMiddleWare({
        feedId: item._id,
        type: isLike ? 'unlike' : 'like',
      }),
    ).then(() => {
      setLike(pre => (pre ? false : true));
      dispatch(feedsListMiddleWare({}));
    });
  };

  const handleSave = () => {
    setSave(!isSave);
    dispatch(
      feedsReactionsMiddleWare({
        feedId: item._id,
        type: isSave ? 'unsaved' : 'saved',
      }),
    ).then(() => {
      setSave(pre => (pre ? false : true));
      dispatch(feedsListMiddleWare({}));
    });
  };

  useEffect(() => {
    return () => {
      if (!!videoRef.current) {
        videoRef.current.seek(0);
        setPass(false);
      }
    };
  }, [isCurrentIndex]);

  useEffect(() => {
    setLike(item.liked);
    setSave(item.saved);
  }, [item]);

  return (
    <Flex>
      {isLoad && (
        <View style={[styles.svgPlay]}>
          <ActivityIndicator size="large" color={Colors.INPROGRESS_600} />
        </View>
      )}
      <Video
        key={index}
        ref={videoRef}
        ignoreSilentSwitch="ignore"
        posterResizeMode="cover"
        paused={isCurrentIndex !== index || !isFocused || isPass}
        onTouchStart={handlePass}
        resizeMode="cover"
        source={{uri: item.videoUrl}}
        poster={item.coverImageUrl}
        style={{
          height: height - (bottom + top + (IS_ANDROID ? 50 : 45)),
          width,
        }}
        onLoad={() => {
          setLoad(false);
        }}
        onLoadStart={() => {
          setLoad(true);
        }}
        onEnd={() => {
          if (!!videoRef.current) {
            videoRef.current.seek(0);
            setPass(true);
          }
        }}
      />

      {isPass && (
        <View style={styles.svgPlay}>
          <Button type="link" onClick={handlePass}>
            <SvgPlay fill="#FEFEFE" width={40} height={40} />
          </Button>
        </View>
      )}
      <Flex overrideStyle={styles.actionContainer}>
        <Flex center>
          <Button type="link" onClick={handleLike}>
            <SvgLike fill={isLike ? Colors.ERROR_500 : Colors.WHITE} />
          </Button>
          <Text size={12} bold color="white" align="center">
            {item.likeCount}
          </Text>
        </Flex>
        <Flex center overrideStyle={{marginVertical: 16}}>
          <Button type="link" onClick={handleSave}>
            <SvgSave fill={isSave ? Colors.ERROR_500 : Colors.WHITE} />
          </Button>
          <Text bold size={12} color="white" align="center">
            Save
          </Text>
        </Flex>
        <Flex center>
          <Button type="link" onClick={handleProfileNavigate}>
            <SvgMyProfile />
          </Button>
          <Text bold size={12} color="white" align="center">
            My Profile
          </Text>
        </Flex>
      </Flex>
      <Flex overrideStyle={styles.profileNameContainer}>
        <Flex row center>
          <Image
            style={{
              width: 32,
              height: 32,
              borderRadius: 100,
            }}
            source={{
              uri: item?.createdBy?.profileImageUrl
                ? item?.createdBy?.profileImageUrl
                : USER_PROFILE,
            }}
          />
          <Text overrideStyle={{marginLeft: 8}} bold color="white">
            {item?.createdBy?.name}
          </Text>
        </Flex>
        <Text
          overrideStyle={{marginTop: 8}}
          numberOfLines={1}
          ellipsizeMode="tail"
          color="white">
          {item.description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ReelsList;
