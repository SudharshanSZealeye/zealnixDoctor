/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const defaultProps = {
  fill: '#6319B8',
  width: 36,
  height: 36,
};
const SvgLogo = ({fill, width, height}: typeof defaultProps) => (
  <Svg width={width} height={height} fill="none">
    <Rect width={width} height={width} rx={12.96} fill={fill} />
    <Path
      d="M16.814 18.812h-.87a1.303 1.303 0 0 1-1.305-1.305c0-.722.583-1.305 1.305-1.305h.87v-.87c0-.722.583-1.304 1.305-1.304s1.304.582 1.304 1.304v.87h.87c.722 0 1.305.583 1.305 1.305s-.583 1.305-1.305 1.305h-.87v.87c0 .721-.582 1.304-1.304 1.304a1.303 1.303 0 0 1-1.305-1.305v-.87Zm.696-9.342-5.22 1.957a1.752 1.752 0 0 0-1.13 1.635v4.088c0 4.393 2.966 8.49 6.959 9.49 3.992-1 6.958-5.097 6.958-9.49v-4.088a1.74 1.74 0 0 0-1.13-1.626l-5.22-1.957a1.681 1.681 0 0 0-1.217-.01Z"
      fill="#fff"
    />
  </Svg>
);

SvgLogo.defaultProps = defaultProps;

export default SvgLogo;
