import React, {useState} from 'react';
import {InputText, Button, Icons} from 'squashapps-react-native-uikit';

const {SvgAttach, SvgSend} = Icons;
type Props = {
  onSend: (a: any) => void;
};
const ChatInput = ({onSend}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <InputText
      placeholder="Message here"
      value={inputValue}
      onChange={setInputValue}
      actionRight={() => (
        <Button type="link" onClick={handleSend}>
          <SvgSend />
        </Button>
      )}
      actionLeft={() => (
        <Button type="link" overrideStyle={{marginLeft: 16}}>
          <SvgAttach />
        </Button>
      )}
    />
  );
};

export default ChatInput;
