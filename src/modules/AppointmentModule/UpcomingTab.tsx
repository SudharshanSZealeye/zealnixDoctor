/* eslint-disable */
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {
  Flex,
  Loader,
  StyleSheet,
  validators,
} from 'squashapps-react-native-uikit';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment, {Moment} from 'moment';
import {useFormik} from 'formik';
import SearchBar from '../../common/SearchBar';
import {useLanguage} from '../../utils/useLanguage';
import {AppDispatch, RootState} from '../../redux/store';
import {prescriptionsListMiddleWare} from '../PrescribeModule/store/prescribeMiddleware';
import AppointmentFilterPopUp from './AppointmentFilterPopUp';
import AppointmentsCard from './AppointmentsCard';
import {
  appoinmentDetailsMiddleWare,
  appoinmentsListMiddleWare,
  getLabReportList,
  vitalListMiddleWare,
} from './store/appoinmentMiddleware';
import {getCurentMini} from '../../utils/helpers';

const {isEmpty} = validators;
const {THIS_FIELD_REQUIRED} = useLanguage;

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  margin: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bottomList: {
    marginBottom: 120,
  },
});

export type formType = {
  appointmentType: string;
  date: Moment;
};

const initialValues: formType = {
  appointmentType: 'regular',
  date: moment().startOf('day'),
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.appointmentType)) {
    errors.appointmentType = THIS_FIELD_REQUIRED;
  }
  return errors;
};

const UpcomingTab = () => {
  const navigation = useNavigation();
  const [isPopUp, setPopUp] = useState<boolean>(false);
  const handleAddDataOpen = () => setPopUp(true);
  const handleAddDataClose = () => setPopUp(false);
  const [search, setSearch] = useState<string>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      appoinmentsListMiddleWare({
        where: {
          $or: [
            {
              $and: [
                {
                  appointmentDate: {
                    $eq: moment().startOf('date'),
                  },
                  'appointmentSchedule.appointmentRangeEnd': {
                    $gte: getCurentMini(),
                  },
                },
              ],
            },
            {
              appointmentDate: {
                $gt: moment().startOf('date'),
              },
            },
          ],
        },
        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
    setSearch('');
  }, []);

  const {isLoading, appoinmentListData, appoinmentDetailsLoader} = useSelector(
    ({appoinmentListReducers, appoinmentDetailsReducers}: RootState) => {
      return {
        isLoading: appoinmentListReducers.isLoading,
        appoinmentListData: appoinmentListReducers.data,
        appoinmentDetailsLoader: appoinmentDetailsReducers.isLoading,
      };
    },
  );

  const handleSave = (values: formType) => {
    dispatch(
      appoinmentsListMiddleWare({
        where: {
          appointmentDate: moment(values.date).startOf('day'),
          type: values.appointmentType,
        },
        include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
      }),
    );
    handleAddDataClose();
  };

  const searchByName = (name: string) => {
    const filteredAppointments = appoinmentListData.filter(appointment => {
      const appointmentName = appointment.patient.name.toLowerCase();
      return appointmentName.includes(name.toLowerCase());
    });

    return filteredAppointments;
  };

  const handleSearch = (val: string) => {
    setSearch(val);
  };

  const result = useMemo(() => {
    const output = search ? searchByName(search) : appoinmentListData;
    return output;
  }, [search, appoinmentListData]);

  const formik = useFormik({
    initialValues,
    onSubmit: handleSave,
    validate,
  });

  const handleViewCard = (id: string) => {
    dispatch(
      appoinmentDetailsMiddleWare({
        appointmentId: id,
        include: [
          {relation: 'hospital'},
          {relation: 'patient'},
          {relation: 'doctor'},
          {relation: 'appointmentSchedule'},
        ],
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
                      patientId: res.payload?.patientId,
                    },
                    include: [{relation: 'lab'}],
                  }),
                ).then(responseee => {
                  if (responseee.payload) {
                    navigation.navigate('AppointmentDetailsScreen');
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      {(appoinmentDetailsLoader || isLoading) && <Loader />}
      <AppointmentFilterPopUp
        open={isPopUp}
        formik={formik}
        close={handleAddDataClose}
      />
      <Flex overrideStyle={styles.overAll}>
        <SearchBar
          value={search}
          isFilter
          onChange={handleSearch}
          onClickFilter={handleAddDataOpen}
          placeholder="Search Appointments"
        />
        <FlatList
          data={result}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item}) => (
            <AppointmentsCard item={item} handleViewCard={handleViewCard} />
          )}
          ListFooterComponent={<View style={{height: 60}} />}
        />
      </Flex>
    </>
  );
};

export default UpcomingTab;
