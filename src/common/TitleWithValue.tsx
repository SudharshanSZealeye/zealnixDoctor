import React from 'react';
import {Flex, Text} from 'squashapps-react-native-uikit';
import {textColors, textType} from 'squashapps-react-native-uikit/Text';

type TitleProps = {
  title: string;
  value?: any;
  titleSize?: textType;
  titleColor?: textColors;
  between?: boolean;
  valueSize?: textType;
  valueColor?: textColors;
  marginBottom?: number;
};

const TitleWithValue = ({
  title,
  value,
  titleSize = 'heading500',
  titleColor,
  between,
  valueSize = 'body200',
  valueColor,
  marginBottom = 16,
}: TitleProps) => {
  return (
    <Flex between={between} row center overrideStyle={[{marginBottom}]}>
      <Text color={titleColor} type={titleSize}>
        {title}
      </Text>
      {typeof value === 'string' ? (
        <Text color={valueColor} type={valueSize}>
          {value}
        </Text>
      ) : (
        value
      )}
    </Flex>
  );
};

export default TitleWithValue;
