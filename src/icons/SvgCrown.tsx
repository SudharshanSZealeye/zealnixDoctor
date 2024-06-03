/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  ClipPath,
} from 'react-native-svg';

const defaultProps = {
  width: 86,
  height: 86,
};

const SvgCrown = ({width, height}: typeof defaultProps) => (
  <Svg viewBox="0 0 86 86" width={width} height={height} fill="none">
    <G filter="url(#Group_33888_svg__a)">
      <Circle cx={43} cy={28} r={12} fill="url(#Group_33888_svg__b)" />
      <Circle
        cx={43}
        cy={28}
        r={11.314}
        stroke="#fff"
        strokeOpacity={0.3}
        strokeWidth={1.371}
      />
    </G>
    <G clipPath="url(#Group_33888_svg__c)" filter="url(#Group_33888_svg__d)">
      <Path
        fill="#fff"
        fillOpacity={0.85}
        d="M37.512 31.943h10.285v1.028H37.512v-1.028Zm0-7.2 2.571 1.8 2.572-3.343 2.571 3.343 2.571-1.8v6.171H37.512v-6.171Zm1.028 1.975v3.168h8.229v-3.168L45.01 27.95l-2.355-3.062-2.356 3.062-1.759-1.23Z"
        // shapeRendering="crispEdges"
      />
    </G>
    <Defs>
      <LinearGradient
        id="Group_33888_svg__b"
        x1={43}
        x2={43}
        y1={16}
        y2={40}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFCF53" />
        <Stop offset={1} stopColor="#F90" />
      </LinearGradient>
      <ClipPath id="Group_33888_svg__c">
        <Path fill="#fff" d="M36.488 22.172h12.343v12.342H36.488z" />
      </ClipPath>
    </Defs>
  </Svg>
);

SvgCrown.defaultProps = defaultProps;

export default SvgCrown;
