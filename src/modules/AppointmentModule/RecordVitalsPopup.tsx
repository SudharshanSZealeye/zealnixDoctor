import {FormikProps} from 'formik';
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {
  Flex,
  Modal,
  StyleSheet,
  Text,
  Colors,
  InputText,
  Button,
  Icons,
} from 'squashapps-react-native-uikit';
import {IS_ANDROID} from '../../utils/constants';
import {formType} from './AppointmentDetailsScreen';

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
  title: {
    marginBottom: 24,
  },
  saveBtn: {
    marginTop: 30,
  },
});

type Props = {
  formik: FormikProps<formType>;
  open: boolean;
  close: () => void;
};

const RecordVitalsPopup = ({formik, open, close}: Props) => {
  const behavior: any = IS_ANDROID ? '' : 'padding';
  return (
    <Modal isVisible={open}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior={behavior}>
          <ScrollView style={styles.overAll}>
            <Flex>
              <Flex row center between overrideStyle={styles.title}>
                <Text align="center" type="heading500">
                  Record Vitals
                </Text>
                <Button onClick={close} type="link">
                  <SvgClose />
                </Button>
              </Flex>
              <View style={styles.inputMarignBottom}>
                <InputText
                  keyboardType="decimal-pad"
                  label="Body Temperature"
                  actionRight={() => <Text color="gray">F</Text>}
                  value={formik.values.bodyTemperature.toString()}
                  onChange={formik.handleChange('bodyTemperature')}
                  name="bodyTemperature"
                  formikTouched={formik.touched}
                  formikErrors={formik.errors}
                  error={
                    formik.touched.bodyTemperature &&
                    formik.errors.bodyTemperature
                  }
                />
              </View>
              <View style={styles.inputMarignBottom}>
                <InputText
                  keyboardType="number-pad"
                  label="Blood Pressure"
                  actionRight={() => <Text color="gray">mm/Hg</Text>}
                  value={formik.values.bloodPressure.toString()}
                  onChange={formik.handleChange('bloodPressure')}
                  name="bloodPressure"
                  formikTouched={formik.touched}
                  formikErrors={formik.errors}
                  error={
                    formik.touched.bloodPressure && formik.errors.bloodPressure
                  }
                />
              </View>
              <View style={styles.inputMarignBottom}>
                <InputText
                  keyboardType="number-pad"
                  label="Blood Sugar"
                  actionRight={() => <Text color="gray">mm/Hg</Text>}
                  value={formik.values.bloodSugar.toString()}
                  onChange={formik.handleChange('bloodSugar')}
                  name="bloodSugar"
                  formikTouched={formik.touched}
                  formikErrors={formik.errors}
                  error={formik.touched.bloodSugar && formik.errors.bloodSugar}
                />
              </View>
              <InputText
                keyboardType="number-pad"
                label="Body Weight"
                actionRight={() => <Text color="gray">Kg</Text>}
                value={formik.values.bodyWeight.toString()}
                onChange={formik.handleChange('bodyWeight')}
                name="bodyWeight"
                formikTouched={formik.touched}
                formikErrors={formik.errors}
                error={formik.touched.bodyWeight && formik.errors.bodyWeight}
              />
              <InputText
                keyboardType="number-pad"
                label="Body Height"
                actionRight={() => <Text color="gray">cm</Text>}
                value={formik.values.height.toString()}
                onChange={formik.handleChange('height')}
                name="height"
                formikTouched={formik.touched}
                formikErrors={formik.errors}
                error={formik.touched.height && formik.errors.height}
              />

              <Button
                onClick={formik.handleSubmit}
                overrideStyle={styles.saveBtn}>
                Save
              </Button>
            </Flex>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RecordVitalsPopup;
