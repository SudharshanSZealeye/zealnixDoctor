import React from 'react';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {Flex, Text} from 'squashapps-react-native-uikit';

const ReelsEmpty = () => {
  const {width} = useSafeAreaFrame();

  return (
    <Flex flex={1} center middle overrideStyle={{width}}>
      <Text align="center" color="gray">
        Reels data not found
      </Text>
    </Flex>
  );
};

export default ReelsEmpty;
