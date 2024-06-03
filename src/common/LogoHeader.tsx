import React from 'react';
import {Flex, Text, StyleSheet, getColors} from 'squashapps-react-native-uikit';
import SvgLogo from '../icons/SvgLogo';
import {APP_THEME} from '../utils/constants';

const {PRIMARY_COLOR_500} = getColors(APP_THEME);
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

const LogoHeader = ({title}: Props) => {
  return (
    <Flex row center overrideStyle={styles.logoContainer}>
      <SvgLogo fill={PRIMARY_COLOR_500} />
      <Text type="heading700" overrideStyle={styles.messageTitle}>
        {title}
      </Text>
    </Flex>
  );
};

export default LogoHeader;
