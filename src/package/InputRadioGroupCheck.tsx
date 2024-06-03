import React, {useState} from 'react';
import {Flex} from 'squashapps-react-native-uikit';
import InputRadioCheck from './InputRadioCheck';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
};

const InputRadioCheckGroup: React.FC<Props> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || '',
  );

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Flex>
      {options.map((option, index) => (
        <InputRadioCheck
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onClick={() => handleOptionClick(option.value)}
          isLast={index === options.length - 1}
        />
      ))}
    </Flex>
  );
};

export default InputRadioCheckGroup;
