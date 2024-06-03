import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Flex, getColors, Text} from 'squashapps-react-native-uikit';
import {APP_THEME} from '../../utils/constants';

const {PRIMARY_COLOR_500, WHITE} = getColors(APP_THEME);

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    paddingHorizontal: 20,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  msgTime: {
    marginHorizontal: 30,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: PRIMARY_COLOR_500,
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: WHITE,
    borderTopLeftRadius: 0,
  },
});

type Props = {
  text: string;
  sender: string;
};

const ChatMessage = ({text, sender}: Props) => {
  const checkSender = sender === 'me';
  const messageStyle = checkSender ? styles.myMessage : styles.otherMessage;

  return (
    <Flex>
      <View style={[styles.messageContainer, messageStyle]}>
        <Text color={checkSender ? 'white' : 'primary'}>{text}</Text>
      </View>
      <Flex
        end={checkSender}
        start={!checkSender}
        overrideStyle={styles.msgTime}>
        <Text color="gray">9:40</Text>
      </Flex>
    </Flex>
  );
};

export default ChatMessage;
