/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';

const defaultProps = {
  width: 26,
  height: 81,
};

const SvgLight = ({width, height}: typeof defaultProps) => (
  <Svg viewBox="0 0 26 27" width={width} height={height} fill="none">
    <G filter="url(#Light_svg__a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M13 1.372c6.627 0 12 5.373 12 12 0 6.628-5.373 12-12 12S1 20 1 13.372c0-6.627 5.373-12 12-12Zm0 1.263c-5.93 0-10.737 4.807-10.737 10.737S7.07 24.11 13 24.11s10.737-4.807 10.737-10.737S18.93 2.635 13 2.635Zm.448 1.42-.106-.005a.842.842 0 0 0-.746.467l-4.055 8.155-.039.09a.842.842 0 0 0 .418 1.039l3.64 1.638-.738 6.323-.006.098a.842.842 0 0 0 1.597.375l4.055-8.154.038-.09a.842.842 0 0 0-.417-1.04l-3.641-1.638.739-6.324.005-.098a.842.842 0 0 0-.744-.836Z"
        clipRule="evenodd"
      />
    </G>
    <Defs />
  </Svg>
);

SvgLight.defaultProps = defaultProps;

export default SvgLight;
