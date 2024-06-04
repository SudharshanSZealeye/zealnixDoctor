import { StyleSheet } from 'react-native';
import React from 'react';
import { Card, Flex, Icons, Text, helpers } from 'squashapps-react-native-uikit';
import ProfileWithStatus from '../../common/ProfileWithStatus';
import { TodaysAppointmentList } from './store/home.types';
import { getCurrentTime } from '../../utils/helpers';

type Prop = {
  item: any;
  handleView: Function;
};

const styles = StyleSheet.create({
  overAll: {
    marginHorizontal: 2,
    padding: 16,
    marginVertical: 8,
  },
  nameContainer: {
    marginLeft: 8,
  },
  textContainer: {
    marginLeft: 6,
  },
});

const { SvgMapRound, SvgArrowRight, SvgClock } = Icons;
const { getDateString } = helpers;

const RecentAppointmentCard = ({ item, handleView }: Prop) => {
  return (
    <Card
      align="stretch"
      outline
      overrideStyle={[styles.overAll]}
      onClick={() => handleView(item.id)}>
      <Flex row between center>
        <Flex row>
          <ProfileWithStatus
            height={37}
            width={37}
            borderRadius={13}
            src={item?.img}
            icon={<SvgMapRound width={10} height={10} />}
          />
          <Flex overrideStyle={styles.nameContainer}>
            <Text type="heading500">{item?.name}</Text>
            <Flex row between center overrideStyle={{ marginTop: 4 }}>
              <SvgClock fill="#000000" height={16} width={16} />

              <Text size={12} color="gray" overrideStyle={styles.textContainer}>
                {item.time} 
                {item.date}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <SvgArrowRight />
      </Flex>
    </Card>
  );
};

export default RecentAppointmentCard;
