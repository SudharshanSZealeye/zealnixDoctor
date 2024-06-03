/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';

const defaultProps = {
  width: 80,
  height: 81,
  fill: '#FEFEFE',
};

const SvgShotButton = ({width, height, fill}: typeof defaultProps) => (
  <Svg viewBox="0 0 80 81" width={width} height={height} fill="none">
    <G filter="url(#Shot_Button_svg__a)">
      <Path
        fill="#fff"
        fillOpacity={0.3}
        fillRule="evenodd"
        d="M40 80.372c22.091 0 40-17.908 40-40 0-22.091-17.909-40-40-40s-40 17.909-40 40c0 22.092 17.909 40 40 40Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill={fill}
      fillRule="evenodd"
      d="M40 68.372c15.464 0 28-12.536 28-28s-12.536-28-28-28-28 12.536-28 28 12.536 28 28 28Z"
      clipRule="evenodd"
    />
    <Defs />
  </Svg>
);

SvgShotButton.defaultProps = defaultProps;

export default SvgShotButton;
