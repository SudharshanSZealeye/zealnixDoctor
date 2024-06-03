// import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  Text,
  Icons,
  StyleSheet,
  Colors,
  Modal,
  Flex,
  Button,
  //   ButtonGroup,
  //   WeekCalendar,
} from 'squashapps-react-native-uikit';
// import {appointmentType} from './mock';
import {IS_ANDROID} from '../../utils/constants';
import InputRadioCheckGroup from '../../package/InputRadioGroupCheck';
// eslint-disable-next-line import/order
// import {FormikProps} from 'formik';
// import {formType} from './UpcomingTab';

const {SvgClose} = Icons;
const styles = StyleSheet.create({
  overAll: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  inputMarignBottom: {
    marginBottom: 16,
  },
  grayColor: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 12,
  },
  saveBtn: {
    marginTop: 30,
  },
});

type Props = {
  handleSubmit: () => void;
  open: boolean;
  close: () => void;
  handleChange: (args: string) => void;
};

const CancelAppointmentPopup = ({
  open,
  close,
  handleSubmit,
  handleChange,
}: Props) => {
  const behavior: any = IS_ANDROID ? '' : 'padding';

  return (
    <Modal isVisible={open}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={behavior}>
          <ScrollView style={styles.overAll}>
            <Flex>
              <Flex row center between overrideStyle={styles.title}>
                <Text align="center" type="heading500">
                  Cancel Appointment
                </Text>
                <Button onClick={close} type="link">
                  <SvgClose />
                </Button>
              </Flex>
              <Text color="gray" overrideStyle={styles.grayColor}>
                Please choose a valid reasosn
              </Text>

              <View style={styles.inputMarignBottom}>
                <InputRadioCheckGroup
                  options={[
                    {
                      label: 'Patient didn’t showup',
                      value: 'Patient didn’t showup',
                    },
                    {
                      label: 'Doctor not available',
                      value: 'Doctor not available',
                    },
                    {
                      label: 'Technical Issue',
                      value: 'Technical Issue',
                    },
                    {
                      label: 'Others',
                      value: 'Others',
                    },
                  ]}
                  onChange={(e: string) => handleChange(e)}
                />
              </View>
              <Button onClick={handleSubmit} overrideStyle={styles.saveBtn}>
                Confirm
              </Button>
            </Flex>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CancelAppointmentPopup;
