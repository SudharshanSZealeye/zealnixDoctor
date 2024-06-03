/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import Svg, {Defs, G, Path} from 'react-native-svg';

const defaultProps = {
  width: 38,
  height: 41,
};

const SvgReelsBold = ({width, height}: typeof defaultProps) => (
  <Svg viewBox="0 0 38 41" width={width} height={height} fill="none">
    <G filter="url(#Vector_svg__a)">
      <Path
        fill="#36F"
        d="M12.167 25.034c-.38 0-.753-.1-1.084-.287A2.167 2.167 0 0 1 10 22.873V7.164a2.167 2.167 0 0 1 3.25-1.874l13.612 7.849a2.167 2.167 0 0 1 0 3.748L13.25 24.763a2.204 2.204 0 0 1-1.083.271Zm2.166-14.137v8.233l7.123-4.117-7.123-4.117Zm7.123 4.116 4.328-2.497-4.328 2.497ZM10.006 8.4l4.327 2.498-4.328-2.498Zm4.327 10.73v4.99-4.99Z"
      />
      <Path
        stroke="#fff"
        strokeWidth={0.5}
        d="m25.783 12.805-4.201 2.424-6.999 4.045v4.429l12.154-7.032-.954-3.866Zm0 0 .954.55a1.916 1.916 0 0 1 0 3.316l-.954-3.866ZM12.169 24.784h-.002c-.336 0-.667-.088-.96-.254a1.916 1.916 0 0 1-.957-1.657V8.829l3.833 2.212v12.952l-.956.552c-.293.16-.623.243-.958.239Zm1.914-14.32L10.25 8.252V7.165a1.917 1.917 0 0 1 2.875-1.658l12.158 7.01-3.827 2.208-6.998-4.045-.375-.217Z"
      />
    </G>
    <Defs />
  </Svg>
);

SvgReelsBold.defaultProps = defaultProps;

export default SvgReelsBold;
