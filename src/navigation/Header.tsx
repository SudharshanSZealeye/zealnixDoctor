import React from 'react';
import {
  Button,
  Colors,
  Flex,
  Icons,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import CustomStatusBar from '../common/CustomStatusBar';

const {SvgArrowLeft} = Icons;

const styles = StyleSheet.create({
  overAll: {
    paddingLeft: 30,
    paddingRight: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY_30,
    backgroundColor: Colors.WHITE,
  },
  title: {
    marginHorizontal: 16,
  },
});

type Props = {
  props: any;
};

const Header = ({props}: Props) => {
  const handleGoBack = () => props.navigation.goBack();
  return (
    <>
      <CustomStatusBar barStyle="dark-content" />
      <Flex overrideStyle={styles.overAll}>
        <Flex row center>
          <Button type="link" onClick={handleGoBack}>
            <SvgArrowLeft />
          </Button>
          <Flex flex={1} center>
            <Text type="heading500" overrideStyle={styles.title}>
              {props.options.title}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
