/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';

const defaultProps = {
  width: 26,
  height: 27,
};

const SvgChangeCamera = ({width, height}: typeof defaultProps) => (
  <Svg viewBox="0 0 26 27" width={width} height={height} fill="none">
    <G filter="url(#Change_Camera_svg__a)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M21.767 6.28c.289-.244.415-.834-.698-1.892C16.27-.173 8.157.628 3.683 5.518L2.517 6.974V4.22l-.007-.105a.763.763 0 0 0-.752-.668.766.766 0 0 0-.758.773v4.663c0 .569.453 1.03 1.011 1.03h5.074l.103-.007a.768.768 0 0 0 .656-.766l-.007-.104a.763.763 0 0 0-.752-.668l-3.722-.001.381-.483 1.081-1.351.21-.223c3.894-4.012 10.888-4.7 15-.793l.282.261c.778.697 1.06.735 1.315.593l.095-.061.04-.031ZM25 22.523V17.86c0-.569-.453-1.03-1.011-1.03h-5.074l-.103.007a.768.768 0 0 0-.656.766l.007.105c.05.377.368.668.752.668h3.722l-.381.483-1.081 1.351-.21.223c-3.894 4.012-10.888 4.7-15 .793l-.282-.261c-.778-.697-1.06-.735-1.315-.593l-.095.061-.04.031c-.289.245-.415.834.698 1.892 4.799 4.561 12.912 3.76 17.386-1.13l1.166-1.456v2.753l.007.105c.05.377.368.668.752.668a.766.766 0 0 0 .758-.773Z"
        clipRule="evenodd"
      />
    </G>
    <Defs />
  </Svg>
);

SvgChangeCamera.defaultProps = defaultProps;

export default SvgChangeCamera;
