import React from 'react';
import {StyleSheet} from 'react-native';
import {Flex, Image, Text} from 'squashapps-react-native-uikit';
import {textType} from 'squashapps-react-native-uikit/Text';
import {USER_PROFILE} from '../utils/constants';

const styles = StyleSheet.create({
  nameContainer: {
    marginLeft: 10,
  },
});

type Props = {
  src: string;
  height: number;
  width: number;
  borderRadius: number;
  name: string;
  subName?: string;
  nameSize?: textType;
  subNameSize?: textType;
};

const ProfileWithName = ({
  src,
  height,
  width,
  borderRadius,
  name,
  subName,
  nameSize = 'heading400',
  subNameSize = 'body100',
}: Props) => {
  return (
    <Flex row center>
      <Image
        resizeMode="cover"
        overrideStyle={{height, width, borderRadius}}
        src={src ? src : USER_PROFILE}
      />
      <Flex row overrideStyle={styles.nameContainer}>
        <Text type={nameSize}>{name}</Text>
        {subName && (
          <Text color="gray" type={subNameSize}>
            {subName}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ProfileWithName;
