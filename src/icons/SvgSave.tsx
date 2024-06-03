/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';

const defaultProps = {
  width: 48,
  height: 48,
  fill: '#fff',
};

const SvgSave = ({width, height, fill}: typeof defaultProps) => (
  <Svg viewBox="0 0 48 48" width={width} height={height} fill="none">
    <G filter="url(#Group_2875_svg__a)">
      <Path
        fill="#000"
        fillOpacity={0.4}
        d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
      />
    </G>
    <Path
      fill={fill}
      d="M18.4 32.4a.99.99 0 0 1-.95-.087c-.3-.191-.45-.47-.45-.838V17c0-.55.196-1.021.588-1.413A1.922 1.922 0 0 1 19 15h10c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v14.475c0 .367-.15.646-.45.838a.987.987 0 0 1-.95.087L24 30l-5.6 2.4Z"
    />
    <Defs />
  </Svg>
);

SvgSave.defaultProps = defaultProps;

export default SvgSave;
