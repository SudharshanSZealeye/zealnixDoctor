import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Flex, Icons, Text, getColors} from 'squashapps-react-native-uikit';
import SvgFrame from '../../icons/SvgFrame';
import TitleWithValue from '../../common/TitleWithValue';
import {APP_THEME} from '../../utils/constants';

const {SvgDownAngle} = Icons;

const {PRIMARY_COLOR_500} = getColors(APP_THEME);

const styles = StyleSheet.create({
  statusText: {
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 20,
  },
  scrollStyle: {
    paddingHorizontal: 20,
  },
  cardStyle: {
    marginRight: 50,
    marginLeft: 20,
  },
});

const StatusCard = () => {
  return (
    <Flex>
      <Flex overrideStyle={styles.statusText}>
        <TitleWithValue
          between
          title="Stats"
          titleSize="heading500"
          value={
            <Flex row middle between center>
              <Text color="theme" type="body200">
                Last Month
              </Text>
              <SvgDownAngle fill={PRIMARY_COLOR_500} />
            </Flex>
          }
        />
      </Flex>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.scrollStyle}>
        <Flex row>
          <SvgFrame
            isRating
            width={160}
            height={130}
            title="Average Rating"
            value="4.2"
            stopColor="#0099FF"
            stopColorOne="#0099FF"
            fill="#EAF7FF"
          />
          <View style={styles.cardStyle}>
            <SvgFrame
              value="213"
              videoValue="12"
              mapValue="11"
              title="Total Appointments"
              width={160}
              height={130}
              fill="#FFE4E1"
            />
          </View>
        </Flex>
      </ScrollView>
    </Flex>
  );
};

export default StatusCard;
