/* eslint max-len: ["error", { "code": 4000 }] */
import React from 'react';
import {View} from 'react-native';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';
import {Flex, Icons, StyleSheet, Text} from 'squashapps-react-native-uikit';

const {SvgVideoCamera, SvgMap, SvgStartHalf, SvgStar} = Icons;

const defaultProps = {
  fill: '#FFE4E1',
  width: 161,
  height: 121,
  stopColor: '#FF4436',
  stopColorOne: '#FF4D3F',
  isRating: false,
  title: '',
  value: '',
  videoValue: '',
  mapValue: '',
};

const styles = StyleSheet.create({
  valueText: {
    marginVertical: 16,
  },
  overAll: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'absolute',
    zIndex: 11,
  },
  subValue: {
    marginLeft: 8,
  },
  videoConatiner: {
    marginRight: 20,
  },
});
const SvgFrame = ({
  fill,
  width,
  height,
  stopColorOne,
  stopColor,
  isRating,
  title,
  value,
  videoValue,
  mapValue,
}: typeof defaultProps) => (
  <View style={{position: 'relative'}}>
    <Flex overrideStyle={styles.overAll}>
      <Text type="heading400">{title}</Text>
      <Text type="heading700" overrideStyle={styles.valueText}>
        {value}
      </Text>
      {isRating ? (
        <Flex row between center>
          <SvgStar />
          <SvgStar />
          <SvgStar />
          <SvgStar />
          <SvgStartHalf />
        </Flex>
      ) : (
        <Flex row center>
          <Flex row center overrideStyle={styles.videoConatiner}>
            <SvgVideoCamera />
            <Text overrideStyle={styles.subValue}>{videoValue}</Text>
          </Flex>
          <Flex row center>
            <SvgMap />
            <Text overrideStyle={styles.subValue}>{mapValue}</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
    <Svg width={width} height={height} fill="none" viewBox="0 0 161 121">
      <G clipPath="url(#Frame_33870_svg__a)">
        <Rect width={161} height={121} rx={20} fill={fill} />
        <Path
          d="M114.837 88c-2.252 0-7.697-.832-10.888-8.875l-10.7-26.624c-1.503-3.79-6.853-7.303-10.89-7.303l-56.319.184c-3.849 0-7.04-3.05-7.04-6.933 0-3.79 3.098-6.933 7.04-6.933l56.32-.185h.094c9.856 0 20.368 7.025 24.029 16.085l8.542 21.263 19.337-48.257c2.909-7.21 8.072-8.228 10.231-8.413 2.159-.092 7.415.37 11.076 7.211l9.762 18.212c1.69 3.143 6.759 6.194 10.419 6.194h38.11c3.849 0 7.04 3.143 7.04 6.933s-3.191 6.934-7.04 6.934h-38.11c-8.917 0-18.679-5.824-22.809-13.59l-7.322-13.682-19.712 48.904c-3.473 7.95-9.011 8.875-11.17 8.875Z"
          fill="url(#Frame_33870_svg__b)"
          fillOpacity={0.08}
        />
      </G>
      <Defs>
        <LinearGradient
          id="Frame_33870_svg__b"
          x1={100}
          y1={45.5}
          x2={193.008}
          y2={56.433}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={stopColor} />
          <Stop offset={0.943} stopColor={stopColorOne} stopOpacity={0.25} />
        </LinearGradient>
        <ClipPath id="Frame_33870_svg__a">
          <Path fill="#fff" d="M0 0h161v121H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

SvgFrame.defaultProps = defaultProps;

export default SvgFrame;
