import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import {
  Button,
  Flex,
  getColors,
  Icons,
  StyleSheet,
  Text,
  helpers,
} from 'squashapps-react-native-uikit';
import moment from 'moment';
import { APP_THEME } from '../../utils/constants';
import AppointmentInnerListCard from './AppointmentInnerListCard';
import { TodaysAppointmentList } from './store/home.types';
import { getCurrentTime } from '../../utils/helpers';
import { appointmentData } from './mock';

const { PRIMARY_COLOR_500 } = getColors(APP_THEME);
const { SvgCalenderTick, SvgClock, SvgVideoCircle } = Icons;
const { getDateString } = helpers;

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: PRIMARY_COLOR_500,
    borderRadius: 24,
    padding: 20,
  },
  dateText: {
    marginLeft: 12,
  },
  clockConatiner: {
    marginTop: 10,
  },
  inlineCard: {
    paddingRight: 24,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  nameContainer: {
    marginLeft: 10,
  },
  cardListContainer: {
    marginTop: 20,
  },
  overAllContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

type Props = {
  handleVideo: (args: string) => void;
  items: TodaysAppointmentList;
  handleView: Function;
};
const AppointmentsCard = ({ items, handleView, handleVideo }: Props) => {
  const { width } = useSafeAreaFrame();



  return (
    <Button type="link" onClick={() => handleView(items.id)}>
      <Flex overrideStyle={[styles.overAllContainer, { width }]}>
        <Flex overrideStyle={[styles.overAll]}>
          <Flex row between>
            <Flex between>
              <Flex row center>
                <SvgCalenderTick />
                <Text
                  overrideStyle={styles.dateText}
                  type="heading500"
                  color="white">
                  17th May,2024
                </Text>
              </Flex>
              <Flex row center overrideStyle={styles.clockConatiner}>
                <SvgClock />
                <Text
                  overrideStyle={styles.dateText}
                  type="heading500"
                  color="white">
                  10:00AM
                  -12:00PM
                </Text>
              </Flex>
            </Flex>
            {items.type === 'video' && (
              <Button type="link" onClick={() => handleVideo(items.id)}>
                <SvgVideoCircle
                  height={28}
                  width={28}
                  fill={PRIMARY_COLOR_500}
                />
              </Button>
            )}
          </Flex>
          <View style={styles.cardListContainer}>
            <FlatList
              bounces={false}
              data={appointmentData}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <AppointmentInnerListCard
                  totalLength={appointmentData.length}
                  index={index}
                  item={item}
                />
              )}
            />
          </View>
        </Flex>
      </Flex>
    </Button>
  );
};

export default AppointmentsCard;
