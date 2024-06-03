import React from 'react';
import {
  Button,
  Colors,
  Flex,
  Modal,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import {textAlignForm, textColors} from 'squashapps-react-native-uikit/Text';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 26,
    paddingVertical: 30,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  services: {
    marginBottom: 20,
  },
  des: {
    marginBottom: 30,
  },
});

type Props = {
  open: boolean;
  close: () => void;
  title: string;
  message: string;
  titleColor?: textColors;
  messageAlign?: textAlignForm;
};

const AlertModal = ({
  close,
  open,
  title,
  message,
  titleColor = 'primary',
  messageAlign = 'center',
}: Props) => {
  return (
    <Modal isVisible={open}>
      <Flex overrideStyle={styles.overAll}>
        <Text
          color={titleColor}
          size={20}
          align="center"
          overrideStyle={styles.services}
          bold>
          {title}
        </Text>
        <Text align={messageAlign} overrideStyle={styles.des}>
          {message}
        </Text>
        <Button curved onClick={close}>
          Okay
        </Button>
      </Flex>
    </Modal>
  );
};

export default AlertModal;
