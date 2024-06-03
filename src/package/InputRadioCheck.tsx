import React, {useEffect, useRef, useCallback} from 'react';
import {Animated, Easing, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Flex,
  Text,
  Icons,
  getColors,
  validators,
} from 'squashapps-react-native-uikit';
import {
  textColors,
  textSize,
  textType,
} from 'squashapps-react-native-uikit/Text';
import {APP_THEME} from '../utils/constants';
import SvgTickSelect from '../icons/SvgTickSelect';

const {SvgRadioWithOutLine} = Icons;
const {PRIMARY_COLOR_500} = getColors(APP_THEME);
const {isEmpty} = validators;

// Stylesheet for the component
const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    height: 48,
    marginBottom: 12,
    // Change this to the desired gray color
  },
});

// Default props for the component
type DefaultPropsTypes = {
  name?: string;
};
const defaultProps: DefaultPropsTypes = {
  name: '',
};

// Props for the component
type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  color?: string;
  size?: number;
  label?: import('react').ReactNode;
  value?: string;
  labelColor?: textColors;
  labelSize?: textSize;
  type?: textType;
  disabled?: boolean;
  isLast: boolean;
} & typeof defaultProps;

// InputRadio component
const InputRadioCheck = ({
  onClick,
  onBlur,
  name,
  checked,
  size,
  color,
  label,
  labelSize,
  labelColor,
  value,
  disabled,
  isLast,
  type,
}: Props) => {
  const currentValue = useRef(new Animated.Value(0)).current;

  // Handle onClick event
  const handleOnClick = useCallback(
    (e: any) => {
      if (typeof onClick === 'function' && e && !disabled) {
        const requiredVal = typeof value !== 'undefined' ? value : name;
        // eslint-disable-next-line no-param-reassign
        e.target.value = requiredVal;
        onClick(e);
      }
    },
    [onClick],
  );

  // Animate the radio button when checked
  useEffect(() => {
    if (checked === true) {
      Animated.timing(currentValue, {
        toValue: 0.8,
        duration: 20,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }).start(() => {
        Animated.spring(currentValue, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [checked]);

  // Set colors based on the theme or custom color
  let colors;
  if (isEmpty(color)) {
    colors = PRIMARY_COLOR_500;
  } else {
    colors = color;
  }

  return (
    <TouchableOpacity
      testID="InputRadio"
      onPress={handleOnClick}
      onBlur={onBlur}
      activeOpacity={1}>
      <Flex
        row
        between
        top
        overrideStyle={!isLast ? styles.line : {marginVertical: 4}}>
        <Text size={labelSize} testID="label" color={labelColor} type={type}>
          {label}
        </Text>

        {checked ? (
          <Animated.View style={{transform: [{scale: currentValue}]}}>
            <SvgTickSelect height={size} width={size} fill={colors} />
          </Animated.View>
        ) : (
          <SvgRadioWithOutLine height={size} width={size} />
        )}
      </Flex>
    </TouchableOpacity>
  );
};

// Default label size
InputRadioCheck.defaultProps = {
  labelSize: 16,
  type: 'heading300',
};

export default InputRadioCheck;
