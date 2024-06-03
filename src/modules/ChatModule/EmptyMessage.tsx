import React from 'react';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {Flex, getColors, StyleSheet, Text} from 'squashapps-react-native-uikit';
import {APP_THEME} from '../../utils/constants';

const {SECONDARY_COLOR_50} = getColors(APP_THEME);
const styles = StyleSheet.create({
  helloText: {
    marginVertical: 20,
  },
  sayHello: {
    backgroundColor: SECONDARY_COLOR_50,
    borderRadius: 15,
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
});
const EmptyMessage = () => {
  const {height} = useSafeAreaFrame();
  return (
    <Flex center middle overrideStyle={{height: height - 180}}>
      <Text size={50}>👋</Text>
      <Text overrideStyle={styles.helloText} type="heading600">
        Hello, how are you today?
      </Text>
      <Text color="gray" size={14}>
        Can I help you? please tell me
      </Text>
      <Flex middle center overrideStyle={styles.sayHello}>
        <Text>Say, Hi! 👋</Text>
      </Flex>
    </Flex>
  );
};

export default EmptyMessage;
