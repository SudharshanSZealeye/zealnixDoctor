/* eslint-disable */
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  Colors,
  Flex,
  Loader,
  StyleSheet,
  Text,
} from 'squashapps-react-native-uikit';
import CustomStatusBar from '../../common/CustomStatusBar';
import TitleWithViewAll from '../../common/TitleWithViewAll';
import {AppDispatch, RootState} from '../../redux/store';
import {getCurentMini} from '../../utils/helpers';
import {
  appoinmentDetailsMiddleWare,
  getLabReportList,
  vitalListMiddleWare,
  tokenGenerateMiddleWare,
} from '../AppointmentModule/store/appoinmentMiddleware';
import {getUserMiddleWare} from '../ProfileModule/store/profileMiddleware';
import AppointmentsCard from './AppointmentsCard';
import HomeHeader from './HomeHeader';
import StatusCard from './StatusCard';
import RecentAppointmentCard from './RecentAppointmentCard';
import {
  recentappointmentMiddleWare,
  todaysappointmentMiddleWare,
} from './store/homeMiddleware';
import {TodaysAppointmentList} from './store/home.types';
import {prescriptionsListMiddleWare} from '../PrescribeModule/store/prescribeMiddleware';

const styles = StyleSheet.create({
  overAll: {
    paddingVertical: 30,
  },
  appointMentConatiner: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 16,
  },
  appointmentFlatList: {
    paddingHorizontal: 20,
  },
  recentReviewFlatList: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  empty: {
    height: 60,
  },
});

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  const {
    isLoading,
    appointment,
    isRecentAppointmentLoading,
    recentAppointment,
    appoinmentDetailsLoading,
    labReportLoading,
    prescriptionsListLoader,
    vitalListLoader,
    labReportLoader,
  } = useSelector(
    ({
      todaysAppointmentReducers,
      prescriptionsListReducers,
      recentAppointmentReducers,
      appoinmentDetailsReducers,
      vitalListReducers,
      labReportReducers,
    }: RootState) => {
      return {
        isLoading: todaysAppointmentReducers.isLoading,
        appointment: todaysAppointmentReducers.appointment,
        isRecentAppointmentLoading: recentAppointmentReducers.isLoading,
        recentAppointment: recentAppointmentReducers.appointment,
        appoinmentDetailsLoading: appoinmentDetailsReducers.isLoading,
        labReportLoading: labReportReducers.isLoading,
        prescriptionsListLoader: prescriptionsListReducers.isLoading,
        vitalListLoader: vitalListReducers.isLoading,
        labReportLoader: labReportReducers.isLoading,
      };
    },
  );

  useEffect(() => {
    getCall();
  }, []);

  const getCall = () => {
    dispatch(
      todaysappointmentMiddleWare({
        where: {
          appointmentDate: moment().startOf('date'),
        },
        order: 'appointmentDate',
        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
    dispatch(
      recentappointmentMiddleWare({
        where: {
          $or: [
            {
              $and: [
                {
                  appointmentDate: {
                    $eq: moment().startOf('date'),
                  },
                  'appointmentSchedule.appointmentRangeStart': {
                    $lt: getCurentMini(),
                  },
                },
              ],
            },
            {
              appointmentDate: {
                $lt: moment().startOf('date'),
              },
            },
          ],
        },

        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
    dispatch(getUserMiddleWare());
  };

  const handleAppointment = () => {
    navigation.navigate('BottomTab', {
      screen: 'AppointmentTab',
      params: {screen: 'AppointmentsScreen'},
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const handleView = (id: string) => {
    dispatch(
      appoinmentDetailsMiddleWare({
        appointmentId: id,
        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    ).then(res => {
      if (res.payload?.id) {
        dispatch(
          prescriptionsListMiddleWare({
            where: {
              appointmentId: res.payload?.id,
            },
          }),
        ).then(response => {
          if (response.payload) {
            dispatch(
              vitalListMiddleWare({
                where: {
                  appointmentId: res.payload.id,
                },
              }),
            ).then(data => {
              if (data.payload) {
                dispatch(
                  getLabReportList({
                    where: {
                      patientId: res.payload.patientId,
                    },
                    include: [{relation: 'lab'}],
                  }),
                ).then(responseee => {
                  if (responseee.payload) {
                    navigation.navigate('BottomTab', {
                      screen: 'AppointmentTab',
                      params: {screen: 'AppointmentDetailsScreen'},
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  const handleVideo = (e: string) => {
    dispatch(
      tokenGenerateMiddleWare({
        appointmentId: e,
      }),
    ).then(response => {
      if (response.payload) {
        navigation.navigate('VideoCallScreen');
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    getCall();
    setTimeout(() => {
      // setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      {(isLoading ||
        isRecentAppointmentLoading ||
        labReportLoading ||
        appoinmentDetailsLoading ||
        prescriptionsListLoader ||
        vitalListLoader ||
        labReportLoader) && <Loader />}
      <CustomStatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
      <Flex overrideStyle={styles.overAll}>
        <HomeHeader />
        <ScrollView
          nestedScrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <TitleWithViewAll
            title="Today’s Appointments"
            hanldeView={handleAppointment}
          />
          {appointment?.length > 0 ? (
            <SwiperFlatList
              data={appointment}
              renderItem={({item}) => (
                <AppointmentsCard
                  items={item}
                  handleView={handleView}
                  handleVideo={handleVideo}
                />
              )}
              keyExtractor={(_item, index) => index.toString()}
            />
          ) : (
            <Flex center middle overrideStyle={{marginVertical: 20}}>
              <Text color="gray" type="heading500">
                No Appointments Today
              </Text>
            </Flex>
          )}
          <StatusCard />
          <TitleWithViewAll
            title="Recent Appointments"
            hanldeView={handleAppointment}
          />
          {recentAppointment?.length > 0 ? (
            recentAppointment
              ?.slice(0, 2)
              .map((item: TodaysAppointmentList, index: number) => (
                <View
                  style={{
                    marginHorizontal: 20,
                    marginBottom:
                      recentAppointment?.slice(0, 2)?.length === index + 1
                        ? 100
                        : 0,
                  }}>
                  <RecentAppointmentCard item={item} handleView={handleView} />
                </View>
              ))
          ) : (
            <Flex center middle overrideStyle={{marginVertical: 20}}>
              <Text color="gray" type="heading500">
                No Appointments Today
              </Text>
            </Flex>
          )}
        </ScrollView>
      </Flex>
    </>
  );
};

export default HomeScreen;
