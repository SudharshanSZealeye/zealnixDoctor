import React, {ReactChild} from 'react';
import {StyleSheet} from 'react-native';
import {Flex} from 'squashapps-react-native-uikit';

export const styles = StyleSheet.create({
  overAll: {
    marginTop: 16,
  },
});

type Props = {
  icon: ReactChild;
};

const TabBarIcon = ({icon}: Props) => {
  return (
    <Flex center middle overrideStyle={styles.overAll}>
      {icon}
    </Flex>
  );
};

export default TabBarIcon;
