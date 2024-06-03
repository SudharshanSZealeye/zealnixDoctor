import React from 'react';
import {
  Card,
  Flex,
  Icons,
  Status,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import LinearGradient from 'react-native-linear-gradient';
import ProfileWithStatus from '../../common/ProfileWithStatus';
import {AppointmentsList} from './store/appointment.types';
import {
  getCurrentTime,
  getStatusBackground,
  toHoursAndMinutes,
} from '../../utils/helpers';

const {SvgMapRound, SvgRightArrow, SvgVideoCircle, SvgCrown} = Icons;

const styles = StyleSheet.create({
  profile: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  nameContainer: {
    marginLeft: 15,
  },
  overAll: {
    paddingVertical: 12,
    marginTop: 10,
    marginBottom: 1,
    flex: 1,
    marginHorizontal: 2,
    paddingHorizontal: 8,
  },
  hospitalText: {
    marginRight: 12,
  },
  linearContaier: {
    height: 24,
    width: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  handleViewCard: (a: string) => void;
  item: AppointmentsList;
};

const AppointmentsCard = ({handleViewCard, item}: Props) => {
  let hospitalText = 'Hospital';
  let svgType = <SvgMapRound />;

  if (item.type === 'regular') {
    hospitalText = 'Hospital';
    svgType = <SvgMapRound />;
  } else if (item.type === 'video') {
    hospitalText = 'Video Call';
    svgType = <SvgVideoCircle />;
  } else if (item.type === 'priority') {
    hospitalText = 'Priority';
    svgType = (
      <LinearGradient
        colors={['rgba(255, 207, 83, 1)', 'rgba(255, 153, 0, 1)']}
        locations={[0, 1]}
        style={styles.linearContaier}>
        <SvgCrown />
      </LinearGradient>
    );
  }

  return (
    <Card
      onClick={() => handleViewCard(item?.id)}
      align="stretch"
      overrideStyle={styles.overAll}>
      <Flex row center between>
        <Flex row>
          <ProfileWithStatus
            height={75}
            width={75}
            borderRadius={100}
            src={item.patient?.profilePicUrl}
            icon={svgType}
          />
          <Flex between overrideStyle={styles.nameContainer}>
            <Text type="heading500">{item.patient?.name}</Text>
            <Flex row center>
              <Text type="body100" overrideStyle={styles.hospitalText}>
                {hospitalText}
              </Text>
              <Status
                        overrideStyle={{textTransform:'capitalize'}}

                size={10}
                color={getStatusBackground(item.status)}
                label={item.status}
              />
            </Flex>
            <Flex row center>
              <Text type="body100">
                {`${getCurrentTime(
                  item?.appointmentSchedule?.appointmentRangeStart,
                )} - ${getCurrentTime(
                  item?.appointmentSchedule?.appointmentRangeEnd,
                )}`}
              </Text>
              <Text size={10} color="gray">
                {`( ${toHoursAndMinutes(
                  item?.appointmentSchedule?.appointmentRangeEnd -
                    item?.appointmentSchedule?.appointmentRangeStart,
                )} )`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <SvgRightArrow />
      </Flex>
    </Card>
  );
};

export default AppointmentsCard;
