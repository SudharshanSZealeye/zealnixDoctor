import {StyleProp, TextStyle} from 'react-native';
import {getColors, Colors} from 'squashapps-react-native-uikit';
import {APP_THEME} from '../../utils/constants';

const {PRIMARY_COLOR_500} = getColors(APP_THEME);

export const tabStyles = {
  tabBarActiveTintColor: PRIMARY_COLOR_500,
  tabBarInactiveTintColor: Colors.NEUTRAL_500,
  tabBarIndicatorStyle: {
    borderBottomColor: PRIMARY_COLOR_500,
    borderBottomWidth: 3,
    borderRadius: 4,
  },
  tabBarAllowFontScaling: false,
};
export const containerStyle = {
  backgroundColor: Colors.WHITE,
};
export const labelStyle: StyleProp<TextStyle> = {
  textTransform: 'capitalize',
  fontSize: 20,
  fontFamily: 'urbanist-semiBold',
};

export const reelContainerStyle = {
  bacgroundColor: 'transparent',
};
