import React from 'react';
// import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native';
import {Button, Flex, Icons, Image} from 'squashapps-react-native-uikit';
import {COVER_IMAGE} from '../../utils/constants';

type Props = {
  item: any;
  index: number;
  handleViewVideo: () => void;
};

const {SvgRoundPlay} = Icons;
const styles = StyleSheet.create({
  overAll: {
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 10,
    position: 'relative',
  },
  svgPlay: {
    position: 'absolute',
    zIndex: 99,
    top: '45%',
    left: '40%',
  },
  emptyStyle: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
});

const SortsCard = ({item, index, handleViewVideo}: Props) => {
  return (
    <Flex flex={1} between overrideStyle={styles.overAll}>
      {item?.empty ? (
        <View style={styles.emptyStyle} />
      ) : (
        <Flex key={index.toString()}>
          <Image
            src={item.coverImageUrl ? item.coverImageUrl : COVER_IMAGE}
            height={200}
            width="100%"
          />
          {/* <Video
            repeat
            posterResizeMode="cover"
            poster={item.coverImageUrl}
            paused
            currentTime={0}
            resizeMode="cover"
            source={{uri: item.videoUrl}}
            style={{height: 200, width: '100%', borderRadius: 10}}
          /> */}
          <Button
            overrideStyle={styles.svgPlay}
            type="link"
            onClick={handleViewVideo}>
            <SvgRoundPlay />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default SortsCard;
