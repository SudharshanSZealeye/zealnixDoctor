import React from 'react';
import {Flex, Text, StyleSheet} from 'squashapps-react-native-uikit';
import SvgLogo from '../../icons/SvgLogo';

const styles = StyleSheet.create({
  logoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  messageTitle: {
    marginHorizontal: 20,
  },
});

type Props = {
  title: string;
};
const MessageHeader = ({title}: Props) => {
  return (
    <Flex row center overrideStyle={styles.logoContainer}>
      <SvgLogo />
      <Text type="heading700" overrideStyle={styles.messageTitle}>
        {title}
      </Text>
    </Flex>
  );
};

export default MessageHeader;
