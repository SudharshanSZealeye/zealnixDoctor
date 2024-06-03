import React, {useState} from 'react';
import {View, StyleSheet, FlatList, KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'squashapps-react-native-uikit';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import EmptyMessage from './EmptyMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREY_30,
  },
});

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      text: 'Hi, Dr. Matias 🙏 ',
      sender: 'me',
    },
    {
      text: 'Hi John, how can I help you?',
      sender: 'reciver',
    },
  ]);

  const insets = useSafeAreaInsets();
  const handleSend = (message: string) => {
    setMessages((prevMessages: any) => [
      ...prevMessages,
      {text: message, sender: 'me'},
    ]);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={60}
        behavior="padding"
        style={{flex: 1}}>
        <FlatList
          ListEmptyComponent={<EmptyMessage />}
          inverted={messages?.length !== 0}
          data={messages?.reverse()}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => (
            <ChatMessage text={item.text} sender={item.sender} />
          )}
        />
        <View style={{marginBottom: insets.bottom, paddingHorizontal: 20}}>
          <ChatInput onSend={handleSend} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
