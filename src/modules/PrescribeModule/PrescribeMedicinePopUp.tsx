/* eslint-disable */
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  Flex,
  Modal,
  StyleSheet,
  Text,
  Colors,
  Button,
  ButtonGroup,
  Icons,
  LabelWrapper,
} from 'squashapps-react-native-uikit';
import { useSelector } from 'react-redux';
import { autoReOrder, dosage, order, qunatity, timing } from './mock';
import { formTypePrescribe } from './AllMedicineListScreen';
import CustomQuantityPopUp from './CustomQuantityPopUp';
import { RootState } from '../../redux/store';
import PrescriptionCard from './PrescriptionCard';

const { SvgClose } = Icons;
const styles = StyleSheet.create({
  overAll: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  inputMarignBottom: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 24,
  },
  saveBtn: {
    marginTop: 12,
  },
  prescriptionCard: {
    marginTop: 30,
    marginBottom: 42,
  },
  customQuantityButton: {
    marginTop: 12,
  },
});

type Props = {
  formik: FormikProps<formTypePrescribe>;
  open: boolean;
  close: () => void;
};

const PrescribeMedicinePopup = ({ formik, open, close }: Props) => {
  const [isCustomOpen, setCustomOpen] = useState(false);
  const handleCustomPopUpOpen = () => setCustomOpen(true);
  const handleCustomPopUpClose = () => setCustomOpen(false);
  const { data } = useSelector(({ getMedicineReducers }: RootState) => {
    return {
      data: getMedicineReducers.data,
    };
  });

  return (
    <Modal isVisible={open}>
      <>
        <CustomQuantityPopUp
          open={isCustomOpen}
          formik={formik}
          close={handleCustomPopUpClose}
        />
        <Flex overrideStyle={styles.overAll}>
          <Flex row center between overrideStyle={styles.title}>
            <Text align="center" type="heading500">
              Medication Instructions
            </Text>
            <Button onClick={close} type="link">
              <SvgClose />
            </Button>
          </Flex>
          <Text color="gray">Provide Instructions to consume medicine</Text>
          <Flex overrideStyle={styles.prescriptionCard}>
            <PrescriptionCard
              title={"Pacentamal"}
              imageHeight={50}
              imageWidth={50}
              manufacturer={"manufacturer"}
              quantity={"totalStock"}
              image={"image"}
            />
          </Flex>
          <Flex overrideStyle={styles.inputMarignBottom}>
            <LabelWrapper label="Quantity">
              <ButtonGroup
                buttons={qunatity}
                onChange={formik.handleChange('quantity')}
              />
              <Flex row>
                <Button
                  type="link"
                  overrideStyle={styles.customQuantityButton}
                  onClick={handleCustomPopUpOpen}>
                  + Custom Quantity
                </Button>
              </Flex>
              {formik.errors.quantity && formik.touched.quantity && (
                <Text color="error">{formik.errors.quantity}</Text>
              )}
            </LabelWrapper>
          </Flex>
          <Flex overrideStyle={styles.inputMarignBottom}>
            <LabelWrapper label="Timing">
              <ButtonGroup
                buttons={order}
                onChange={(e: string) => {
                  formik.setFieldValue('timing', e);
                }}
                multiSelect
              />
              {formik.errors.timing && formik.touched.timing && (
                <Text color="error">{formik.errors.timing}</Text>
              )}
            </LabelWrapper>
          </Flex>
          {/* <Flex overrideStyle={styles.inputMarignBottom}>
            <LabelWrapper label="Order">
              <ButtonGroup
                buttons={order}
                onChange={formik.handleChange('order')}
              />
                                          {formik.errors.order && formik.touched.order && (
                <Text color="error">{formik.errors.order}</Text>
              )}

            </LabelWrapper>
          </Flex> */}
          <Flex overrideStyle={styles.inputMarignBottom}>
            <LabelWrapper label="Dosage">
              <ButtonGroup
                buttons={dosage}
                onChange={formik.handleChange('dosage')}
              />
              {formik.errors.dosage && formik.touched.dosage && (
                <Text color="error">{formik.errors.dosage}</Text>
              )}
            </LabelWrapper>
          </Flex>
          <Flex overrideStyle={styles.inputMarignBottom}>
            <LabelWrapper label="Allow Auto Re-order">
              <ButtonGroup
                defaultValue={
                  formik.initialValues.autoReOrder === false ? 'no' : 'yes'
                }
                buttons={autoReOrder}
                onChange={(value: string) =>
                  formik.setFieldValue('autoReOrder', value === 'yes')
                }
              />
              {formik.errors.autoReOrder && formik.touched.autoReOrder && (
                <Text color="error">{formik.errors.autoReOrder}</Text>
              )}
            </LabelWrapper>
          </Flex>
          <Button onClick={formik.handleSubmit} overrideStyle={styles.saveBtn}>
            Prescribe
          </Button>
        </Flex>
      </>
    </Modal>
  );
};

export default PrescribeMedicinePopup;
