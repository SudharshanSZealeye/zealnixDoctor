import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  Flex,
  Text,
  validators,
  getColors,
  Loader,
} from 'squashapps-react-native-uikit';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

import {APP_THEME} from '../../utils/constants';
import {useLanguage} from '../../utils/useLanguage';
import {AppDispatch, RootState} from '../../redux/store';
import AppointmentDetails from './AppointmentDetails';
import AppointmentDetailsProfile from './AppointmentDetailsProfile';
import DocumentList from './DocumentList';
import PrescriptionList from './PrescriptionList';
import RecordVitalsData from './RecordVitalsData';
import RecordVitalsPopup from './RecordVitalsPopup';
import {
  appoinmentDetailsMiddleWare,
  appoinmentsListMiddleWare,
  patchAppoinmentDetailsMiddleWare,
  patchVitalMiddleWare,
  tokenGenerateMiddleWare,
  vitalListMiddleWare,
} from './store/appoinmentMiddleware';
import {getCurentMini} from '../../utils/helpers';
import CancelAppointmentPopup from './CancelAppointmentPopup';

const {isEmpty} = validators;
const {THIS_FIELD_REQUIRED} = useLanguage;
const {PRIMARY_COLOR_500} = getColors(APP_THEME);

const styles = StyleSheet.create({
  overAll: {
    padding: 20,
  },
  startBtn: {
    marginVertical: 16,
  },
  btnContainer: {
    marginVertical: 30,
  },
  addBtn: {
    backgroundColor: PRIMARY_COLOR_500 + 10,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 20,
  },
  prescriptionText: {
    marginBottom: 20,
    marginTop: 16,
  },
  btn: {
    marginHorizontal: 20,
  },
});

export type formType = {
  bodyTemperature: string;
  bloodPressure: string;
  height: string;

  bloodSugar: string;
  bodyWeight: string;
  id: string;
  appointmentId: string;
  patientId: string;
};
const initialValues: formType = {
  bodyTemperature: '',
  bloodPressure: '',
  height: '',
  bloodSugar: '',
  bodyWeight: '',
  id: '',
  appointmentId: '',
  patientId: '',
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.bodyTemperature)) {
    errors.bodyTemperature = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.bloodPressure)) {
    errors.bloodPressure = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.height)) {
    errors.height = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.bloodSugar)) {
    errors.bloodSugar = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.bodyWeight)) {
    errors.bodyWeight = THIS_FIELD_REQUIRED;
  }
  return errors;
};
const AppointmentDetailsScreen = () => {
  const [isAddData, setAddData] = useState(false);
  const [isCancelVisible, setCancelVisibe] = useState(false);
  const [isView, setView] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddDataOpen = () => setAddData(true);
  const handleAddDataClose = () => setAddData(false);
  const handleCancelOpen = () => setCancelVisibe(true);
  const handleCancelClose = () => setCancelVisibe(false);
  const {height} = useSafeAreaFrame();
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [cancelReason, setCanelReason] = useState('');

  const handleSave = (values: formType) => {
    const bp = values.bloodPressure.split('-');
    if (values.appointmentId !== '') {
      dispatch(
        patchVitalMiddleWare({
          temperature: parseInt(values.bodyTemperature, 10),
          id: values.id,
          systolicBloodPressure: parseInt(bp[0], 10),
          diastolicBloodPressure: parseInt(bp[1], 10),
          bloodSugar: parseInt(values.bloodSugar, 10),
          weight: parseInt(values.bodyWeight, 10),
          height: parseInt(values.height, 10),
          appointmentId: values.appointmentId,
          patientId: values.patientId,
        }),
      ).then(res => {
        if (res) {
          dispatch(
            vitalListMiddleWare({
              where: {
                appointmentId: values.appointmentId,
              },
            }),
          ).then(response => {
            if (response) {
              handleAddDataClose();
            }
          });
        }
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSave,
    validate,
  });

  const {
    data,
    loading,
    priscriptionList,
    vitalRecord,
    patchLoading,
    listLoading,
    labReportList,
  } = useSelector(
    ({
      appoinmentDetailsReducers,
      prescriptionsListReducers,
      vitalListReducers,
      appoinmentListReducers,
      labReportReducers,
    }: RootState) => {
      return {
        loading: appoinmentDetailsReducers.isLoading,
        patchLoading: prescriptionsListReducers.isLoading,
        listLoading: appoinmentListReducers.isLoading,
        data: appoinmentDetailsReducers.data,
        priscriptionList: prescriptionsListReducers.data,
        vitalRecord: vitalListReducers.data[0],
        labReportList: labReportReducers.data,
      };
    },
  );

  const handleStatusChange = (status: string) => {
    if (status === 'completed') {
      setDetailsLoading(true);
      dispatch(patchAppoinmentDetailsMiddleWare({...data, status})).then(
        res => {
          if (res) {
            dispatch(
              appoinmentsListMiddleWare({
                where: {
                  'appointmentSchedule.appointmentRangeEnd': {
                    $gte: getCurentMini(),
                  },
                  appointmentDate: {$gte: moment().startOf('day')},
                },
                include: [
                  'hospital',
                  'patient',
                  'doctor',
                  'appointmentSchedule',
                ],
              }),
            ).then(response => {
              if (response?.payload) {
                navigation.navigate('BottomTab', {
                  screen: 'AppointmentTab',
                  params: {screen: 'AppointmentsScreen'},
                });
              }
            });
          }
        },
      );
    } else if (status === 'cancel') {
      setDetailsLoading(true);

      dispatch(
        patchAppoinmentDetailsMiddleWare({
          ...data,
          status: 'cancelled',
          cancellation_reason: cancelReason,
        }),
      ).then(res => {
        setCancelVisibe(false);
        if (res) {
          dispatch(
            appoinmentDetailsMiddleWare({
              appointmentId: data.id,
              include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
            }),
          ).then(response => {
            if (response.payload.id) {
              setDetailsLoading(false);
            }
          });
        }
      });
    } else {
      setDetailsLoading(true);

      dispatch(
        patchAppoinmentDetailsMiddleWare({
          ...data,
          status,
        }),
      ).then(res => {
        if (res) {
          dispatch(
            appoinmentDetailsMiddleWare({
              appointmentId: data.id,
              include: ['hospital', 'patient', 'doctor', 'appointmentSchedule'],
            }),
          ).then(response => {
            if (response.payload.id) {
              setDetailsLoading(false);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (vitalRecord?.appointmentId) {
      formik.setFieldValue('bodyTemperature', vitalRecord.temperature);
      formik.setFieldValue(
        'bloodPressure',
        `${vitalRecord.diastolicBloodPressure}-${vitalRecord.systolicBloodPressure}`,
      );
      formik.setFieldValue('bloodSugar', vitalRecord.bloodSugar);
      formik.setFieldValue('bodyWeight', vitalRecord.weight);
      formik.setFieldValue('bodyTemperature', vitalRecord.temperature);
      formik.setFieldValue('height', vitalRecord.height);
      formik.setFieldValue('id', vitalRecord.id);
      formik.setFieldValue('appointmentId', vitalRecord.appointmentId);
      formik.setFieldValue('patientId', vitalRecord.patientId);
    }
  }, [vitalRecord]);

  const handleFullView = () => setView(true);
  const handlePrescribe = () => {
    navigation.navigate('PrescribeMedicineScreen', {
      appointmentId: data.id,
    });
  };
  const ButtonsDisplay = ({status, type}: any) => {
    if (status === 'upcoming') {
      const startAppointmentTitle =
        type === 'video' ? 'Start Video Call' : 'Start Appointment';
      const handleFunction = () => {
        if (type === 'video') {
          dispatch(
            tokenGenerateMiddleWare({
              appointmentId: data.id,
            }),
          ).then(response => {
            if (response.payload) {
              navigation.navigate('VideoCallScreen');
              handleStatusChange('ongoing');
            }
          });
        } else {
          handleStatusChange('ongoing');
        }
      };
      return (
        <Flex>
          <Button overrideStyle={styles.startBtn} onClick={handleFunction}>
            {startAppointmentTitle}
          </Button>
          <Button
            type="secondary"
            onClick={
              () => handleCancelOpen()
              // handleStatusChange('cancel')
            }>
            Cancel Appointments
          </Button>
        </Flex>
      );
    }
    if (status === 'ongoing') {
      return (
        <Flex>
          <Button overrideStyle={styles.startBtn} onClick={handlePrescribe}>
            Prescribe
          </Button>
          <Button
            type="secondary"
            onClick={() => handleStatusChange('completed')}>
            End Appointment
          </Button>
        </Flex>
      );
    }
    if (status === 'cancelled') {
      return null;
    }
    return (
      <Flex>
        <Button overrideStyle={styles.startBtn} onClick={handlePrescribe}>
          Prescribe
        </Button>
        <Button
          overrideStyle={styles.startBtn}
          onClick={() => handleStatusChange('rescheduled')}>
          Reshedule Appointment
        </Button>
      </Flex>
    );
  };
  return (
    <>
      {loading || patchLoading || listLoading || (detailsLoading && <Loader />)}
      <RecordVitalsPopup
        open={isAddData}
        formik={formik}
        close={handleAddDataClose}
      />
      <CancelAppointmentPopup
        open={isCancelVisible}
        handleChange={(e: string) => setCanelReason(e)}
        close={handleCancelClose}
        handleSubmit={() => handleStatusChange('cancel')}
      />

      <ScrollView
        contentContainerStyle={styles.overAll}
        bounces={false}
        style={{height: height - 320}}>
        <Flex between>
          <AppointmentDetailsProfile data={data} />
          {vitalRecord?.appointmentId && (
            <Flex>
              <Text type="heading500" overrideStyle={{marginTop: 20}}>
                Record Vitals:
              </Text>

              <RecordVitalsData isData={vitalRecord} />
              <Button onClick={handleAddDataOpen} overrideStyle={styles.addBtn}>
                <Text color="theme" size={14}>
                  + Edit Data
                </Text>
              </Button>
            </Flex>
          )}
          {labReportList.length > 0 && <DocumentList data={labReportList} />}
          {/* <Button overrideStyle={styles.addBtn}>
            <Text color="theme" size={14}>
              + Add Doc
            </Text>
          </Button> */}
          {priscriptionList[0]?.medicine?.id && (
            <>
              <Text type="heading500" overrideStyle={styles.prescriptionText}>
                Prescription
              </Text>
              <PrescriptionList
                items={priscriptionList}
                handleDetailedScreen={handlePrescribe}
              />
            </>
          )}
          {data.status !== 'upcoming' && (
            <AppointmentDetails
              item={data}
              isView={isView}
              handleFullView={handleFullView}
            />
          )}
        </Flex>

        {/* <Flex overrideStyle={styles.btnContainer}>
          <Button overrideStyle={styles.startBtn} onClick={handlePrescribe}>
            Prescribe Medicine
          </Button>
          <Button type="secondary">End Appointment</Button>
        </Flex> */}
        {/* <Flex overrideStyle={styles.btnContainer}>
          <Button
            overrideStyle={styles.startBtn}
            onClick={() => {
              setView(true);
            }}>
            Start Video Call
          </Button>
          <Button type="secondary">Reschedule</Button>
        </Flex> */}
      </ScrollView>
      <Flex overrideStyle={styles.btn}>
        <ButtonsDisplay status={data.status} type={data.type} />
      </Flex>
    </>
  );
};

export default AppointmentDetailsScreen;
