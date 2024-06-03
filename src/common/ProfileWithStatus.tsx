import React, {ReactChild} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'squashapps-react-native-uikit';
import {USER_PROFILE} from '../utils/constants';

const styles = StyleSheet.create({
  imgContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

type Props = {
  src: string;
  height: number;
  width: number;
  borderRadius: number;
  icon?: ReactChild;
};

const ProfileWithStatus = ({src, height, width, borderRadius, icon}: Props) => {
  return (
    <View style={styles.imgContainer}>
      <Image
        resizeMode="cover"
        overrideStyle={{height, width, borderRadius}}
        src={src ? src : USER_PROFILE}
      />
      {icon && <View style={styles.dotContainer}>{icon}</View>}
    </View>
  );
};

export default ProfileWithStatus;
