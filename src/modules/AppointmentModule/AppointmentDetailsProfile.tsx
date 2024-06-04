import React from 'react';
import {
  Flex,
  Icons,
  Text,
  Button,
  StyleSheet,
  getColors,
  Status,
  helpers,
  ReadMoreText,
} from 'squashapps-react-native-uikit';
import LinearGradient from 'react-native-linear-gradient';
import ProfileWithStatus from '../../common/ProfileWithStatus';
import TitleWithValue from '../../common/TitleWithValue';
import { APP_THEME, USER_PROFILE } from '../../utils/constants';
import { AppointmentDetails } from './store/appointment.types';
import { getCurrentTime, getStatusBackground } from '../../utils/helpers';

const { SvgTimePeding, SvgCalenderTick, SvgVideoCircle, SvgCrown, SvgMapRound } =
  Icons;

const { NEUTRAL_500, PRIMARY_COLOR_500 } = getColors(APP_THEME);

const { getDateString, ageCalculator } = helpers;

const styles = StyleSheet.create({
  nameFLex: {
    marginBottom: 8,
  },
  nameContainer: {
    marginLeft: 20,
  },
  calenderTickContainer: {
    backgroundColor: PRIMARY_COLOR_500 + 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  dateText: {
    marginLeft: 8,
  },
  majorText: {
    marginBottom: 8,
  },
  linearContaier: {
    height: 35,
    width: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentTypeText: {
    marginLeft: 8,
  },
});

type Props = {
  data: AppointmentDetails;
};
const AppointmentDetailsProfile = ({ data }: Props) => {
  let appointmentTypeSvgType = <SvgMapRound />;

  if (data && data.type === 'regular') {
    appointmentTypeSvgType = <SvgMapRound />;
  } else if (data && data.type === 'video') {
    appointmentTypeSvgType = <SvgVideoCircle />;
  } else {
    appointmentTypeSvgType = (
      <LinearGradient
        colors={['rgba(255, 207, 83, 1)', 'rgba(255, 153, 0, 1)']}
        locations={[0, 1]}
        style={styles.linearContaier}>
        <SvgCrown />
      </LinearGradient>
    );
  }

  return (
    <Flex>
      <Flex row center>
        <ProfileWithStatus
          height={75}
          width={75}
          borderRadius={25}
          src={
            data?.patient?.profilePicUrl
              ? data?.patient?.profilePicUrl
              : USER_PROFILE
          }
          icon={appointmentTypeSvgType}
        />
        <Flex flex={1} overrideStyle={styles.nameContainer}>
          <Flex row center between overrideStyle={styles.nameFLex}>
            <Text type="heading600">Pathimuga Pandiyan</Text>
            <Button type="link">
              <SvgTimePeding fill="#3366FF" />
            </Button>
          </Flex>
          <Text color="gray" type="body100" transform="capitalize">
            40 Years
            Yuvaraj ,Male
          </Text>
        </Flex>
      </Flex>
      <Flex row center middle overrideStyle={styles.calenderTickContainer}>
        <SvgCalenderTick fill={NEUTRAL_500} />

        <Text overrideStyle={styles.dateText} type="body100">
          17th May 2024,10:00AM-12:00PM
        </Text>
      </Flex>
      <TitleWithValue
        title="Status :  "
        value={
          <Status
            overrideStyle={{ textTransform: 'capitalize' }}
            type="rounded"
            label={"upcoming"}
            color={getStatusBackground("upcoming")}
          />
        }
      />
      <TitleWithValue
        title="Appointment Type  :  "
        value={
          <Flex row center>
            {appointmentTypeSvgType}
            <Text
              transform="capitalize"
              color="inprogress"
              overrideStyle={styles.appointmentTypeText}>
              Premium
            </Text>
          </Flex>
        }
      />
      <TitleWithValue title="Token ID :  " value="1234" />
      <TitleWithValue title="Appointment Subject : " />
      <Text type="heading400" overrideStyle={styles.majorText}>
        Leg Injury
      </Text>
    
        <ReadMoreText text={"Leg Injury is been there for 12 days" || ''} />
      
    </Flex>
  );
};

export default AppointmentDetailsProfile;
